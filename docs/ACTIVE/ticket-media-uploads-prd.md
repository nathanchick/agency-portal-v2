# Product Requirements Document: Ticket Media Upload Feature

## Document Information
- **Feature**: Media Upload Support for Tickets Module
- **Status**: Planning
- **Created**: 2025-11-11
- **Last Updated**: 2025-11-11
- **Author**: Product & Engineering Team

---

## 1. Executive Summary

### Problem Statement
The current Tickets module lacks the ability for users to attach files, images, or other media when creating tickets or adding messages/responses. This limitation forces users to share important information (screenshots, logs, documents) through external channels, reducing efficiency and creating disconnected support workflows.

### Proposed Solution
Integrate Spatie's Laravel Media Library into the Tickets module to enable:
- File attachments on ticket creation
- File attachments when adding messages/responses
- Support for multiple file types (images, documents, logs, etc.)
- Secure file storage with proper access controls
- Preview capabilities for supported media types
- Download functionality for all attachments

### Key Benefits
1. **Improved User Experience**: Users can attach relevant files directly within tickets
2. **Centralized Information**: All ticket-related assets in one location
3. **Better Support Quality**: Visual evidence and logs accessible immediately
4. **Security**: Tenant-isolated storage with proper access controls
5. **Scalability**: Robust media handling using industry-standard library

### Key Risks
1. **Storage Costs**: Media files will increase storage requirements
2. **Performance**: Large file uploads may impact server performance
3. **Security**: Malicious file uploads require proper validation
4. **Migration**: Existing tickets won't have attachments (acceptable trade-off)

---

## 2. Technical Analysis

### Current Architecture Assessment

**Tech Stack:**
- Laravel 12.x
- React 18+ with TypeScript (Inertia.js for SSR)
- PostgreSQL/MySQL (UUID-based schema)
- Modular architecture (nwidart/laravel-modules)
- Multi-tenant (spatie/laravel-multitenancy)
- shadcn/ui component library
- coderflex/laravel-ticket base package

**Current Ticket Module Structure:**
```
Modules/Ticket/
├── app/
│   ├── Models/
│   │   ├── Ticket.php (extends BaseTicket)
│   │   ├── Message.php (extends BaseMessage)
│   │   ├── Category.php
│   │   ├── Label.php
│   │   └── TicketStatus.php
│   ├── Http/
│   │   └── Controllers/
│   │       ├── TicketController.php
│   │       ├── CustomerTicketController.php
│   │       └── AutomationRuleController.php
│   └── Events/
│       ├── TicketCreated.php
│       └── TicketUpdated.php
├── database/
│   └── migrations/
├── routes/
│   ├── web.php
│   └── api.php
└── config/
```

**Database Schema:**
- `tickets` table: UUID primary key, organisation_id, user_id, title, message, priority, status, metadata (JSON)
- `ticket_messages` table: UUID primary key, ticket_id, user_id, message, is_private

**Frontend Structure:**
```
resources/js/
├── pages/tickets/
│   ├── index.tsx (ticket list)
│   ├── show.tsx (ticket detail view)
│   ├── create.tsx (create ticket form)
│   └── customer-show.tsx (customer view)
└── components/ui/
    └── [shadcn components]
```

### Proposed Changes

**1. Package Dependencies:**
- Add: `spatie/laravel-medialibrary` (^11.0) - Main media handling library
- Required by spatie: Already have `spatie/laravel-multitenancy`

**2. Database Changes:**
- New `media` table (created by spatie package migration)
  - id, model_type, model_id, uuid, collection_name, name, file_name, mime_type, disk, size, etc.
- Both `Ticket` and `Message` models will use polymorphic relationships to `media` table

**3. Model Changes:**
```php
// Modules/Ticket/app/Models/Ticket.php
class Ticket extends BaseTicket implements HasMedia
{
    use InteractsWithMedia;
    use BelongsToTenant;
    use HasUuids;

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('attachments')
             ->acceptsMimeTypes([
                 'image/jpeg', 'image/png', 'image/gif', 'image/webp',
                 'application/pdf',
                 'application/zip',
                 'text/plain', 'text/csv',
                 'application/vnd.ms-excel',
                 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                 'application/msword',
                 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
             ])
             ->maxFileSize(10 * 1024 * 1024); // 10MB
    }
}

// Same for Message.php
```

**4. Controller Changes:**
```php
// TicketController::store() - Add file handling
public function store(Request $request)
{
    $validated = $request->validate([
        // ... existing validation
        'attachments.*' => 'nullable|file|max:10240', // 10MB
    ]);

    $ticket = Ticket::create([...]);

    // Handle file uploads
    if ($request->hasFile('attachments')) {
        foreach ($request->file('attachments') as $file) {
            $ticket->addMedia($file)->toMediaCollection('attachments');
        }
    }

    return redirect()->route('tickets.show', $ticket);
}

// TicketController::addMessage() - Add file handling
// New endpoint: TicketController::downloadAttachment()
// New endpoint: TicketController::deleteAttachment()
```

**5. Frontend Components:**
- New `FileUpload.tsx` component (drag-and-drop + click to upload)
- New `AttachmentList.tsx` component (display with preview/download)
- Update `create.tsx` to include file upload
- Update `show.tsx` to display attachments and allow uploads in messages

**6. API Endpoints:**
```
POST   /tickets                              -> store (with files)
POST   /tickets/{ticket}/messages            -> addMessage (with files)
GET    /tickets/{ticket}/attachments/{media} -> downloadAttachment
DELETE /tickets/{ticket}/attachments/{media} -> deleteAttachment
POST   /customer/tickets                     -> store (with files)
```

**7. Storage Configuration (SECURE - Private Storage):**
- **CRITICAL**: Use Laravel's **PRIVATE** `storage/app` directory (NOT public!)
- Use Spatie's default PathGenerator (automatically organizes by model ID and media ID)
- Default path structure: `storage/app/{model_id}/{media_id}/{filename}`
- Files **NOT accessible via direct URL** - must go through authenticated controller
- All downloads served via `Storage::download()` with authentication/authorization checks
- Content-Disposition: attachment header **forces download** (prevents inline viewing in browser)
- Use disk: 'local' (private) NOT 'public' in config/filesystems.php
- **Security**: Files stored outside web root, cannot be accessed without proper authentication
- **Note**: Custom PathGenerator can be implemented later if tenant-specific paths needed

### Dependency Mapping

**Direct Dependencies:**
1. spatie/laravel-medialibrary installation
2. Database migration for media table
3. Model updates (Ticket, Message)

**Secondary Dependencies:**
4. Controller updates for file handling
5. Route additions for media endpoints
6. Frontend file upload component
7. Frontend attachment display component

**Tertiary Dependencies:**
8. Validation rules and security measures
9. Tests for file upload functionality
10. Documentation updates

### Performance Considerations

**Upload Performance:**
- Max file size: 10MB per file
- Max files per ticket: 5 (configurable)
- Asynchronous processing for large files (future enhancement)

**Storage Performance:**
- Media library uses optimized queries
- Lazy loading of media relationships
- Thumbnail generation for images (optional, future enhancement)

**Download Performance:**
- Direct file serving through Laravel storage
- Proper caching headers
- Consider CDN integration (future enhancement)

### Customer Portal Requirements

**Attachment Visibility:**
- **Ticket-Level Attachments**: Customers can see all attachments on tickets they created
- **Message Attachments**: Customers can see attachments on public messages (is_private = false)
- **Private Message Attachments**: Hidden from customers - only visible to organization users
- **Download Access**: Customers can download their own uploaded attachments and public message attachments

**Upload Restrictions for Customers:**
- Same file size limit as organization users (10MB per file)
- Same file type restrictions (whitelist)
- Same maximum files per upload (5 files)
- Rate limiting: 5 uploads per minute (lower than org users: 10 per minute)

**Authorization Logic:**
```php
// Customer can download if:
// 1. They created the ticket AND
// 2. Attachment is on ticket OR attachment is on non-private message
if ($ticket->user_id === $customer->user_id) {
    if ($media->model_type === Ticket::class) {
        return true; // Ticket attachment
    }
    if ($media->model_type === Message::class && !$message->is_private) {
        return true; // Public message attachment
    }
}
return false;
```

---

## 3. Implementation Plan

### Phase 1: Backend Foundation (High Priority)

**Milestone 1.1: Package Installation & Configuration**
- Install spatie/laravel-medialibrary via Composer
- Publish package configuration
- Run media library migrations
- Configure filesystems and storage

**Milestone 1.2: Model Integration**
- Update Ticket model with HasMedia interface and trait
- Update Message model with HasMedia interface and trait
- Register media collections with validation rules
- Add media relationship eager loading

**Milestone 1.3: Controller & API Updates**
- Add file upload handling to TicketController::store()
- Add file upload handling to TicketController::addMessage()
- Create downloadAttachment endpoint with access control
- Create deleteAttachment endpoint with authorization
- Mirror changes in CustomerTicketController

### Phase 2: Frontend Implementation (High Priority)

**Milestone 2.1: File Upload Component**
- Create FileUpload.tsx component (drag-and-drop)
- Add file type validation on frontend
- Add file size validation on frontend
- Show upload progress indicator
- Handle multiple file selection

**Milestone 2.2: Attachment Display Component**
- Create AttachmentList.tsx component
- Show file name, size, type
- Add download button
- Add delete button (with permission checks)
- Show image thumbnails/previews

**Milestone 2.3: UI Integration**
- Add FileUpload to ticket creation form (create.tsx)
- Add FileUpload to message/response form (show.tsx)
- Display attachments in ticket detail view (show.tsx)
- Display attachments in message responses
- Update TypeScript interfaces for media data

### Phase 3: Security & Validation (High Priority)

**Milestone 3.1: Security Measures**
- Implement file type whitelist validation
- Implement virus scanning (ClamAV integration - optional)
- Add rate limiting to upload endpoints
- Implement proper access control checks
- Sanitize file names

**Milestone 3.2: Authorization Rules**
- Only ticket participants can download attachments
- Only ticket creator/assignee can delete attachments
- Admin/Manager override permissions
- Tenant isolation verification

### Phase 4: Testing & Documentation (Medium Priority)

**Milestone 4.1: Automated Tests**
- Unit tests for model media methods
- Feature tests for file upload endpoints
- Feature tests for file download endpoints
- Feature tests for file deletion
- Security tests for unauthorized access

**Milestone 4.2: Documentation**
- API documentation for media endpoints
- User guide for file attachments
- Admin guide for storage configuration
- Developer notes for future enhancements

### Phase 5: Optimization & Enhancement (Low Priority - Future)

**Milestone 5.1: Performance Optimization**
- Implement thumbnail generation for images
- Add CDN integration option
- Implement chunked uploads for large files
- Add image optimization/compression

**Milestone 5.2: Advanced Features**
- Preview modal for images/PDFs
- Inline image display in messages
- File search functionality
- Bulk download as ZIP

---

## 4. Risk Assessment

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Storage costs increase significantly | High | Medium | Implement file size limits, add storage monitoring, consider cleanup policies |
| Large file uploads timeout | Medium | Medium | Set reasonable file size limits (10MB), add chunked upload later if needed |
| Malicious file uploads | High | Low | Whitelist file types, implement virus scanning, validate MIME types |
| Performance degradation | Medium | Low | Lazy load media, use proper indexing, implement caching |
| Multi-tenant data leakage | Critical | Very Low | Leverage existing tenant isolation, add explicit checks |

### Timeline Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Spatie package API changes | Low | Low | Pin to specific version, monitor updates |
| Integration complexity higher than estimated | Medium | Low | Start with MVP, iterate on features |
| Frontend component complexity | Low | Low | Use simple file input first, enhance later |

### Mitigation Strategies

1. **Storage Management**:
   - Set conservative file size limits initially (10MB)
   - Monitor storage usage with Laravel Horizon/monitoring tools
   - Plan for storage cleanup policies (archive old attachments)

2. **Security**:
   - Whitelist known safe MIME types
   - Use Laravel's built-in file validation
   - Add custom MIME type verification
   - Implement per-user rate limiting

3. **Performance**:
   - Eager load media only when needed
   - Use Laravel's chunked responses for downloads
   - Consider queue jobs for post-upload processing

4. **Testing**:
   - Comprehensive test coverage before production
   - Staging environment testing with realistic file sizes
   - Security testing for access control

---

## 5. Task List

### Backend Tasks

#### Task #1: Install and Configure Spatie Media Library
**Priority**: Critical
**Effort**: Small (2 hours)
**Dependencies**: None
**Acceptance Criteria**:
- [ ] spatie/laravel-medialibrary added to composer.json
- [ ] Package installed via composer
- [ ] Config published to config/media-library.php
- [ ] Media migrations run successfully
- [ ] `media` table exists in database with proper schema

**GitHub Issue**: TBD

---

#### Task #2: Update Ticket Model for Media Support
**Priority**: Critical
**Effort**: Small (1 hour)
**Dependencies**: Task #1
**Acceptance Criteria**:
- [ ] Ticket model implements HasMedia interface
- [ ] Ticket model uses InteractsWithMedia trait
- [ ] registerMediaCollections() method configured
- [ ] Accepted MIME types defined (images, PDFs, docs, etc.)
- [ ] Max file size set to 10MB
- [ ] Media collection named 'attachments'

**GitHub Issue**: TBD

---

#### Task #3: Update Message Model for Media Support
**Priority**: Critical
**Effort**: Small (1 hour)
**Dependencies**: Task #1
**Acceptance Criteria**:
- [ ] Message model implements HasMedia interface
- [ ] Message model uses InteractsWithMedia trait
- [ ] registerMediaCollections() method configured
- [ ] Same validation rules as Ticket model
- [ ] Media collection named 'attachments'

**GitHub Issue**: TBD

---

#### Task #4: Add File Upload to Ticket Creation
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: Task #2
**Acceptance Criteria**:
- [ ] TicketController::store() validates 'attachments' input
- [ ] Files saved using addMedia() method
- [ ] Validation errors returned properly
- [ ] Transaction handling with explicit rollback strategy:
  ```php
  DB::transaction(function () use ($request, $validated) {
      $ticket = Ticket::create($validated);

      try {
          if ($request->hasFile('attachments')) {
              foreach ($request->file('attachments') as $file) {
                  $ticket->addMedia($file)->toMediaCollection('attachments');
              }
          }
      } catch (\Exception $e) {
          // Transaction will auto-rollback
          // Media library handles cleanup of partial uploads
          throw $e;
      }

      return $ticket;
  });
  ```
- [ ] Eager load media when returning ticket
- [ ] Works for both organisation and customer routes

**GitHub Issue**: TBD

---

#### Task #5: Add File Upload to Message/Response Creation
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: Task #3
**Acceptance Criteria**:
- [ ] TicketController::addMessage() validates 'attachments' input
- [ ] Files saved to message using addMedia() method
- [ ] Validation errors returned properly
- [ ] Transaction handling
- [ ] Eager load media when returning message
- [ ] Works for both organisation and customer routes

**GitHub Issue**: TBD

---

#### Task #6: Create Download Attachment Endpoint
**Priority**: High
**Effort**: Medium (2 hours)
**Dependencies**: Task #2, Task #3
**Acceptance Criteria**:
- [ ] New route: GET /tickets/{ticket}/attachments/{media}/download
- [ ] Method: TicketController::downloadAttachment()
- [ ] Verifies user has access to ticket
- [ ] Verifies media belongs to ticket or its messages
- [ ] **Private Message Check**: If attachment belongs to is_private message, deny access to customers
- [ ] **Customer Authorization**: Check if customer created ticket and attachment is public
- [ ] Returns file with proper headers (Content-Type, Content-Disposition: attachment)
- [ ] Logs download activity (user, ticket, media, timestamp)
- [ ] Returns 403 for unauthorized access
- [ ] Returns 404 if media not found

**GitHub Issue**: TBD

---

#### Task #7: Create Delete Attachment Endpoint
**Priority**: Medium
**Effort**: Medium (2 hours)
**Dependencies**: Task #2, Task #3
**Acceptance Criteria**:
- [ ] New route: DELETE /tickets/{ticket}/attachments/{media}
- [ ] Method: TicketController::deleteAttachment()
- [ ] Only ticket creator, assigned user, or Admin/Manager can delete
- [ ] Verifies media belongs to ticket or its messages
- [ ] Deletes media and physical file
- [ ] Returns success message
- [ ] Returns 403 for unauthorized access
- [ ] Returns 404 if media not found

**GitHub Issue**: TBD

---

#### Task #8: Add Validation Rules and Security Measures
**Priority**: Critical
**Effort**: Medium (3 hours)
**Dependencies**: Task #4, Task #5
**Acceptance Criteria**:
- [ ] MIME type whitelist enforced server-side
- [ ] File extension validation (must match MIME type)
- [ ] File size limit enforced (10MB per file)
- [ ] Maximum number of files per upload (5 files)
- [ ] Sanitize file names (remove special characters, prevent path traversal)
- [ ] Rate limiting applied to upload endpoints:
  - Organization users: 10 uploads per minute
  - Customer users: 5 uploads per minute
  - Per user (not per organization)
- [ ] Rate limiting for download endpoints: 100 downloads per minute per user
- [ ] Proper error messages for validation failures
- [ ] Prevent double extension attacks (e.g., file.php.jpg)
- [ ] Validate actual file content matches declared MIME type

**GitHub Issue**: TBD

---

#### Task #9: Update API Routes File
**Priority**: High
**Effort**: Small (30 minutes)
**Dependencies**: Task #6, Task #7
**Acceptance Criteria**:
- [ ] Download route added to web.php
- [ ] Delete route added to web.php
- [ ] Proper middleware applied (auth, verified, organisation)
- [ ] Role-based access control maintained
- [ ] Routes tested with route:list command
- [ ] Ziggy routes regenerated for frontend

**GitHub Issue**: TBD

---

### Frontend Tasks

#### Task #10: Create FileUpload Component
**Priority**: High
**Effort**: Medium (4 hours)
**Dependencies**: None (can work in parallel with backend)
**Acceptance Criteria**:
- [ ] New component: resources/js/components/FileUpload.tsx
- [ ] Supports drag-and-drop file selection
- [ ] Supports click-to-browse file selection
- [ ] Shows selected file list with names and sizes
- [ ] Allows removing files before upload
- [ ] Client-side validation for file types
- [ ] Client-side validation for file size (10MB)
- [ ] Displays error messages for invalid files
- [ ] Shows upload progress indicator
- [ ] Supports multiple file selection (up to 5)
- [ ] **Accessibility Requirements**:
  - [ ] Keyboard navigation (Tab, Enter, Space, Escape)
  - [ ] Screen reader announcements for file selection/removal
  - [ ] ARIA labels for all interactive elements
  - [ ] Focus management (trap focus in drag area when active)
  - [ ] Status announcements for validation errors
  - [ ] Semantic HTML (button, input type="file", etc.)
- [ ] Responsive design using shadcn/ui styling

**GitHub Issue**: TBD

---

#### Task #11: Create AttachmentList Component
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: None
**Acceptance Criteria**:
- [ ] New component: resources/js/components/AttachmentList.tsx
- [ ] Displays list of attachments with file icon
- [ ] Shows file name, size, and uploaded date
- [ ] Download button for each attachment
- [ ] Delete button (only if user has permission)
- [ ] Image preview/thumbnail for image files
- [ ] PDF icon for PDF files
- [ ] Generic file icon for other types
- [ ] Loading state while fetching attachments
- [ ] Empty state message when no attachments
- [ ] Responsive grid/list layout
- [ ] Uses shadcn/ui components (Card, Badge, Button)

**GitHub Issue**: TBD

---

#### Task #12: Update Ticket Creation Form with File Upload
**Priority**: High
**Effort**: Small (2 hours)
**Dependencies**: Task #10
**Acceptance Criteria**:
- [ ] FileUpload component added to create.tsx
- [ ] Form submits files with multipart/form-data
- [ ] Files included in Inertia form submission
- [ ] Validation errors displayed from backend
- [ ] Success message after ticket created with files
- [ ] Files field optional (not required)
- [ ] Works for both organisation and customer create forms

**GitHub Issue**: TBD

---

#### Task #13: Update Ticket Detail View with Attachments
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: Task #11
**Acceptance Criteria**:
- [ ] AttachmentList component added to show.tsx
- [ ] Displays ticket-level attachments in header/sidebar
- [ ] Displays message-level attachments below each message
- [ ] Download functionality working via route helper
- [ ] Delete functionality working (with confirmation dialog)
- [ ] Proper TypeScript interfaces for Media type
- [ ] Loading states for download/delete actions
- [ ] Error handling for failed operations
- [ ] Responsive layout on mobile

**GitHub Issue**: TBD

---

#### Task #14: Add File Upload to Message Response Form
**Priority**: High
**Effort**: Medium (2 hours)
**Dependencies**: Task #10, Task #13
**Acceptance Criteria**:
- [ ] FileUpload component added to message form in show.tsx
- [ ] Form submits files along with message text
- [ ] Files included in Inertia post request
- [ ] Validation errors displayed
- [ ] New message with attachments appears immediately
- [ ] Form resets after successful submission
- [ ] Works for both organisation and customer users

**GitHub Issue**: TBD

---

#### Task #15: Update TypeScript Interfaces for Media
**Priority**: Medium
**Effort**: Small (1 hour)
**Dependencies**: Task #11
**Acceptance Criteria**:
- [ ] Media interface defined with all required fields:
  ```typescript
  interface Media {
      id: string;
      uuid: string;
      model_type: string;
      model_id: string;
      collection_name: string;
      name: string;
      file_name: string;
      mime_type: string;
      disk: string;
      size: number;
      humanReadableSize: string; // e.g., "2.5 MB"
      created_at: string;
      updated_at: string;
      custom_properties?: Record<string, any>;
      order_column?: number;
  }
  ```
- [ ] Ticket interface includes `media?: Media[]` property
- [ ] Message interface includes `media?: Media[]` property
- [ ] Type safety enforced in all components
- [ ] No TypeScript errors in build

**GitHub Issue**: TBD

---

#### Task #16: Update API Action Files with File Upload Methods
**Priority**: Medium
**Effort**: Small (1 hour)
**Dependencies**: None
**Acceptance Criteria**:
- [ ] Update resources/js/actions/Modules/Ticket/Http/Controllers/TicketController.ts
- [ ] Add multipart form data support to store/update methods
- [ ] Add downloadAttachment method
- [ ] Add deleteAttachment method
- [ ] Proper error handling
- [ ] TypeScript types updated

**GitHub Issue**: TBD

---

### Testing Tasks

#### Task #17: Unit Tests for Ticket Model Media Methods
**Priority**: Medium
**Effort**: Small (2 hours)
**Dependencies**: Task #2
**Acceptance Criteria**:
- [ ] Test file: tests/Unit/Models/TicketTest.php
- [ ] Test media collection registration
- [ ] Test adding media to ticket
- [ ] Test retrieving media from ticket
- [ ] Test deleting media from ticket
- [ ] Test media validation rules
- [ ] All tests passing

**GitHub Issue**: TBD

---

#### Task #18: Unit Tests for Message Model Media Methods
**Priority**: Medium
**Effort**: Small (2 hours)
**Dependencies**: Task #3
**Acceptance Criteria**:
- [ ] Test file: tests/Unit/Models/MessageTest.php
- [ ] Test media collection registration
- [ ] Test adding media to message
- [ ] Test retrieving media from message
- [ ] Test deleting media from message
- [ ] All tests passing

**GitHub Issue**: TBD

---

#### Task #19: Feature Tests for Ticket Creation with Files
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: Task #4, Task #12
**Acceptance Criteria**:
- [ ] Test file: tests/Feature/Ticket/TicketCreationTest.php
- [ ] Test creating ticket with valid files
- [ ] Test creating ticket with multiple files
- [ ] Test creating ticket without files (still works)
- [ ] Test file size validation
- [ ] Test file type validation
- [ ] Test maximum files limit
- [ ] Test unauthorized file types rejected
- [ ] All tests passing with 100% coverage of upload logic

**GitHub Issue**: TBD

---

#### Task #20: Feature Tests for Message Creation with Files
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: Task #5, Task #14
**Acceptance Criteria**:
- [ ] Test file: tests/Feature/Ticket/MessageCreationTest.php
- [ ] Test adding message with valid files
- [ ] Test adding message with multiple files
- [ ] Test adding message without files (still works)
- [ ] Test file validation rules
- [ ] All tests passing

**GitHub Issue**: TBD

---

#### Task #21: Feature Tests for Download Attachment
**Priority**: Medium
**Effort**: Small (2 hours)
**Dependencies**: Task #6
**Acceptance Criteria**:
- [ ] Test file: tests/Feature/Ticket/AttachmentDownloadTest.php
- [ ] Test authorized user can download attachment
- [ ] Test unauthorized user cannot download attachment
- [ ] Test download returns correct file and headers
- [ ] Test 404 for non-existent attachment
- [ ] Test tenant isolation (user from another tenant cannot download)
- [ ] All tests passing

**GitHub Issue**: TBD

---

#### Task #22: Feature Tests for Delete Attachment
**Priority**: Medium
**Effort**: Small (2 hours)
**Dependencies**: Task #7
**Acceptance Criteria**:
- [ ] Test file: tests/Feature/Ticket/AttachmentDeleteTest.php
- [ ] Test authorized user can delete attachment
- [ ] Test unauthorized user cannot delete attachment
- [ ] Test file physically deleted from storage
- [ ] Test database record removed
- [ ] Test 404 for non-existent attachment
- [ ] All tests passing

**GitHub Issue**: TBD

---

### Documentation Tasks

#### Task #23: Update API Documentation
**Priority**: Low
**Effort**: Small (2 hours)
**Dependencies**: Task #9
**Acceptance Criteria**:
- [ ] Document file upload in ticket creation endpoint
- [ ] Document file upload in message creation endpoint
- [ ] Document download attachment endpoint
- [ ] Document delete attachment endpoint
- [ ] Include request/response examples
- [ ] Document validation rules and error responses
- [ ] Update Scramble/API docs configuration if needed

**GitHub Issue**: TBD

---

#### Task #24: Create User Documentation
**Priority**: Low
**Effort**: Small (2 hours)
**Dependencies**: All frontend tasks
**Acceptance Criteria**:
- [ ] Document how to attach files to tickets
- [ ] Document how to attach files to messages
- [ ] Document how to download attachments
- [ ] Document how to delete attachments
- [ ] Document file type and size limitations
- [ ] Include screenshots/GIFs of the UI
- [ ] Add FAQ section

**GitHub Issue**: TBD

---

#### Task #25: Create Admin/Developer Documentation
**Priority**: Low
**Effort**: Small (1 hour)
**Dependencies**: Task #1
**Acceptance Criteria**:
- [ ] Document storage configuration
- [ ] Document how to change file size limits
- [ ] Document how to add/remove supported file types
- [ ] Document media collection names and structure
- [ ] Document cleanup/maintenance procedures
- [ ] Add to developer notes in repository

**GitHub Issue**: TBD

---

### Security & Edge Case Tasks

#### Task #26: Filename Sanitization & Validation
**Priority**: High
**Effort**: Small (2 hours)
**Dependencies**: Task #4, Task #5
**Acceptance Criteria**:
- [ ] Sanitize filenames to remove:
  - Special characters (except . - _)
  - Unicode/emoji characters
  - Path traversal attempts (../, ..\, etc.)
  - Null bytes
  - Control characters
- [ ] Handle duplicate filename conflicts:
  - Append timestamp or counter: `file.pdf` → `file_1699123456.pdf`
  - OR use UUID-based naming
- [ ] Validate file extension matches MIME type:
  - `.jpg` file must have `image/jpeg` MIME type
  - Reject mismatched combinations
- [ ] Prevent double extension attacks:
  - Reject files like `malicious.php.jpg`
  - Only allow single extension
- [ ] Maximum filename length: 200 characters
- [ ] Unit tests for all sanitization scenarios

**GitHub Issue**: TBD

---

#### Task #27: Private Message Attachment Visibility
**Priority**: High
**Effort**: Small (2 hours)
**Dependencies**: Task #6, Task #13
**Acceptance Criteria**:
- [ ] Backend: Update `downloadAttachment()` method to check if message is private
- [ ] Backend: Deny download if customer accessing private message attachment
- [ ] Frontend: Hide attachments from private messages in customer portal view
- [ ] Frontend: AttachmentList component checks message `is_private` flag
- [ ] Add `canViewAttachment()` helper method to Ticket model
- [ ] Feature tests for private message attachment access
- [ ] Test customer cannot download private message attachments
- [ ] Test org users CAN download private message attachments

**GitHub Issue**: TBD

---

#### Task #28: Email Notification Integration (Optional)
**Priority**: Low
**Effort**: Medium (3 hours)
**Dependencies**: Task #6
**Acceptance Criteria**:
- [ ] Add download links to ticket creation email notifications
- [ ] Add download links to new message email notifications
- [ ] Email template shows list of attachment filenames with download URLs
- [ ] Download URLs include secure token (signed URL valid for 7 days)
- [ ] Document email size limits (no inline attachments, links only)
- [ ] Handle cases where recipient doesn't have permission (show "View in portal" link)
- [ ] Email subject line indicates "📎 with attachments"
- [ ] Configuration option to enable/disable attachment links in emails

**GitHub Issue**: TBD

---

## 6. Success Metrics

### Functional Metrics
- [ ] Users can attach files when creating tickets
- [ ] Users can attach files when adding messages
- [ ] Users can download attachments
- [ ] Authorized users can delete attachments
- [ ] All file types in whitelist work correctly
- [ ] File validation prevents invalid uploads
- [ ] Multi-tenant isolation works correctly

### Performance Metrics
- [ ] File upload completes in <5 seconds for 5MB file
- [ ] File download starts immediately (<500ms)
- [ ] Page load time increase <10% with attachments
- [ ] Database queries remain efficient (N+1 prevention)

### Quality Metrics
- [ ] 90%+ test coverage for media functionality
- [ ] Zero security vulnerabilities in file handling
- [ ] Zero data leakage between tenants
- [ ] All edge cases handled with proper error messages

### User Experience Metrics
- [ ] File upload UI is intuitive (no training required)
- [ ] Drag-and-drop works smoothly
- [ ] File preview works for common types
- [ ] Mobile upload experience is functional

---

## 7. Questions & Decisions

### Open Questions
1. **Storage Backend**: Use local storage or S3/cloud storage?
   - **Decision**: Start with **PRIVATE** local storage (storage/app - NOT public!), make cloud storage configurable later

2. **File Retention**: Should old attachments be archived or deleted?
   - **Decision**: No automatic deletion for MVP, add cleanup policy in future

3. **Virus Scanning**: Should we integrate ClamAV or similar?
   - **Decision**: Not for MVP, add as enhancement if needed

4. **Image Optimization**: Auto-compress/optimize images?
   - **Decision**: Not for MVP, store original files only

5. **Maximum Files**: What's the limit per ticket/message?
   - **Decision**: 5 files per upload, 10MB per file

### Resolved Decisions
- **Package Choice**: spatie/laravel-medialibrary - Industry standard, well-maintained
- **File Size Limit**: 10MB per file - Balances functionality and server load
- **Supported Types**: Images, PDFs, Office docs, text files, archives (ZIP)
- **Collection Name**: 'attachments' - Clear and consistent
- **Access Control**: Ticket participants only, with Admin/Manager override
- **Storage Path**: Organized by tenant and ticket ID
- **Migration Strategy**: No retroactive attachments for existing tickets

---

## 8. Future Enhancements (Post-MVP)

### Phase 6: Advanced Features (Future)
1. **Image Thumbnails**: Auto-generate thumbnails for images
2. **Inline Image Display**: Show images directly in messages
3. **PDF Preview**: In-browser PDF viewer
4. **Drag-and-Drop in Editor**: Paste images into message textarea
5. **Video Support**: Allow video attachments
6. **Cloud Storage**: S3/DigitalOcean Spaces integration
7. **CDN Integration**: Serve files through CDN
8. **Chunked Uploads**: Support larger files via chunked upload
9. **Image Optimization**: Auto-compress/resize images
10. **Virus Scanning**: ClamAV integration
11. **Attachment Search**: Search within attachments
12. **Bulk Operations**: Download multiple attachments as ZIP
13. **Version History**: Track file versions if re-uploaded
14. **Access Logs**: Audit trail for downloads
15. **Email Attachments**: Auto-attach to email notifications

---

## 9. Conclusion

This PRD provides a comprehensive plan for adding media upload capabilities to the Tickets module using Spatie's Laravel Media Library. The implementation is broken down into 28 discrete tasks across backend, frontend, testing, documentation, and security efforts.

**Total Estimated Effort**: ~62 hours
- Backend: ~18 hours
- Frontend: ~16 hours
- Testing: ~14 hours
- Documentation: ~5 hours
- Security & Edge Cases: ~7 hours (Tasks #26-28)
- Buffer for unknowns: ~2 hours

**Recommended Approach**:
1. Complete all Critical priority tasks first (Tasks #1-3, #8)
2. Complete High priority backend tasks (Tasks #4-7, #9, #26, #27)
3. Complete High priority frontend tasks (Tasks #10-14)
4. Complete testing tasks (Tasks #17-22)
5. Complete documentation tasks (Tasks #23-25)
6. Complete optional email integration (Task #28) if needed

**Next Steps**:
1. Review and approve this PRD
2. Create GitHub issues for each task
3. Assign tasks to developers
4. Begin implementation with Phase 1
5. Regular check-ins on progress

---

## Appendix A: File Type Whitelist

### Supported MIME Types
```
Images:
- image/jpeg
- image/png
- image/gif
- image/webp

Documents:
- application/pdf
- application/msword
- application/vnd.openxmlformats-officedocument.wordprocessingml.document
- application/vnd.ms-excel
- application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
- application/vnd.ms-powerpoint
- application/vnd.openxmlformats-officedocument.presentationml.presentation

Text:
- text/plain
- text/csv
- text/markdown

Archives:
- application/zip
- application/x-rar-compressed
```

### Maximum Sizes
- Per File: 10MB
- Per Upload: 50MB total (5 files × 10MB)
- Per Ticket: Unlimited (for MVP)

---

## Appendix B: Database Schema

### Media Table (Created by Spatie Package)
```sql
CREATE TABLE media (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    model_type VARCHAR(255) NOT NULL,
    model_id CHAR(36) NOT NULL,
    uuid CHAR(36) NULL,
    collection_name VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(255) NULL,
    disk VARCHAR(255) NOT NULL,
    conversions_disk VARCHAR(255) NULL,
    size BIGINT UNSIGNED NOT NULL,
    manipulations JSON NULL,
    custom_properties JSON NULL,
    generated_conversions JSON NULL,
    responsive_images JSON NULL,
    order_column INT UNSIGNED NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,

    INDEX idx_model (model_type, model_id),
    INDEX idx_uuid (uuid),
    INDEX idx_order (order_column)
);
```

### Relationships
- `model_type` = 'Modules\Ticket\Models\Ticket' or 'Modules\Ticket\Models\Message'
- `model_id` = UUID of Ticket or Message
- `collection_name` = 'attachments'

---

## Appendix C: Configuration Examples

### config/media-library.php (Key Settings - SECURE)
```php
return [
    // CRITICAL: Use 'local' disk for PRIVATE storage (NOT 'public')
    'disk_name' => env('MEDIA_DISK', 'local'),

    'max_file_size' => 10 * 1024 * 1024, // 10MB

    'path_generator' => \Spatie\MediaLibrary\Support\PathGenerator\DefaultPathGenerator::class,

    'queue_name' => env('QUEUE_NAME', 'default'),

    // ... other settings
];
```

### .env Variables
```
# IMPORTANT: Use 'local' for private storage (files in storage/app/)
# NOT 'public' which would expose files via direct URLs
MEDIA_DISK=local
FILESYSTEM_DISK=local
```

### Security Note
**Files stored with disk 'local'**:
- ✅ Stored in `storage/app/` (private)
- ✅ NOT accessible via direct URL
- ✅ Require authentication through controller
- ✅ Content-Disposition: attachment forces download

**Files stored with disk 'public'** (DO NOT USE):
- ❌ Stored in `storage/app/public/` (symlinked to `public/storage/`)
- ❌ Accessible via direct URL (security risk!)
- ❌ Anyone with the URL can view/download
- ❌ Bypasses authentication and authorization

---

*End of Product Requirements Document*