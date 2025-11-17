# GitHub Integration Module

This module provides GitHub repository integration for the portal, allowing organizations to link projects with GitHub repositories and sync repository metadata.

## Features

- **OAuth Authentication**: Secure OAuth 2.0 flow for connecting GitHub accounts
- **Repository Linking**: Link projects to GitHub repositories (one-to-one)
- **Metadata Sync**: Automatic synchronization of repository information (name, description, stars, watchers, etc.)
- **Organization-Level Configuration**: Each organization can configure their own GitHub OAuth credentials
- **Multi-Tenancy Support**: Isolated data per organization

## Setup Instructions

### 1. Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"OAuth Apps"** → **"New OAuth App"**
3. Fill in the application details:
   - **Application name**: Your Portal Name (e.g., "My Company Portal")
   - **Homepage URL**: Your application URL (e.g., `https://portal.yourcompany.com`)
   - **Authorization callback URL**: `{YOUR_APP_URL}/github/oauth/callback`
     - Local: `http://localhost/github/oauth/callback`
     - Production: `https://yourdomain.com/github/oauth/callback`
4. Click **"Register application"**
5. Copy the **Client ID**
6. Click **"Generate a new client secret"** and copy the **Client Secret**

### 2. Configure in Portal

1. Log in to the portal as an Admin or Manager
2. Go to **Settings** → **Modules**
3. Find the **GitHub** module
4. Enable the module by setting **Enabled** to **Yes**
5. Enter your **GitHub Client ID**
6. Enter your **GitHub Client Secret**
7. (Optional) Set **GitHub API URL** if using GitHub Enterprise
   - Default: `https://api.github.com`
   - Enterprise: `https://github.yourcompany.com/api/v3`
8. Click **Save**

### 3. Connect Your GitHub Account

To initiate the OAuth connection, navigate to the GitHub OAuth URL:

**URL**: `/github/oauth/connect`

Or use the named route in your application:
```php
route('github.oauth.connect')
```

The OAuth flow will:
1. Redirect you to GitHub for authorization
2. Request the configured OAuth scopes
3. Redirect back to `/github/oauth/callback` after authorization
4. Store your encrypted OAuth token in the database

**Note**: The frontend UI for initiating this connection may need to be implemented in your project's settings or integration pages.

## Usage

### Linking a Project to a Repository

1. Navigate to a project
2. Go to the project's GitHub section
3. Click **"Link Repository"**
4. Select a repository from the list
5. The repository will be linked and metadata will sync automatically

### Unlinking a Repository

1. Navigate to the project with a linked repository
2. Click **"Unlink Repository"**
3. Confirm the action

### Manual Sync

Repository metadata is synced automatically, but you can trigger a manual sync:
1. Navigate to the project with a linked repository
2. Click **"Sync Repository"**
3. Metadata will be refreshed from GitHub

## OAuth Scopes

The integration requests the following OAuth scopes:

- **`repo`**: Access to repositories (private and public)
- **`read:org`**: Read organization membership
- **`read:user`**: Read user profile information

## API Endpoints

### OAuth Routes (Web)
- `GET /github/oauth/connect` - Initiate OAuth flow
- `GET /github/oauth/callback` - OAuth callback handler
- `DELETE /github/oauth/disconnect` - Disconnect GitHub account

### Repository Management (API)
- `GET /api/v1/github/repositories` - List accessible repositories
- `POST /api/v1/github/repositories/{id}/link` - Link repository to project
- `DELETE /api/v1/github/repositories/{id}/unlink` - Unlink repository
- `POST /api/v1/github/repositories/{id}/sync` - Manual metadata sync
- `GET /api/v1/projects/{projectId}/github-repository` - Get project's repository

## Database Tables

### `github_oauth_tokens`
Stores encrypted OAuth access tokens per organization.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organisation_id | UUID | Organization reference |
| access_token | Encrypted | GitHub access token |
| token_type | String | Token type (usually "bearer") |
| scope | Text | Granted OAuth scopes |
| github_user_id | String | GitHub user ID |
| github_username | String | GitHub username |
| expires_at | Timestamp | Token expiration (optional) |

### `github_repositories`
Stores GitHub repository metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organisation_id | UUID | Organization reference |
| github_id | BigInt | GitHub repository ID |
| name | String | Repository name |
| full_name | String | Full name (owner/repo) |
| description | Text | Repository description |
| url | String | GitHub URL |
| homepage | String | Project homepage |
| language | String | Primary language |
| stargazers_count | Integer | Star count |
| watchers_count | Integer | Watcher count |
| forks_count | Integer | Fork count |
| open_issues_count | Integer | Open issues count |
| is_private | Boolean | Private repository |
| is_fork | Boolean | Is a fork |
| is_archived | Boolean | Is archived |
| default_branch | String | Default branch name |
| last_synced_at | Timestamp | Last sync time |

### `github_sync_logs`
Tracks synchronization operations.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organisation_id | UUID | Organization reference |
| repository_id | UUID | Repository reference |
| status | Enum | success/failed/pending |
| message | Text | Log message |
| metadata | JSON | Additional metadata |

### `projects` Table Update
A foreign key column is added to link projects to repositories:

| Column | Type | Description |
|--------|------|-------------|
| github_repository_id | UUID | Nullable FK to github_repositories |

## Security Features

- **Token Encryption**: OAuth tokens are automatically encrypted at rest
- **CSRF Protection**: State parameter validation in OAuth flow
- **Organization Isolation**: Multi-tenant data separation
- **One-to-One Constraint**: Projects can only link to one repository
- **Rate Limit Tracking**: GitHub API rate limit monitoring (5,000 requests/hour)

## Caching Strategy

- **Repository Lists**: 15 minutes
- **Repository Metadata**: 1 hour
- **OAuth Tokens**: 55 minutes (to avoid rate limits)

All caches use Redis for optimal performance.

## Troubleshooting

### "OAuth token not found" Error
- Ensure you've connected your GitHub account via the OAuth flow
- Check that the GitHub module is enabled for your organization
- Verify Client ID and Client Secret are correct in module settings

### "Repository already linked" Error
- Each project can only be linked to one repository
- Unlink the current repository before linking a new one

### Rate Limit Errors
- GitHub API has a limit of 5,000 requests per hour per OAuth token
- The module tracks rate limits and caches aggressively to minimize API calls
- Wait an hour for the rate limit to reset

### Sync Failures
- Check the `github_sync_logs` table for error details
- Verify the repository still exists and is accessible
- Ensure the OAuth token hasn't expired

## Development

### Running Migrations

```bash
php artisan migrate
```

### Queue Configuration

Background sync jobs use the `github` queue:

```bash
php artisan queue:work --queue=github
```

Or with Laravel Sail:

```bash
./vendor/bin/sail artisan queue:work --queue=github
```

## Support

For issues or questions about the GitHub integration, please contact your system administrator or refer to the main application documentation.

## Related Documentation

- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [GitHub OAuth Scopes](https://docs.github.com/en/developers/apps/scopes-for-oauth-apps)
