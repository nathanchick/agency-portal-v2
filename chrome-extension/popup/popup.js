/**
 * Popup Logic
 *
 * Handles all popup UI interactions, authentication, and form submission
 */

// Initialize API client
const api = new ApiClient();

// DOM Elements
const elements = {
  // Views
  loadingView: document.getElementById('loading-view'),
  loginView: document.getElementById('login-view'),
  mainView: document.getElementById('main-view'),

  // Login view
  tokenInput: document.getElementById('token-input'),
  saveTokenBtn: document.getElementById('save-token-btn'),
  loginBtn: document.getElementById('login-btn'),

  // Main view header
  userName: document.getElementById('user-name'),
  userOrg: document.getElementById('user-org'),
  settingsBtn: document.getElementById('settings-btn'),

  // Form
  entryForm: document.getElementById('entry-form'),
  serviceSelect: document.getElementById('service'),
  durationInput: document.getElementById('duration'),
  dateInput: document.getElementById('date'),
  descriptionInput: document.getElementById('description'),
  submitBtn: document.getElementById('submit-btn'),
  submitText: document.getElementById('submit-text'),
  submitLoader: document.getElementById('submit-loader'),

  // Status
  statusMessage: document.getElementById('status-message'),

  // Recent entries
  entriesList: document.getElementById('entries-list'),

  // Offline indicator
  offlineIndicator: document.getElementById('offline-indicator'),
  queueCount: document.getElementById('queue-count'),
};

// Application state
const state = {
  authenticated: false,
  user: null,
  services: [],
  recentEntries: [],
};

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', async () => {
  await initialize();
  setupEventListeners();
  checkOnlineStatus();
});

async function initialize() {
  try {
    // Check if user has a token
    const token = await StorageManager.getToken();

    if (!token) {
      showLoginView();
      return;
    }

    // Validate token
    const validation = await api.validateToken(token);

    if (!validation || !validation.valid) {
      // Invalid token, clear it and show login
      await StorageManager.clearToken();
      showLoginView();
      return;
    }

    // Token is valid, load main view
    state.user = validation.user;
    state.authenticated = true;
    await loadMainView();
  } catch (error) {
    console.error('Initialization error:', error);
    showLoginView();
  }
}

// ==================== VIEW MANAGEMENT ====================

function showView(viewElement) {
  elements.loadingView.classList.add('hidden');
  elements.loginView.classList.add('hidden');
  elements.mainView.classList.add('hidden');
  viewElement.classList.remove('hidden');
}

function showLoginView() {
  showView(elements.loginView);
}

function showMainView() {
  showView(elements.mainView);
  updateUserInfo();
}

async function loadMainView() {
  showMainView();

  // Load data in parallel
  await Promise.all([
    loadServices(),
    loadRecentEntries(),
  ]);

  // Set today's date as default
  elements.dateInput.valueAsDate = new Date();
}

function updateUserInfo() {
  if (state.user) {
    elements.userName.textContent = state.user.name;
    elements.userOrg.textContent = state.user.organisation?.name || '';
  }
}

// ==================== AUTHENTICATION ====================

async function handleSaveToken() {
  const token = elements.tokenInput.value.trim();

  if (!token) {
    showError('Please enter a token');
    return;
  }

  setLoading(elements.saveTokenBtn, true);

  try {
    // Validate token with API
    const validation = await api.validateToken(token);

    if (!validation || !validation.valid) {
      showError('Invalid token. Please check and try again.');
      return;
    }

    // Save token
    await StorageManager.setToken(token);
    state.user = validation.user;
    state.authenticated = true;

    // Load main view
    await loadMainView();
    showSuccess('Successfully authenticated!');
  } catch (error) {
    console.error('Token validation error:', error);
    showError('Failed to validate token. Please try again.');
  } finally {
    setLoading(elements.saveTokenBtn, false);
  }
}

function handleLogin() {
  // Open portal in new tab
  chrome.tabs.create({
    url: `${CONFIG.PORTAL_BASE_URL}/extension-token`,
  });
}

async function handleLogout() {
  if (!confirm('Are you sure you want to logout?')) {
    return;
  }

  await StorageManager.clearToken();
  await StorageManager.clearAllCaches();
  state.authenticated = false;
  state.user = null;
  showLoginView();
}

// ==================== DATA LOADING ====================

async function loadServices() {
  try {
    // Try cache first
    const cached = await StorageManager.getCachedServices();
    if (cached) {
      updateServicesDropdown(cached);
      return;
    }

    // Fetch from API
    const response = await api.getServices();
    const services = response.services || [];

    // Cache services
    await StorageManager.cacheServices(services);
    updateServicesDropdown(services);
  } catch (error) {
    console.error('Failed to load services:', error);
    showError('Failed to load services');
  }
}

function updateServicesDropdown(services) {
  state.services = services;

  // Clear existing options except the first one
  elements.serviceSelect.innerHTML = '<option value="">Select a service...</option>';

  // Add service options
  services.forEach((service) => {
    const option = document.createElement('option');
    option.value = service.id;
    option.textContent = `${service.customer_name} - ${service.name}`;
    elements.serviceSelect.appendChild(option);
  });
}

async function loadRecentEntries() {
  try {
    // Try cache first
    const cached = await StorageManager.getCachedRecentEntries();
    if (cached) {
      updateRecentEntries(cached);
      return;
    }

    // Fetch from API
    const response = await api.getRecentEntries(5);
    const entries = response.entries || [];

    // Cache entries
    await StorageManager.cacheRecentEntries(entries);
    updateRecentEntries(entries);
  } catch (error) {
    console.error('Failed to load recent entries:', error);
    // Show empty state
    updateRecentEntries([]);
  }
}

function updateRecentEntries(entries) {
  state.recentEntries = entries;

  if (entries.length === 0) {
    elements.entriesList.innerHTML = `
      <div class="empty-state">
        No recent entries. Log your first time entry above!
      </div>
    `;
    return;
  }

  elements.entriesList.innerHTML = entries
    .map((entry) => createEntryCard(entry))
    .join('');
}

function createEntryCard(entry) {
  const date = new Date(entry.date);
  const timeAgo = getTimeAgo(new Date(entry.created_at));

  return `
    <div class="entry-card">
      <div class="entry-header">
        <div class="entry-service">${escapeHtml(entry.service_name)}</div>
        <div class="entry-duration">${entry.duration_hours}h</div>
      </div>
      <div class="entry-meta">
        <span>${date.toLocaleDateString()}</span>
        <span>•</span>
        <span>${timeAgo}</span>
      </div>
      ${
        entry.description
          ? `<div class="entry-description">${escapeHtml(entry.description)}</div>`
          : ''
      }
    </div>
  `;
}

// ==================== FORM HANDLING ====================

async function handleFormSubmit(e) {
  e.preventDefault();

  // Clear previous errors
  clearErrors();

  // Get form values
  const formData = {
    service_id: elements.serviceSelect.value,
    duration_hours: parseDuration(elements.durationInput.value),
    date: elements.dateInput.value,
    description: elements.descriptionInput.value.trim() || null,
  };

  // Client-side validation
  if (!validateForm(formData)) {
    return;
  }

  setLoading(elements.submitBtn, true);

  try {
    // Check if online
    if (!navigator.onLine) {
      // Queue for later
      await StorageManager.queueEntry(formData);
      showSuccess('Entry queued. Will sync when online.');
      updateQueueCount();
      resetForm();
      return;
    }

    // Create entry
    const response = await api.createEntry(formData);
    showSuccess('Time entry logged successfully!');
    resetForm();

    // Refresh recent entries
    await StorageManager.clearRecentEntriesCache();
    await loadRecentEntries();
  } catch (error) {
    console.error('Failed to create entry:', error);

    if (error instanceof ValidationError) {
      showValidationErrors(error.errors);
    } else if (error instanceof AuthError) {
      showError('Authentication failed. Please login again.');
      await handleLogout();
    } else if (error instanceof NetworkError) {
      // Queue entry
      await StorageManager.queueEntry(formData);
      showWarning('No connection. Entry queued for sync.');
      updateQueueCount();
      resetForm();
    } else {
      showError('Failed to create entry. Please try again.');
    }
  } finally {
    setLoading(elements.submitBtn, false);
  }
}

// ==================== VALIDATION ====================

function validateForm(data) {
  let isValid = true;

  if (!data.service_id) {
    showFieldError('service', 'Please select a service');
    isValid = false;
  }

  if (!data.duration_hours || data.duration_hours <= 0) {
    showFieldError('duration', 'Please enter a valid duration');
    isValid = false;
  }

  if (!data.date) {
    showFieldError('date', 'Please select a date');
    isValid = false;
  }

  // Check if date is not in the future
  const selectedDate = new Date(data.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate > today) {
    showFieldError('date', 'Date cannot be in the future');
    isValid = false;
  }

  return isValid;
}

function parseDuration(value) {
  // Support both decimal (2.5) and time format (2:30)
  if (value.includes(':')) {
    const [hours, minutes] = value.split(':').map((v) => parseInt(v, 10));
    return hours + minutes / 60;
  }
  return parseFloat(value);
}

// ==================== UI UTILITIES ====================

function setLoading(button, loading) {
  if (loading) {
    button.disabled = true;
    button.querySelector('.btn-text, #submit-text')?.classList.add('hidden');
    button.querySelector('.btn-loader, #submit-loader')?.classList.remove('hidden');
  } else {
    button.disabled = false;
    button.querySelector('.btn-text, #submit-text')?.classList.remove('hidden');
    button.querySelector('.btn-loader, #submit-loader')?.classList.add('hidden');
  }
}

function showStatus(message, type = 'success') {
  elements.statusMessage.textContent = message;
  elements.statusMessage.className = `status-message ${type}`;
  elements.statusMessage.classList.remove('hidden');

  setTimeout(() => {
    elements.statusMessage.classList.add('hidden');
  }, 5000);
}

function showSuccess(message) {
  showStatus(message, 'success');
}

function showError(message) {
  showStatus(message, 'error');
}

function showWarning(message) {
  showStatus(message, 'warning');
}

function showFieldError(fieldName, message) {
  const errorElement = document.getElementById(`${fieldName}-error`);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function showValidationErrors(errors) {
  Object.keys(errors).forEach((field) => {
    const messages = errors[field];
    showFieldError(field, Array.isArray(messages) ? messages[0] : messages);
  });
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach((el) => {
    el.textContent = '';
  });
}

function resetForm() {
  elements.entryForm.reset();
  elements.dateInput.valueAsDate = new Date();
  clearErrors();
}

// ==================== OFFLINE SUPPORT ====================

function checkOnlineStatus() {
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  if (!navigator.onLine) {
    handleOffline();
  }
}

async function handleOnline() {
  elements.offlineIndicator.classList.add('hidden');

  // Try to sync queued entries
  const queue = await StorageManager.getQueuedEntries();
  if (queue.length > 0) {
    syncQueuedEntries();
  }
}

function handleOffline() {
  elements.offlineIndicator.classList.remove('hidden');
  updateQueueCount();
}

async function updateQueueCount() {
  const count = await StorageManager.getQueueCount();
  if (count > 0) {
    elements.queueCount.textContent = `${count} queued`;
    elements.queueCount.classList.remove('hidden');
  } else {
    elements.queueCount.classList.add('hidden');
  }
}

async function syncQueuedEntries() {
  const queue = await StorageManager.getQueuedEntries();

  for (const entry of queue) {
    try {
      await api.createEntry({
        service_id: entry.service_id,
        duration_hours: entry.duration_hours,
        date: entry.date,
        description: entry.description,
      });

      // Remove from queue on success
      await StorageManager.removeQueuedEntry(entry.id);
    } catch (error) {
      console.error('Failed to sync entry:', error);
      // Keep in queue, will try again later
    }
  }

  updateQueueCount();

  // Refresh recent entries if any were synced
  if (queue.length > 0) {
    await StorageManager.clearRecentEntriesCache();
    await loadRecentEntries();
  }
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
  // Login view
  elements.tokenInput.addEventListener('input', () => {
    elements.saveTokenBtn.disabled = !elements.tokenInput.value.trim();
  });
  elements.saveTokenBtn.addEventListener('click', handleSaveToken);
  elements.loginBtn.addEventListener('click', handleLogin);

  // Main view
  elements.settingsBtn.addEventListener('click', handleLogout);
  elements.entryForm.addEventListener('submit', handleFormSubmit);

  // Allow Enter key in token input
  elements.tokenInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !elements.saveTokenBtn.disabled) {
      handleSaveToken();
    }
  });
}

// ==================== UTILITIES ====================

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
