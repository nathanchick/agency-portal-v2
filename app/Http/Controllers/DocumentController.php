<?php

namespace App\Http\Controllers;

use App\Http\Traits\HasCurrentOrganisation;
use App\Models\Document;
use App\Models\DocumentHistory;
use App\Models\DocumentRequest;
use App\Models\Customer;
use App\Models\User;
use App\Notifications\DocumentRequestNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Display pending document requests
     */
    public function pending(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $query = DocumentRequest::with(['customer', 'user', 'document'])
            ->where('organisation_id', $organisationId)
            ->whereIn('status', ['not_sent', 'processing']);

        // Apply filters
        if ($request->filled('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        if ($request->filled('user_name')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($request->user_name) . '%']);
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $documentRequests = $query->latest()->paginate(15)->withQueryString();

        // Get available documents for creation
        $documents = Document::where('organisation_id', $organisationId)->get(['id', 'name', 'format']);

        // Get customers for filter dropdown
        $customers = Customer::where('organisation_id', $organisationId)->get(['id', 'name']);

        return Inertia::render('documents/pending', [
            'documentRequests' => $documentRequests,
            'documents' => $documents,
            'customers' => $customers,
            'filters' => $request->only(['customer_id', 'user_name', 'status', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Display completed document requests
     */
    public function completed(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $query = DocumentRequest::with(['customer', 'user', 'document'])
            ->where('organisation_id', $organisationId)
            ->whereIn('status', ['completed', 'void']);

        // Apply filters
        if ($request->filled('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        if ($request->filled('user_name')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($request->user_name) . '%']);
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('updated_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('updated_at', '<=', $request->date_to);
        }

        $documentRequests = $query->latest()->paginate(15)->withQueryString();

        // Get available documents for creation
        $documents = Document::where('organisation_id', $organisationId)->get(['id', 'name', 'format']);

        // Get customers for filter dropdown
        $customers = Customer::where('organisation_id', $organisationId)->get(['id', 'name']);

        return Inertia::render('documents/completed', [
            'documentRequests' => $documentRequests,
            'documents' => $documents,
            'customers' => $customers,
            'filters' => $request->only(['customer_id', 'user_name', 'status', 'date_from', 'date_to']),
        ]);
    }

    /**
     * Show the form for creating a new document request
     */
    public function create(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $customerId = $request->input('customer_id');
        $documentType = $request->input('document_type');

        if (!$customerId || !$documentType) {
            return redirect()->route('documents.pending')->with('error', 'Invalid request parameters');
        }

        // Get customer
        $customer = Customer::where('id', $customerId)
            ->where('organisation_id', $organisationId)
            ->firstOrFail();

        // Get customer users
        $customerUsers = User::whereHas('customers', function ($q) use ($customerId) {
            $q->where('customers.id', $customerId);
        })->get(['id', 'name', 'email']);

        \Log::info('Document Create - Customer Users', [
            'customer_id' => $customerId,
            'customer_name' => $customer->name,
            'users_count' => $customerUsers->count(),
            'users' => $customerUsers->toArray(),
        ]);

        // Get document if not upload_pdf
        $document = null;
        $type = 'upload_pdf';

        if ($documentType !== 'upload_pdf') {
            $document = Document::where('id', $documentType)
                ->where('organisation_id', $organisationId)
                ->firstOrFail();
            $type = $document->format;
        }

        return Inertia::render('documents/create', [
            'customer' => $customer,
            'customerUsers' => $customerUsers,
            'document' => $document,
            'documentType' => $type,
        ]);
    }

    /**
     * Store a new document request
     */
    public function store(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'user_id' => 'required|exists:users,id',
            'document_id' => 'nullable|exists:documents,id',
            'cc_email' => 'nullable|email',
            'cc_name' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'content' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf|max:10240',
            'requires_approval' => 'nullable|boolean',
            'send_option' => 'required|in:now,schedule',
            'scheduled_send_at' => 'nullable|required_if:send_option,schedule|date|after:now',
        ]);

        // Verify customer belongs to this organisation
        $customer = Customer::where('id', $validated['customer_id'])
            ->where('organisation_id', $organisationId)
            ->firstOrFail();

        $documentData = [
            'organisation_id' => $organisationId,
            'customer_id' => $validated['customer_id'],
            'user_id' => $validated['user_id'],
            'cc_email' => $validated['cc_email'] ?? null,
            'cc_name' => $validated['cc_name'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'content' => $validated['content'] ?? null,
            'requires_approval' => $validated['requires_approval'] ?? true,
            'scheduled_send_at' => $validated['send_option'] === 'schedule' ? $validated['scheduled_send_at'] : null,
        ];

        // Handle document_id
        if (isset($validated['document_id'])) {
            $documentData['document_id'] = $validated['document_id'];
        }

        // Handle file upload for upload_pdf type
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('document_requests', $filename, 'private');
            $documentData['uploaded_file'] = $path;
        }

        // Set status based on approval requirement and send option
        if (!($validated['requires_approval'] ?? true)) {
            // No approval needed - mark as completed
            $documentData['status'] = 'completed';
        } elseif ($validated['send_option'] === 'now') {
            $documentData['status'] = 'processing';
        } else {
            $documentData['status'] = 'not_sent';
        }

        $documentRequest = DocumentRequest::create($documentData);

        // Send email immediately if send_option is 'now'
        if ($validated['send_option'] === 'now' && ($validated['requires_approval'] ?? true)) {
            $this->sendDocumentRequest($documentRequest);
        }

        return redirect()->route('documents.pending')->with('success',
            $validated['send_option'] === 'now' ? 'Document request created and sent successfully' : 'Document request scheduled successfully'
        );
    }

    /**
     * Update a document request
     */
    public function update(Request $request, DocumentRequest $documentRequest)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure document belongs to current organisation
        if ($documentRequest->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this document request.');
        }

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'user_id' => 'nullable|exists:users,id',
            'document_id' => 'required|exists:documents,id',
            'content' => 'nullable|string',
            'status' => 'required|in:not_sent,processing,completed,void',
        ]);

        $documentRequest->update($validated);

        return back()->with('success', 'Document request updated successfully');
    }

    /**
     * Void a document request
     */
    public function void(DocumentRequest $documentRequest)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure document belongs to current organisation
        if ($documentRequest->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this document request.');
        }

        $documentRequest->update(['status' => 'void']);

        return back()->with('success', 'Document request voided successfully');
    }

    /**
     * Resend a document request
     */
    public function resend(DocumentRequest $documentRequest)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure document belongs to current organisation
        if ($documentRequest->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this document request.');
        }

        // Reset status to processing to resend
        $documentRequest->update(['status' => 'processing']);

        // Send the document request with 'resent' action
        $this->sendDocumentRequest($documentRequest, 'resent');

        return back()->with('success', 'Document request resent successfully');
    }

    /**
     * Show the form for editing
     */
    public function edit(DocumentRequest $documentRequest)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Ensure document belongs to current organisation
        if ($documentRequest->organisation_id !== $organisationId) {
            abort(403, 'You do not have access to this document request.');
        }

        $documentRequest->load(['customer', 'user', 'document']);

        // Get customers and users for dropdowns
        $customers = Customer::where('organisation_id', $organisationId)->get(['id', 'name']);
        $users = User::whereHas('customers', function ($q) use ($documentRequest) {
            $q->where('customers.id', $documentRequest->customer_id);
        })->get(['id', 'name', 'email']);
        $documents = Document::where('organisation_id', $organisationId)->get(['id', 'name', 'format']);

        return Inertia::render('documents/edit', [
            'documentRequest' => $documentRequest,
            'customers' => $customers,
            'users' => $users,
            'documents' => $documents,
        ]);
    }

    /**
     * Send document request email to user and CC
     */
    protected function sendDocumentRequest(DocumentRequest $documentRequest, $action = 'sent')
    {
        $documentRequest->load(['user', 'document', 'organisation']);

        $requiresSignature = $documentRequest->requires_approval;
        $sender = auth()->user();

        // Send to primary user
        if ($documentRequest->user && $documentRequest->user->email) {
            $documentRequest->user->notify(new DocumentRequestNotification($documentRequest, $requiresSignature));

            // Log the send action to history - logged as the org user who sent it
            DocumentHistory::create([
                'document_request_id' => $documentRequest->id,
                'action' => $action,
                'user_id' => $sender->id,
                'user_name' => $sender->name,
                'user_email' => $sender->email,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'meta_data' => [
                    'recipient_user_id' => $documentRequest->user_id,
                    'recipient_name' => $documentRequest->user->name,
                    'recipient_email' => $documentRequest->user->email,
                    'recipient_type' => 'primary',
                ],
            ]);
        }

        // Send to CC if provided (create anonymous notifiable for CC)
        if ($documentRequest->cc_email) {
            \Notification::route('mail', [
                $documentRequest->cc_email => $documentRequest->cc_name
            ])->notify(new DocumentRequestNotification($documentRequest, $requiresSignature));

            // Log the CC send action to history - logged as the org user who sent it
            DocumentHistory::create([
                'document_request_id' => $documentRequest->id,
                'action' => $action,
                'user_id' => $sender->id,
                'user_name' => $sender->name,
                'user_email' => $sender->email,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'meta_data' => [
                    'recipient_name' => $documentRequest->cc_name,
                    'recipient_email' => $documentRequest->cc_email,
                    'recipient_type' => 'cc',
                ],
            ]);
        }
    }
}
