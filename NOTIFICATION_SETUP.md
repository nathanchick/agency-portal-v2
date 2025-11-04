# Notification Center Setup Guide

## Overview
A complete notification center with real-time updates using Laravel Echo + Soketi has been implemented.

## What's Been Implemented

### Backend
- ✅ Notifications database table
- ✅ Broadcasting configuration
- ✅ NotificationController with full CRUD operations
- ✅ API routes for notification management
- ✅ Shared unread count via Inertia middleware
- ✅ Updated all existing notification classes to support database + broadcast channels

### Frontend
- ✅ Laravel Echo + Pusher JS integration
- ✅ NotificationBell component with badge counter
- ✅ NotificationDropdown with notification list
- ✅ Real-time notification listener hook
- ✅ Toast notifications for new alerts
- ✅ TypeScript types for all notification data

## Environment Configuration

Add these variables to your `.env` file:

```bash
# Broadcasting
BROADCAST_CONNECTION=pusher
QUEUE_CONNECTION=database

# Pusher/Soketi Configuration
PUSHER_APP_ID=your-app-id
PUSHER_APP_KEY=your-app-key
PUSHER_APP_SECRET=your-app-secret
PUSHER_APP_CLUSTER=mt1

# Soketi Server (change when deploying)
PUSHER_HOST=127.0.0.1
PUSHER_PORT=6001
PUSHER_SCHEME=http

# For production with SSL
# PUSHER_SCHEME=https
# PUSHER_PORT=443
```

Add to your `.env` (frontend - Vite):

```bash
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
```

## Soketi Installation & Setup

### Option 1: Local Development (Docker)

Create `docker-compose.soketi.yml`:

```yaml
version: '3'
services:
  soketi:
    image: 'quay.io/soketi/soketi:latest-16-alpine'
    ports:
      - '6001:6001'
    environment:
      SOKETI_DEBUG: '1'
      SOKETI_DEFAULT_APP_ID: 'your-app-id'
      SOKETI_DEFAULT_APP_KEY: 'your-app-key'
      SOKETI_DEFAULT_APP_SECRET: 'your-app-secret'
```

Run: `docker-compose -f docker-compose.soketi.yml up -d`

### Option 2: Laravel Forge (Production)

1. **Install Soketi on your server:**
   ```bash
   npm install -g @soketi/soketi
   ```

2. **Create Soketi daemon in Forge:**
   - Go to your site → Daemons
   - Add new daemon:
     - Command: `soketi start --config=/path/to/soketi-config.json`
     - User: `forge`
     - Directory: `/home/forge/your-site.com`

3. **Create Soketi config file** (`/home/forge/soketi-config.json`):
   ```json
   {
     "debug": false,
     "host": "0.0.0.0",
     "port": 6001,
     "appManager.array.apps": [
       {
         "id": "your-app-id",
         "key": "your-app-key",
         "secret": "your-app-secret",
         "enableClientMessages": true,
         "enableStatistics": true
       }
     ]
   }
   ```

4. **Add Queue Worker Daemon:**
   - Command: `php artisan queue:work --tries=3`
   - User: `forge`
   - Directory: `/home/forge/your-site.com`

5. **Update Nginx to proxy Soketi** (if using same domain):
   Add to your Nginx config:
   ```nginx
   location /ws {
       proxy_pass http://127.0.0.1:6001;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "Upgrade";
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

## Testing

### 1. Test Notification Creation

```bash
./vendor/bin/sail artisan tinker
```

```php
$user = \App\Models\User::first();
$user->notify(new \Modules\Organisation\Notifications\UserAddedToOrganisation('Test Org', 'Test Customer'));
```

### 2. Check Browser Console
- Open DevTools → Console
- You should see Pusher/Soketi connection logs
- New notifications should appear with a toast

### 3. Test UI
- Click the bell icon in the header
- Notifications should load in dropdown
- Badge counter should update in real-time
- Mark as read/delete should work

## API Endpoints

All routes are prefixed with `/notifications`:

- `GET /notifications` - List notifications (paginated)
- `GET /notifications/unread-count` - Get unread count
- `POST /notifications/{id}/read` - Mark single as read
- `POST /notifications/read-all` - Mark all as read
- `DELETE /notifications/{id}` - Delete notification

## Troubleshooting

### Notifications not appearing in real-time:
1. Check Soketi is running: `docker ps` or check Forge daemon
2. Check browser console for Echo connection errors
3. Verify `.env` variables match Soketi config
4. Ensure queue worker is running

### Toast not showing:
- Check browser console for JavaScript errors
- Verify Sonner toast is initialized (should be in layout)

### Badge count not updating:
- Check Inertia shared props include `unreadNotificationsCount`
- Check `HandleInertiaRequests` middleware updated

## Security Notes

- In production, use SSL (HTTPS/WSS) for Soketi
- Keep `PUSHER_APP_SECRET` secure and never expose it to frontend
- Use Soketi authentication for sensitive notifications
- Consider rate limiting notification endpoints

## Next Steps

1. Set up Soketi server (Docker locally, Forge for production)
2. Update `.env` with correct values
3. Start queue worker daemon
4. Test notification flow
5. Configure SSL for production

## Need Help?

- Soketi Docs: https://docs.soketi.app/
- Laravel Broadcasting: https://laravel.com/docs/broadcasting
- Laravel Echo: https://github.com/laravel/echo
