/**
 * Options Page Logic
 */

// Load settings on page load
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
});

function loadSettings() {
  // Display version
  document.getElementById('version').textContent = CONFIG.VERSION;

  // Display API URL
  document.getElementById('api-url').textContent = CONFIG.API_BASE_URL;
}

async function clearCache() {
  if (!confirm('Clear all cached data? You will need to reload services.')) {
    return;
  }

  try {
    await chrome.storage.local.remove([
      'cache_services',
      'cache_user',
      'cache_recent_entries',
    ]);

    showStatus('Cache cleared successfully', 'success');
  } catch (error) {
    console.error('Failed to clear cache:', error);
    showStatus('Failed to clear cache', 'error');
  }
}

async function clearAllData() {
  if (!confirm('Clear ALL extension data including your token? You will need to login again.')) {
    return;
  }

  if (!confirm('Are you absolutely sure? This cannot be undone.')) {
    return;
  }

  try {
    await chrome.storage.local.clear();
    showStatus('All data cleared. Please close and reopen the extension.', 'success');
  } catch (error) {
    console.error('Failed to clear data:', error);
    showStatus('Failed to clear data', 'error');
  }
}

function openDocs() {
  chrome.tabs.create({
    url: 'https://github.com/your-repo/chrome-extension#readme',
  });
}

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = `status ${type}`;
  status.style.display = 'block';

  setTimeout(() => {
    status.style.display = 'none';
  }, 3000);
}
