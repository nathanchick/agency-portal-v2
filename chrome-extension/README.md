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

### Logging Time

1. Click the extension icon
2. Select a service from the dropdown
3. Enter duration (e.g., "2.5" for 2.5 hours or "2:30" for 2 hours 30 minutes)
4. Add a description (optional)
5. Select a date (defaults to today)
6. Click "Log Time"

## Features

- ✅ Quick time entry from browser toolbar
- ✅ Service selection dropdown
- ✅ Recent entries display
- ✅ Offline support (entries queued and synced when online)
- ✅ Secure token-based authentication
- ⏳ GitHub integration (coming soon)
- ⏳ Timer functionality (coming soon)

## Troubleshooting

### Extension won't load
- Make sure you selected the correct directory containing `manifest.json`
- Check the Chrome Extensions page for error messages

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