# Portal Time Tracker Chrome Extension

Quick time tracking for portal services without leaving your current task.

## Development Setup

### Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `chrome-extension` directory

### Configuration

Before using the extension, you need to:

1. Update `manifest.json` with your portal domain in `host_permissions`
2. Update `lib/config.js` with your API base URL

### Project Structure

```
chrome-extension/
├── manifest.json              # Extension configuration (Manifest V3)
├── popup/
│   ├── popup.html            # Main popup interface
│   ├── popup.js              # Popup logic and event handlers
│   └── popup.css             # Styles
├── background/
│   └── service-worker.js     # Background tasks, API communication, sync
├── content-scripts/          # Content scripts for page integration
├── options/
│   ├── options.html          # Settings/preferences page
│   └── options.js            # Configuration logic
├── assets/
│   └── icons/                # Extension icons (16, 48, 128px)
└── lib/
    ├── api-client.js         # Centralized API communication
    ├── storage.js            # Chrome storage wrapper
    └── config.js             # Configuration constants
```

## Usage

### First Time Setup

1. Click the extension icon in Chrome toolbar
2. Click "Login with Portal"
3. You'll be redirected to the portal to generate an extension token
4. Copy the token and paste it into the extension
5. Click "Save Token"

### Using the Timer (Recommended)

1. Click the extension icon
2. Select a service from the dropdown
3. Add a description (optional)
4. Click "Start Timer"
5. Work on your task while the timer runs
6. Click "Stop" when finished - time is automatically logged

### Manual Time Entry

1. Click the extension icon
2. Click "Add time manually" to expand the form
3. Select a service from the dropdown
4. Enter duration (e.g., "2.5" for 2.5 hours or "2:30" for 2 hours 30 minutes)
5. Add a description (optional)
6. Select a date (defaults to today)
7. Click "Log Time"

## Features

- ✅ **Timer functionality** - Start/stop timers with live elapsed time tracking
- ✅ **Timer-first design** - Encourages real-time tracking over manual entry
- ✅ **Theme support** - Light, dark, and system theme options
- ✅ Quick manual time entry from browser toolbar
- ✅ Service selection dropdown
- ✅ Recent entries display
- ✅ Offline support (entries queued and synced when online)
- ✅ Secure token-based authentication
- ⏳ GitHub integration (coming soon)

## Troubleshooting

### Extension won't load
- Make sure you selected the correct directory containing `manifest.json`
- Check the Chrome Extensions page for error messages
- **IMPORTANT**: Do NOT open `popup.html` directly in a browser - it must be loaded as a Chrome extension

### Chrome Storage API not available error
This means the extension is not loaded properly:
1. Go to `chrome://extensions/`
2. Make sure "Developer mode" is enabled (top right)
3. Click "Load unpacked"
4. Navigate to `/Volumes/CaseSensitive/Sites/Deploy/portal/portal-v2/chrome-extension`
5. Select the folder and click "Select"
6. The extension icon should appear in your Chrome toolbar
7. Click the extension icon to open the popup

### Token not persisting / asking for login on refresh
- This happens when the extension is opened directly as an HTML file instead of through the Chrome extension
- Follow the "Chrome Storage API not available" steps above to load it properly
- Once loaded correctly, tokens will persist between sessions

### Can't authenticate
- Verify your portal domain is correct in `manifest.json` under `host_permissions`
- Ensure your extension token hasn't expired (90 day expiration)
- Try generating a new token from the portal

### API requests failing
- Check `lib/config.js` has the correct API URL
- Verify CORS is properly configured on the backend
- Check browser console for detailed error messages

## Development Notes

- Uses vanilla JavaScript (no build step required for MVP)
- Manifest V3 for future compatibility
- Service Worker for background tasks
- Chrome Storage API for local data caching

## Contributing

1. Make changes to the extension files
2. Reload the extension in `chrome://extensions/` (click reload icon)
3. Test thoroughly
4. Commit changes with clear messages

## Support

For issues or questions, contact the development team or create an issue in the repository.