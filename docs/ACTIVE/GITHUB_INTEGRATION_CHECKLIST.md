# GitHub Integration - Implementation Checklist

**Last Updated:** 2025-01-13
**Related:** [Full PRD](./GITHUB_INTEGRATION_PRD.md)
**Scope:** Phase 1 MVP Only - Repository Linking & Metadata Display

---

## Phase 1: Core Integration (MVP ONLY)

### Module Setup ✓/✗

- [ ] Create GitHub module: `php artisan module:make GitHub`
- [ ] Enable in `modules_statuses.json`
- [ ] Create all database migrations (4 tables)
- [ ] Run migrations successfully
- [ ] Create Eloquent models (3 models: Token, Repository, SyncLog)
- [ ] Update Project model: Add `githubRepository()` relationship
- [ ] Configure module settings schema
- [ ] Install packages: `knplabs/github-api`, `php-http/guzzle7-adapter`

### OAuth Authentication ✓/✗

- [ ] Implement `GitHubOAuthService`
- [ ] Create `GitHubOAuthController` with routes:
  - `GET /github/oauth/connect`
  - `GET /github/oauth/callback`
  - `DELETE /github/oauth/disconnect`
- [ ] Build Settings UI component (`GitHubSettings.tsx`)
- [ ] Implement `GitHubTokenService` with caching
- [ ] Test OAuth flow end-to-end
- [ ] Verify token encryption in database

### Repository Management ✓/✗

- [ ] Implement `GitHubApiService` with rate limiting
- [ ] Create `GitHubRepositoryController` with routes:
  - `GET /api/github/repositories`
  - `POST /api/github/repositories/{id}/link`
  - `DELETE /api/github/repositories/{id}/unlink`
  - `POST /api/github/repositories/{id}/sync`
  - `GET /api/projects/{id}/github-repositories`
- [ ] Implement `GitHubRepositorySyncService`
- [ ] Create `SyncRepositoryMetadata` job
- [ ] Schedule automatic sync (every 6 hours)
- [ ] Build `RepositoryList.tsx` component
- [ ] Build `LinkRepositoryModal.tsx` component
- [ ] Build `ProjectGitHubRepositories.tsx` component
- [ ] Test repository linking workflow

**Note:** Phase 2 (Issues/PRs/Webhooks) and Phase 3 (Advanced Features) are out of scope for this release.

---

## Testing

### Unit Tests ✓/✗

- [ ] `GitHubOAuthServiceTest`
- [ ] `GitHubApiServiceTest`
- [ ] `GitHubRepositorySyncServiceTest`
- [ ] Coverage: 80%+ for all services

### Feature Tests ✓/✗

- [ ] OAuth connection flow
- [ ] Repository linking to project
- [ ] Repository unlinking from project
- [ ] Manual repository sync
- [ ] One-to-one constraint (project can only have one repo)

---

## Documentation

- [ ] Create GitHub OAuth App setup guide
- [ ] Admin guide (connecting GitHub, linking repos)
- [ ] User guide (viewing GitHub data on projects)
- [ ] Troubleshooting common issues guide

---

## Deployment

### Pre-Deployment ✓/✗

- [ ] All tests passing
- [ ] Database migrations reviewed (4 migrations)
- [ ] Rollback plan documented

### Deployment Steps ✓/✗

- [ ] Run migrations: `php artisan migrate`
- [ ] Clear cache: `php artisan cache:clear`
- [ ] Restart queues: `php artisan queue:restart`
- [ ] Enable module: `php artisan module:enable GitHub`
- [ ] Configure OAuth credentials in settings
- [ ] Test OAuth connection
- [ ] Test repository linking
- [ ] Monitor logs for errors

### Post-Deployment ✓/✗

- [ ] Check queue job success rates (Horizon)
- [ ] Monitor GitHub API rate limit usage
- [ ] Gather user feedback
- [ ] Track adoption metrics

---

## Troubleshooting

### Common Issues

**OAuth fails:**
- Check GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in settings
- Verify callback URL matches GitHub OAuth app config: `{APP_URL}/github/oauth/callback`
- Ensure app is publicly accessible (for OAuth redirects)

**Rate limit exceeded:**
- Check cache is working (Redis)
- Review API call frequency in sync logs
- Reduce manual syncs

**Sync jobs failing:**
- Check queue worker is running: `php artisan horizon:list`
- Review failed jobs in Horizon dashboard
- Verify OAuth token hasn't been revoked
- Check repository permissions (must have `repo` scope)

**Repository won't link:**
- Verify project doesn't already have a repository linked
- Check unique constraint on `projects.github_repository_id`
- Ensure repository belongs to authenticated GitHub account

---

**Checklist Version:** 1.0 (Phase 1 MVP Only)
**Status:** Ready for Development
