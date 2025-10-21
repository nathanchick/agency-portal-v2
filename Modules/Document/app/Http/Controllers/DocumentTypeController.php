<?php

namespace Modules\Document\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Http\Traits\HasCurrentOrganisation;
use Modules\Document\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DocumentTypeController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Display a listing of document types
     */
    public function index()
    {
        $organisationId = $this->getCurrentOrganisationId();

        $documents = Document::where('organisation_id', $organisationId)
            ->latest()
            ->get();

        return Inertia::render('document-types/index', [
            'documents' => $documents,
        ]);
    }

    /**
     * Show the form for creating a new document type
     */
    public function create()
    {
        return Inertia::render('document-types/create');
    }

    /**
     * Store a newly created document type
     */
    public function store(Request $request)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'format' => 'required|in:form_builder,upload',
            'content' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ]);

        $documentData = [
            'organisation_id' => $organisationId,
            'name' => $validated['name'],
            'format' => $validated['format'],
        ];

        // Handle file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('documents', $filename, 'private');
            $documentData['filename'] = $filename;
            $documentData['content'] = $path;
        } elseif ($validated['format'] === 'form_builder') {
            // Store form builder content
            $documentData['content'] = $validated['content'] ?? '';
        }

        Document::create($documentData);

        return redirect()->route('document-types.index')->with('success', 'Document type created successfully');
    }

    /**
     * Show the form for editing a document type
     */
    public function edit(string $id)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Manually load and verify the document belongs to current organisation
        $document = Document::withoutGlobalScope('organisation')
            ->where('id', $id)
            ->where('organisation_id', $organisationId)
            ->first();

        if (!$document) {
            abort(404, 'Document not found');
        }

        return Inertia::render('document-types/edit', [
            'document' => $document,
        ]);
    }

    /**
     * Update the specified document type
     */
    public function update(Request $request, string $id)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Manually load and verify the document belongs to current organisation
        $document = Document::withoutGlobalScope('organisation')
            ->where('id', $id)
            ->where('organisation_id', $organisationId)
            ->first();

        if (!$document) {
            abort(404, 'Document not found');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'format' => 'required|in:form_builder,upload',
            'content' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ]);

        $documentData = [
            'name' => $validated['name'],
            'format' => $validated['format'],
        ];

        // Handle file upload
        if ($request->hasFile('file')) {
            // Delete old file if exists
            if ($document->filename && Storage::disk('private')->exists($document->content)) {
                Storage::disk('private')->delete($document->content);
            }

            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('documents', $filename, 'private');
            $documentData['filename'] = $filename;
            $documentData['content'] = $path;
        } elseif ($validated['format'] === 'form_builder') {
            // Update form builder content
            $documentData['content'] = $validated['content'] ?? '';
            $documentData['filename'] = null;
        }

        $document->update($documentData);

        return redirect()->route('document-types.index')->with('success', 'Document type updated successfully');
    }

    /**
     * Remove the specified document type
     */
    public function destroy(string $id)
    {
        $organisationId = $this->getCurrentOrganisationId();

        \Log::info('Document delete attempt', [
            'document_id' => $id,
            'organisation_id' => $organisationId,
        ]);

        // Manually load and verify the document belongs to current organisation
        $document = Document::withoutGlobalScope('organisation')
            ->where('id', $id)
            ->where('organisation_id', $organisationId)
            ->first();

        if (!$document) {
            \Log::warning('Document not found or access denied', ['document_id' => $id]);
            abort(404, 'Document not found');
        }

        \Log::info('Document loaded for delete', [
            'document_id' => $document->id,
            'document_name' => $document->name,
        ]);

        // Check if document is being used
        if ($document->documentRequests()->exists()) {
            \Log::warning('Cannot delete - document in use', ['document_id' => $document->id]);
            return back()->with('error', 'Cannot delete document type that is being used in document requests.');
        }

        // Delete file if exists
        if ($document->filename && Storage::disk('private')->exists($document->content)) {
            Storage::disk('private')->delete($document->content);
            \Log::info('Deleted file', ['path' => $document->content]);
        }

        $deleted = $document->delete();
        \Log::info('Document delete result', ['deleted' => $deleted, 'document_id' => $document->id]);

        return redirect()->route('document-types.index')->with('success', 'Document type deleted successfully');
    }

    /**
     * Download a document file (with organization verification)
     */
    public function download(string $id)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Manually load and verify the document belongs to current organisation
        $document = Document::withoutGlobalScope('organisation')
            ->where('id', $id)
            ->where('organisation_id', $organisationId)
            ->first();

        if (!$document) {
            abort(404, 'Document not found');
        }

        // Verify file exists
        if (!$document->filename || !Storage::disk('private')->exists($document->content)) {
            abort(404, 'File not found.');
        }

        // Return the file for download
        return Storage::disk('private')->download($document->content, $document->filename);
    }

    /**
     * Preview a document file (with organization verification)
     */
    public function preview(string $id)
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Manually load and verify the document belongs to current organisation
        $document = Document::withoutGlobalScope('organisation')
            ->where('id', $id)
            ->where('organisation_id', $organisationId)
            ->first();

        if (!$document) {
            abort(404, 'Document not found');
        }

        // Verify file exists
        if (!$document->filename || !Storage::disk('private')->exists($document->content)) {
            abort(404, 'File not found.');
        }

        // Return the file for inline viewing
        return Storage::disk('private')->response($document->content);
    }
}
