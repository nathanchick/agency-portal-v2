# ClickUp Integration Module

This module provides comprehensive ClickUp integration for the Laravel Portal application.

## Features

- **OAuth 2.0 Authentication**: Secure workspace connection via ClickUp OAuth
- **Space Management**: Assign ClickUp Spaces to customers for project organization
- **Task Creation**: Create ClickUp tasks directly from portal tickets
- **Chrome Extension Integration**: Start timers from ClickUp task pages
- **Rate Limiting**: Intelligent API rate limit management
- **Caching**: Aggressive caching to minimize API calls

## Installation

### 1. ClickUp OAuth App Setup

1. Log in to your ClickUp workspace
2. Navigate to Settings > Apps > API
3. Click "Create an App"
4. Fill in the application details:
   - **App Name**: Portal Integration (or your organization name)
   - **Redirect URL**: `https://your-portal-domain.com/clickup/oauth/callback`
5. Save and note the **Client ID** and **Client Secret**

### 2. Environment Configuration

Add the following variables to your `.env` file:

```env
CLICKUP_CLIENT_ID=your_client_id_here
CLICKUP_CLIENT_SECRET=your_client_secret_here
CLICKUP_REDIRECT_URI=${APP_URL}/clickup/oauth/callback
```

### 3. Run Migrations

```bash
php artisan migrate
```

### 4. Enable Module

1. Log in to the portal as an organization administrator
2. Navigate to Settings > Modules
3. Enable the "ClickUp" module

## Usage

### Connecting ClickUp

1. Navigate to Settings > Integrations
2. Click "Connect ClickUp"
3. Authorize the portal to access your ClickUp workspace
4. Select which workspace/team to connect (if you have multiple)

### Assigning Spaces to Customers

1. Navigate to Customers > Edit Customer
2. In the "ClickUp" section, select a Space from the dropdown
3. Save the customer

### Creating Tasks from Tickets

1. Open a ticket detail page
2. Click "Create ClickUp Task"
3. The task will be created in the customer's assigned Space
4. Task title will be formatted as: `[TICKET-{uuid}] {ticket_title}`

### Chrome Extension Integration

When viewing a ClickUp task page:
1. Click the "Start Timer" button injected by the extension
2. The timer popup will pre-fill with the task name and context
3. Start tracking time directly from ClickUp

## Architecture

### Service Layer

- **ClickUpOAuthService**: OAuth 2.0 flow management
- **ClickUpTokenService**: Token caching and validation
- **ClickUpApiService**: ClickUp API wrapper with rate limiting
- **ClickUpSpaceSyncService**: Space metadata synchronization
- **ClickUpTaskService**: Task creation and management

### Models

- **ClickUpOAuthToken**: Stores encrypted OAuth tokens (one per organization)
- **ClickUpSpace**: Cached Space metadata
- **ClickUpTask**: Links portal tickets to ClickUp tasks

### Background Jobs

- **SyncClickUpSpaces**: Periodically syncs Space metadata
- **CreateClickUpTask**: Asynchronously creates tasks in ClickUp

## Rate Limiting

ClickUp enforces the following rate limits:
- **Free/Unlimited/Business**: 100 requests/minute
- **Business Plus**: 1,000 requests/minute
- **Enterprise**: 10,000 requests/minute

The module automatically:
- Tracks requests per organization
- Warns when approaching limits (90% threshold)
- Queues operations when limits are reached
- Implements aggressive caching to minimize API calls

## Troubleshooting

### "Customer does not have a ClickUp Space configured"

Ensure the customer has a Space assigned in their settings.

### OAuth connection fails

1. Verify your Client ID and Client Secret in `.env`
2. Ensure the Redirect URI matches exactly in both ClickUp app settings and `.env`
3. Check that HTTPS is enabled (required for OAuth)

### Tasks not appearing in ClickUp

1. Check the background job queue is running: `php artisan queue:work`
2. Review logs for API errors: `tail -f storage/logs/laravel.log`
3. Verify the customer's Space still exists in ClickUp

## Development

### Running Tests

```bash
php artisan test --filter=ClickUp
```

### Adding New API Endpoints

See the developer documentation in `docs/COMPLETED/CLICKUP_INTEGRATION_PRD.md` for extending the integration.

## Security

- OAuth tokens are encrypted at rest using Laravel's encryption
- CSRF protection via state parameter in OAuth flow
- Rate limiting prevents API abuse
- Multi-tenancy ensures data isolation

## License

This module is proprietary to the Portal application.
