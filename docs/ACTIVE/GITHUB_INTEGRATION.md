# GitHub Integration for Chrome Extension

## Overview
The Chrome extension now integrates with GitHub issues to allow users to quickly start timers directly from GitHub issue pages.

## Features

### 1. Floating "Start Timer" Button
- Appears on all GitHub issue pages (e.g., `https://github.com/owner/repo/issues/123`)
- Fixed position at bottom-right corner of the page
- Green button with hover effects
- Automatically detects issue information

### 2. External Reference Tracking
When a timer is started from a GitHub issue, it includes an `external_reference` object in the DB format:

```json
{
  "id": "982",
  "group_id": "DeployEcommerce/golfposer",
  "permalink": "https://github.com/DeployEcommerce/golfposer/issues/982",
  "service": "github.com",
  "service_icon_url": "https://proxy.harvestfiles.com/production_harvestapp_public/uploads/platform_icons/github.com.png?1598293589"
}
```

### 3. User Flow
1. User visits a GitHub issue page
2. Green "Start Timer" button appears in bottom-right corner
3. User clicks the button
4. Extension badge shows "!" indicator
5. User clicks extension icon to open popup
6. Timer description is pre-filled with: `Issue Title #123`
7. User selects service and task, then starts timer
8. Timer is created with external_reference attached

## Implementation Details

### Files Modified

#### 1. `chrome-extension/content-scripts/github.js`
- Content script that runs on GitHub issue pages
- Detects issue page and extracts issue information
- Creates floating button
- Sends message to background script with issue data

#### 2. `chrome-extension/background/service-worker.js`
- Receives message from content script
- Builds `external_reference` object
- Stores pending timer in chrome.storage
- Updates extension badge

#### 3. `chrome-extension/popup/popup.js`
- Checks for pending timer on popup open
- Pre-fills description field
- Stores external_reference in state
- Passes external_reference to API when starting timer

#### 4. `chrome-extension/lib/api-client.js`
- Updated `startTimer()` method to accept `externalReference` parameter
- Includes external_reference in API payload

#### 5. `chrome-extension/manifest.json`
- Registered content script for GitHub: `https://github.com/*/*/issues/*`

## API Endpoint

### POST `/extension/timer/start`

**Payload:**
```json
{
  "service_id": "123",
  "task_id": "456",
  "description": "Fix authentication bug #982",
  "external_reference": {
    "id": "982",
    "group_id": "DeployEcommerce/golfposer",
    "permalink": "https://github.com/DeployEcommerce/golfposer/issues/982",
    "service": "github.com",
    "service_icon_url": "https://proxy.harvestfiles.com/production_harvestapp_public/uploads/platform_icons/github.com.png?1598293589"
  }
}
```

## Future Enhancements

### ClickUp Integration
- Similar button on ClickUp task pages
- Content script: `chrome-extension/content-scripts/clickup.js`
- Already registered in manifest: `https://app.clickup.com/*`

### Trello Integration
- Similar button on Trello card modals
- Content script: `chrome-extension/content-scripts/trello.js`
- Already registered in manifest: `https://trello.com/*`

## Testing

1. Load extension in Chrome
2. Visit a GitHub issue: `https://github.com/{owner}/{repo}/issues/{number}`
3. Look for green "Start Timer" button in bottom-right
4. Click button
5. Open extension popup
6. Verify description is pre-filled
7. Select service and task
8. Start timer
9. Verify timer includes external_reference in API call

## Troubleshooting

### Button Not Appearing
1. Check browser console for `[Portal Time Tracker]` logs
2. Verify URL matches pattern: `/owner/repo/issues/123`
3. Reload extension in `chrome://extensions/`
4. Refresh the GitHub page

### External Reference Not Saved
1. Check Network tab for `/extension/timer/start` request
2. Verify `external_reference` is in payload
3. Check backend logs for any validation errors
