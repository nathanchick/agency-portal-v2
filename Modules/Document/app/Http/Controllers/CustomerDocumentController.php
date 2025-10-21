<?php

namespace Modules\Document\Http\Controllers;

use App\Http\Controllers\Controller;

use Modules\Document\Models\DocumentRequest;
use Modules\Customer\Models\Customer;
use App\Models\User;
use Modules\Document\Notifications\DocumentStatusChangeNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerDocumentController extends Controller
{
    /**
     * Display pending documents assigned to the authenticated user
     */
    public function myPending(Request $request)
    {
        $user = auth()->user();

        $query = DocumentRequest::with(['customer', 'user', 'document'])
            ->where('user_id', $user->id)
            ->whereIn('status', ['not_sent', 'processing']);

        $documentRequests = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('customer/documents/my-pending', [
            'documentRequests' => $documentRequests,
        ]);
    }

    /**
     * Display completed documents assigned to the authenticated user
     */
    public function myCompleted(Request $request)
    {
        $user = auth()->user();

        $query = DocumentRequest::with(['customer', 'user', 'document'])
            ->where('user_id', $user->id)
            ->whereIn('status', ['completed', 'void']);

        $documentRequests = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('customer/documents/my-completed', [
            'documentRequests' => $documentRequests,
        ]);
    }

    /**
     * Display all pending documents for customer's organisation (Admin/Manager only)
     */
    public function allPending(Request $request)
    {
        $user = auth()->user();

        // Get all customers the user belongs to
        $customerIds = $user->customers()->pluck('customers.id');

        $query = DocumentRequest::with(['customer', 'user', 'document'])
            ->whereIn('customer_id', $customerIds)
            ->whereIn('status', ['not_sent', 'processing']);

        $documentRequests = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('customer/documents/all-pending', [
            'documentRequests' => $documentRequests,
        ]);
    }

    /**
     * Display all completed documents for customer's organisation (Admin/Manager only)
     */
    public function allCompleted(Request $request)
    {
        $user = auth()->user();

        // Get all customers the user belongs to
        $customerIds = $user->customers()->pluck('customers.id');

        $query = DocumentRequest::with(['customer', 'user', 'document'])
            ->whereIn('customer_id', $customerIds)
            ->whereIn('status', ['completed', 'void']);

        $documentRequests = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('customer/documents/all-completed', [
            'documentRequests' => $documentRequests,
        ]);
    }

    /**
     * Display a document for viewing and approval/signing
     */
    public function viewSign($id)
    {
        $user = auth()->user();

        $documentRequest = DocumentRequest::with([
            'customer.organisation',
            'user',
            'document',
            'history' => function ($query) {
                $query->latest();
            }
        ])->findOrFail($id);

        // Authorization logic - determine if user can view and/or approve
        $canView = false;
        $canApprove = false;
        $accessReason = null;

        // Option 1: Document assigned to this user
        if ($documentRequest->user_id === $user->id) {
            $canView = true;
            $canApprove = true;
            $accessReason = 'assigned_user';
        }

        // Option 2: User is a customer manager/admin and document belongs to their customer
        if (!$canView) {
            $userCustomerIds = $user->customers()->pluck('customers.id');
            if ($userCustomerIds->contains($documentRequest->customer_id)) {
                // Check if user has manager or admin role for this customer
                $customerPivot = $user->customers()
                    ->where('customers.id', $documentRequest->customer_id)
                    ->first();

                if ($customerPivot) {
                    // You can check role_id here if you have specific role IDs
                    // For now, assuming if they're linked to customer, they can manage
                    $canView = true;
                    $canApprove = true;
                    $accessReason = 'customer_manager';
                }
            }
        }

        // Option 3: User is an organisation user who created the document
        if (!$canView) {
            if ($documentRequest->document &&
                $user->organisations()->where('organisations.id', $documentRequest->organisation_id)->exists()) {
                $canView = true;
                $canApprove = false; // Creator can only view
                $accessReason = 'document_creator';
            }
        }

        // Option 4: User is an admin/manager of the organisation
        if (!$canView) {
            $currentOrgId = session('current_organisation_id') ?? $user->organisations()->first()?->id;
            if ($currentOrgId === $documentRequest->organisation_id) {
                // Check if user has admin or manager role in the organisation
                if ($user->hasAnyRole(['admin', 'manager'])) {
                    $canView = true;
                    $canApprove = true;
                    $accessReason = 'organisation_admin';
                }
            }
        }

        // If user still doesn't have access, abort
        if (!$canView) {
            abort(403, 'You do not have permission to access this document.');
        }

        // Log the view in document history (only for active documents and customer users)
        $isCustomerUser = in_array($accessReason, ['assigned_user', 'customer_manager']);
        if (!in_array($documentRequest->status, ['completed', 'void']) && $isCustomerUser) {
            $documentRequest->history()->create([
                'action' => 'viewed',
                'user_id' => $user->id,
                'user_name' => $user->name,
                'user_email' => $user->email,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'meta_data' => [
                    'viewed_at' => now()->toISOString(),
                    'access_reason' => $accessReason,
                ],
            ]);
        }

        return Inertia::render('customer/documents/view-sign', [
            'documentRequest' => $documentRequest,
            'canView' => $canView,
            'canApprove' => $canApprove,
            'accessReason' => $accessReason,
        ]);
    }

    /**
     * Approve/sign a document
     */
    public function approve(Request $request, $id)
    {
        $user = auth()->user();

        $documentRequest = DocumentRequest::with([
            'customer.organisation',
            'user',
            'document'
        ])->findOrFail($id);

        // Re-check authorization (same logic as viewSign)
        $canApprove = false;

        // Option 1: Document assigned to this user
        if ($documentRequest->user_id === $user->id) {
            $canApprove = true;
        }

        // Option 2: User is a customer manager/admin
        if (!$canApprove) {
            $userCustomerIds = $user->customers()->pluck('customers.id');
            if ($userCustomerIds->contains($documentRequest->customer_id)) {
                $canApprove = true;
            }
        }

        // Option 4: User is an admin/manager of the organisation
        if (!$canApprove) {
            $currentOrgId = session('current_organisation_id') ?? $user->organisations()->first()?->id;
            if ($currentOrgId === $documentRequest->organisation_id) {
                if ($user->hasAnyRole(['admin', 'manager'])) {
                    $canApprove = true;
                }
            }
        }

        if (!$canApprove) {
            abort(403, 'You do not have permission to approve this document.');
        }

        // Update document status
        $documentRequest->update([
            'status' => 'completed',
        ]);

        // Log the approval in document history
        $documentRequest->history()->create([
            'action' => 'signed',
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_email' => $user->email,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'meta_data' => [
                'signed_at' => now()->toISOString(),
            ],
        ]);

        // Send notifications to creator and assigned user
        $this->sendStatusChangeNotifications($documentRequest, 'approved', $user);

        return redirect()->back()->with('success', 'Document approved successfully.');
    }

    /**
     * Decline/reject a document
     */
    public function decline(Request $request, $id)
    {
        $user = auth()->user();

        $documentRequest = DocumentRequest::with([
            'customer.organisation',
            'user',
            'document'
        ])->findOrFail($id);

        // Re-check authorization (same logic as viewSign)
        $canApprove = false;

        // Option 1: Document assigned to this user
        if ($documentRequest->user_id === $user->id) {
            $canApprove = true;
        }

        // Option 2: User is a customer manager/admin
        if (!$canApprove) {
            $userCustomerIds = $user->customers()->pluck('customers.id');
            if ($userCustomerIds->contains($documentRequest->customer_id)) {
                $canApprove = true;
            }
        }

        // Option 4: User is an admin/manager of the organisation
        if (!$canApprove) {
            $currentOrgId = session('current_organisation_id') ?? $user->organisations()->first()?->id;
            if ($currentOrgId === $documentRequest->organisation_id) {
                if ($user->hasAnyRole(['admin', 'manager'])) {
                    $canApprove = true;
                }
            }
        }

        if (!$canApprove) {
            abort(403, 'You do not have permission to decline this document.');
        }

        // Update document status to void
        $documentRequest->update([
            'status' => 'void',
        ]);

        // Log the rejection in document history
        $documentRequest->history()->create([
            'action' => 'rejected',
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_email' => $user->email,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'meta_data' => [
                'rejected_at' => now()->toISOString(),
            ],
        ]);

        // Send notifications to creator and assigned user
        $this->sendStatusChangeNotifications($documentRequest, 'declined', $user);

        return redirect()->back()->with('success', 'Document declined successfully.');
    }

    /**
     * Send notifications when document status changes
     */
    protected function sendStatusChangeNotifications(DocumentRequest $documentRequest, string $action, User $actionBy)
    {
        $documentRequest->load(['history', 'user']);

        // Find the creator from document history (user who sent the document)
        $creatorHistory = $documentRequest->history()
            ->whereIn('action', ['sent', 'resent'])
            ->orderBy('created_at', 'asc')
            ->first();

        $notifiedUsers = [];

        // Notify the creator (org user who sent the document)
        if ($creatorHistory && $creatorHistory->user_id) {
            $creator = User::find($creatorHistory->user_id);
            if ($creator && $creator->id !== $actionBy->id) {
                $creator->notify(new DocumentStatusChangeNotification($documentRequest, $action, $actionBy));
                $notifiedUsers[] = $creator->id;
            }
        }

        // Notify the assigned user (if different from action taker and creator)
        if ($documentRequest->user_id &&
            $documentRequest->user_id !== $actionBy->id &&
            !in_array($documentRequest->user_id, $notifiedUsers)) {
            $documentRequest->user->notify(new DocumentStatusChangeNotification($documentRequest, $action, $actionBy));
        }
    }
}
