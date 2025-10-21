<?php

use Illuminate\Support\Facades\Route;
use Modules\Document\Http\Controllers\CustomerDocumentController;
use Modules\Document\Http\Controllers\DocumentController;
use Modules\Document\Http\Controllers\DocumentTypeController;

/**
 * Organisation Routes for Document Management
 */
Route::middleware(['auth', 'verified', 'organisation'])->group(function () {
    // Document Types - Only Admin can access
    Route::resource('document-types', DocumentTypeController::class)->middleware('role:Admin');
    // Secure file download/preview routes with organization verification
    Route::get('document-types/{document}/download', [DocumentTypeController::class, 'download'])->name('document-types.download')->middleware('role:Admin');
    Route::get('document-types/{document}/preview', [DocumentTypeController::class, 'preview'])->name('document-types.preview')->middleware('role:Admin');

    // Document Management - All organisation users can access
    Route::get('/documents/pending', [DocumentController::class, 'pending'])->name('documents.pending');
    Route::get('/documents/completed', [DocumentController::class, 'completed'])->name('documents.completed');
    Route::get('/documents/create', [DocumentController::class, 'create'])->name('documents.create');
    Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::get('/documents/{documentRequest}/edit', [DocumentController::class, 'edit'])->name('documents.edit');
    Route::put('/documents/{documentRequest}', [DocumentController::class, 'update'])->name('documents.update');
    Route::post('/documents/{documentRequest}/void', [DocumentController::class, 'void'])->name('documents.void');
    Route::post('/documents/{documentRequest}/resend', [DocumentController::class, 'resend'])->name('documents.resend');
});

/**
 * Customer Portal Routes for Document Viewing/Signing
 */
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/customer/documents/my-pending', [CustomerDocumentController::class, 'myPending'])->name('customer.documents.my-pending');
    Route::get('/customer/documents/my-completed', [CustomerDocumentController::class, 'myCompleted'])->name('customer.documents.my-completed');
    Route::get('/customer/documents/all-pending', [CustomerDocumentController::class, 'allPending'])->name('customer.documents.all-pending');
    Route::get('/customer/documents/all-completed', [CustomerDocumentController::class, 'allCompleted'])->name('customer.documents.all-completed');
    Route::get('/customer/documents/{id}/view-sign', [CustomerDocumentController::class, 'viewSign'])->name('customer.documents.view-sign');
    Route::post('/customer/documents/{id}/approve', [CustomerDocumentController::class, 'approve'])->name('customer.documents.approve');
    Route::post('/customer/documents/{id}/decline', [CustomerDocumentController::class, 'decline'])->name('customer.documents.decline');
});
