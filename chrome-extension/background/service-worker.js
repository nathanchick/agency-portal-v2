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

// Listen for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'sync-queue') {
    syncQueuedEntries();
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
});

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

console.log('Service worker initialized');
