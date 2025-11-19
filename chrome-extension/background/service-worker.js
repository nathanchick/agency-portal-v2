/**
 * Background Service Worker
 *
 * Handles background tasks, sync, and alarms
 */

// Import config (for Manifest V3, we need to use importScripts)
importScripts('../lib/config.js');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details.reason);

  if (details.reason === 'install') {
    // First time installation
    handleFirstInstall();
  } else if (details.reason === 'update') {
    // Extension updated
    handleUpdate(details.previousVersion);
  }
});

// Handle first installation
function handleFirstInstall() {
  // Open welcome page or token setup
  chrome.tabs.create({
    url: chrome.runtime.getURL('popup/popup.html'),
  });
}

// Handle extension update
function handleUpdate(previousVersion) {
  console.log(`Updated from version ${previousVersion} to ${CONFIG.VERSION}`);
  // Handle any necessary migrations
}

// Set up periodic sync alarm (every 5 minutes when online)
chrome.alarms.create('sync-queue', {
  periodInMinutes: 5,
});

// Set up periodic timer check alarm (every 30 seconds to update icon)
chrome.alarms.create('check-timer', {
  periodInMinutes: 0.5, // 30 seconds
});

// Listen for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'sync-queue') {
    syncQueuedEntries();
  }
  if (alarm.name === 'check-timer') {
    checkTimerAndUpdateIcon();
  }
});

// Sync queued time entries
async function syncQueuedEntries() {
  try {
    // Get queued entries from storage
    const result = await chrome.storage.local.get(['queue_entries', 'extension_token']);
    const queue = result.queue_entries || [];
    const token = result.extension_token;

    if (!token || queue.length === 0) {
      return;
    }

    console.log(`Syncing ${queue.length} queued entries...`);

    // Sync each entry
    for (const entry of queue) {
      try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/extension/time-entries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            service_id: entry.service_id,
            duration_hours: entry.duration_hours,
            date: entry.date,
            description: entry.description,
          }),
        });

        if (response.ok) {
          // Remove synced entry from queue
          const updatedQueue = queue.filter((e) => e.id !== entry.id);
          await chrome.storage.local.set({ queue_entries: updatedQueue });
          console.log('Synced entry:', entry.id);
        }
      } catch (error) {
        console.error('Failed to sync entry:', entry.id, error);
        // Keep in queue, will try again
      }
    }
  } catch (error) {
    console.error('Sync error:', error);
  }
}

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sync-now') {
    syncQueuedEntries().then(() => {
      sendResponse({ success: true });
    });
    return true; // Will respond asynchronously
  }

  if (request.action === 'check-online') {
    sendResponse({ online: navigator.onLine });
    return false;
  }

  // Handle icon change (red when timer running, default when not)
  if (request.action === 'set-icon') {
    setIcon(request.icon);
    sendResponse({ success: true });
    return false;
  }

  // Handle timer start from external sources (GitHub, ClickUp, etc.)
  if (request.type === 'START_TIMER_FROM_ISSUE') {
    handleTimerFromIssue(request).then((result) => {
      sendResponse(result);
    });
    return true; // Will respond asynchronously
  }

  // Attempt to open the popup
  if (request.type === 'OPEN_POPUP') {
    chrome.action.openPopup().catch((error) => {
      // openPopup() may fail in some contexts, that's okay
      console.log('Could not open popup automatically:', error.message);
    });
    sendResponse({ success: true });
    return false;
  }
});

// Handle timer start from issue tracking systems
async function handleTimerFromIssue(request) {
  try {
    const { source, issue } = request;

    // Build external reference object in the format expected by the DB
    const externalReference = {
      id: issue.number,
      group_id: issue.repo,
      permalink: issue.url,
      service: source === 'github' ? 'github.com' : source,
      service_icon_url: getServiceIconUrl(source)
    };

    // Store the pending timer information
    await chrome.storage.local.set({
      pending_timer: {
        source: source,
        title: issue.title,
        url: issue.url,
        reference: source === 'github' ? `#${issue.number}` : issue.number,
        repo: issue.repo,
        external_reference: externalReference,
        timestamp: Date.now()
      }
    });

    console.log('Stored pending timer:', issue, 'External reference:', externalReference);

    // Update badge to indicate there's a pending action
    chrome.action.setBadgeText({ text: '!' });
    chrome.action.setBadgeBackgroundColor({ color: '#10b981' });

    return { success: true };
  } catch (error) {
    console.error('Error handling timer from issue:', error);
    return { success: false, error: error.message };
  }
}

// Get service icon URL based on source
function getServiceIconUrl(source) {
  const iconUrls = {
    'github': 'https://proxy.harvestfiles.com/production_harvestapp_public/uploads/platform_icons/github.com.png?1598293589',
    'clickup': 'https://proxy.harvestfiles.com/production_harvestapp_public/uploads/platform_icons/clickup.com.png',
    'trello': 'https://proxy.harvestfiles.com/production_harvestapp_public/uploads/platform_icons/trello.com.png'
  };

  return iconUrls[source] || '';
}

// Check if timer is running and update icon
async function checkTimerAndUpdateIcon() {
  try {
    const result = await chrome.storage.local.get(['extension_token']);
    const token = result.extension_token;

    if (!token) {
      // No token, set default icon
      setIcon('default');
      return;
    }

    // Fetch current timer status from API
    const response = await fetch(`${CONFIG.API_BASE_URL}/extension/timer/current`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setIcon('default');
      return;
    }

    const data = await response.json();

    // Update icon based on timer status
    if (data.running && data.timer) {
      setIcon('red');
    } else {
      setIcon('default');
    }
  } catch (error) {
    console.error('Error checking timer:', error);
    // Don't change icon on error to avoid flickering
  }
}

// Helper function to set icon
function setIcon(iconType) {
  try {
    if (iconType === 'red') {
      chrome.action.setIcon({
        path: {
          16: chrome.runtime.getURL('assets/icons/icon16_red.png'),
          48: chrome.runtime.getURL('assets/icons/icon48_red.png'),
          128: chrome.runtime.getURL('assets/icons/icon128_red.png')
        }
      });
    } else {
      chrome.action.setIcon({
        path: {
          16: chrome.runtime.getURL('assets/icons/icon16.png'),
          48: chrome.runtime.getURL('assets/icons/icon48.png'),
          128: chrome.runtime.getURL('assets/icons/icon128.png')
        }
      });
    }
  } catch (error) {
    console.error('Error setting icon:', error);
  }
}

// Badge management - show queue count
async function updateBadge() {
  try {
    const result = await chrome.storage.local.get(['queue_entries']);
    const queue = result.queue_entries || [];

    if (queue.length > 0) {
      chrome.action.setBadgeText({ text: queue.length.toString() });
      chrome.action.setBadgeBackgroundColor({ color: '#f59e0b' });
    } else {
      chrome.action.setBadgeText({ text: '' });
    }
  } catch (error) {
    console.error('Badge update error:', error);
  }
}

// Update badge on storage changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.queue_entries) {
    updateBadge();
  }
});

// Initial badge update
updateBadge();

// Initial timer check and icon update
checkTimerAndUpdateIcon();

console.log('Service worker initialized');
