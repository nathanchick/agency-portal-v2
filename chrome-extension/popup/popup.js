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
  orgAvatar: document.getElementById('org-avatar'),
  organisationSwitcher: document.getElementById('organisation-switcher'),
  settingsBtn: document.getElementById('settings-btn'),
  settingsMenu: document.getElementById('settings-menu'),
  logoutBtn: document.getElementById('logout-btn'),
  refreshServicesBtn: document.getElementById('refresh-services-btn'),

  // Timer
  timerRunningBar: document.getElementById('timer-running-bar'),
  timerServiceName: document.getElementById('timer-service-name'),
  timerMeta: document.getElementById('timer-meta'),
  timerElapsed: document.getElementById('timer-elapsed'),
  stopTimerBtn: document.getElementById('stop-timer-btn'),

  // Start timer form
  startTimerForm: document.getElementById('start-timer-form'),
  timerServiceSelect: document.getElementById('timer-service'),
  timerTaskSelect: document.getElementById('timer-task'),
  timerDescriptionInput: document.getElementById('timer-description'),
  startTimerBtn: document.getElementById('start-timer-btn'),
  startTimerText: document.getElementById('start-timer-text'),
  startTimerLoader: document.getElementById('start-timer-loader'),

  // Manual entry toggle
  manualEntryToggle: document.getElementById('manual-entry-toggle'),
  manualEntryContent: document.getElementById('manual-entry-content'),

  // Manual entry form
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
  organisations: [],
  currentOrganisationId: null,
  services: [],
  recentEntries: [],
  currentTimer: null,
  timerInterval: null,
  settingsMenuOpen: false,
  pendingExternalReference: null, // Store external reference from GitHub/ClickUp/etc
};

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize theme first (before authentication)
  initializeTheme();

  await initialize();
  setupEventListeners();
  checkOnlineStatus();
});

async function initialize() {
  try {
    // Check if running in proper extension context
    if (!StorageManager.isAvailable()) {
      showError('Extension not loaded properly. Please load as Chrome Extension.');
      showLoginView();
      return;
    }

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

  // Load organisations first
  await loadOrganisations();

  // Load services first (needed for filtering)
  await loadServices();

  // Then load other data in parallel
  await Promise.all([
    loadRecentEntries(),
    loadCurrentTimer(),
  ]);

  // Check pending timer AFTER services are loaded (so we can filter)
  await checkPendingTimer();

  // Set today's date as default
  elements.dateInput.valueAsDate = new Date();
}

function updateUserInfo() {
  if (state.user) {
    elements.userName.textContent = state.user.name;

    // Show current organisation name
    const currentOrg = state.organisations.find(org => org.id === state.currentOrganisationId);
    elements.userOrg.textContent = currentOrg?.name || state.user.organisation?.name || '';
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
  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
    chrome.tabs.create({
      url: `${CONFIG.PORTAL_BASE_URL}/extension-token`,
    });
  } else {
    // Fallback: open in new window
    window.open(`${CONFIG.PORTAL_BASE_URL}/extension-token`, '_blank');
  }
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

// ==================== ORGANISATION MANAGEMENT ====================

async function loadOrganisations(forceRefresh = false) {
  try {
    // Try cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = await StorageManager.getCachedOrganisations();
      if (cached) {
        state.organisations = cached.organisations;
        state.currentOrganisationId = await StorageManager.getCurrentOrganisationId() || cached.default_organisation_id;
        updateOrganisationSwitcher();
        return;
      }
    }

    // Fetch from API
    const response = await api.getOrganisations();
    const organisations = response.organisations || [];
    const defaultOrgId = response.default_organisation_id;

    // Cache organisations
    await StorageManager.cacheOrganisations({ organisations, default_organisation_id: defaultOrgId });

    // Set current organisation (from storage or default)
    let currentOrgId = await StorageManager.getCurrentOrganisationId();
    if (!currentOrgId) {
      currentOrgId = defaultOrgId || (organisations.length > 0 ? organisations[0].id : null);
      if (currentOrgId) {
        await StorageManager.setCurrentOrganisationId(currentOrgId);
      }
    }

    state.organisations = organisations;
    state.currentOrganisationId = currentOrgId;
    updateOrganisationSwitcher();
  } catch (error) {
    console.error('Failed to load organisations:', error);
    showError('Failed to load organisations');
  }
}

function updateOrganisationSwitcher() {
  if (state.organisations.length === 0) {
    elements.organisationSwitcher.innerHTML = '<option value="">No organisations</option>';
    return;
  }

  // Clear and populate dropdown
  elements.organisationSwitcher.innerHTML = '';

  state.organisations.forEach((org) => {
    const option = document.createElement('option');
    option.value = org.id;
    option.textContent = org.name;
    option.selected = org.id === state.currentOrganisationId;
    elements.organisationSwitcher.appendChild(option);
  });

  // Update organisation avatar and user info
  updateOrganisationAvatar();
  updateUserInfo();
}

function updateOrganisationAvatar() {
  const currentOrg = state.organisations.find(org => org.id === state.currentOrganisationId);

  if (!currentOrg) {
    // Show fallback
    elements.orgAvatar.innerHTML = '<span class="avatar-fallback">👤</span>';
    return;
  }

  if (currentOrg.logo) {
    // Show organisation logo - prefix with base URL if it's a relative path
    let logoUrl = currentOrg.logo;
    if (!logoUrl.startsWith('http://') && !logoUrl.startsWith('https://')) {
      logoUrl = CONFIG.PORTAL_BASE_URL + logoUrl;
    }
    elements.orgAvatar.innerHTML = `<img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(currentOrg.name)}" class="avatar-image">`;
  } else {
    // Show first letter of organisation name as fallback
    const initial = currentOrg.name.charAt(0).toUpperCase();
    elements.orgAvatar.innerHTML = `<span class="avatar-fallback">${initial}</span>`;
  }
}

async function handleOrganisationChange() {
  const newOrgId = elements.organisationSwitcher.value;

  if (!newOrgId || newOrgId === state.currentOrganisationId) {
    return;
  }

  try {
    // Update storage
    await StorageManager.setCurrentOrganisationId(newOrgId);
    state.currentOrganisationId = newOrgId;

    // Update avatar and user info immediately
    updateOrganisationAvatar();
    updateUserInfo();

    // Clear caches (services and entries are org-specific)
    await StorageManager.clearServicesCache();
    await StorageManager.clearRecentEntriesCache();

    // Stop any running timer (timers are org-specific)
    if (state.currentTimer) {
      stopTimerUpdates();
      state.currentTimer = null;
      updateTimerUI();
    }

    // Reload services and recent entries
    await Promise.all([
      loadServices(true),
      loadRecentEntries(true),
      loadCurrentTimer(),
    ]);

    showSuccess(`Switched to ${elements.organisationSwitcher.options[elements.organisationSwitcher.selectedIndex].text}`);
  } catch (error) {
    console.error('Failed to switch organisation:', error);
    showError('Failed to switch organisation');
    // Revert to previous selection
    elements.organisationSwitcher.value = state.currentOrganisationId;
  }
}

// ==================== DATA LOADING ====================

async function loadServices(forceRefresh = false) {
  try {
    // Try cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = await StorageManager.getCachedServices();
      if (cached) {
        updateServicesDropdown(cached);
        return;
      }
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

function updateServicesDropdown(services, skipCacheUpdate = false) {
  // Don't update state.services if we're just filtering (skipCacheUpdate = true)
  if (!skipCacheUpdate) {
    state.services = services;

    // Extract and cache GitHub repositories from services
    const githubRepos = services
      .map(service => service.github_repo)
      .filter(repo => repo !== null && repo !== undefined);

    // Remove duplicates and cache
    const uniqueRepos = [...new Set(githubRepos)];
    StorageManager.cacheGitHubRepos(uniqueRepos);
  }

  // Update both timer and manual entry service dropdowns
  const dropdowns = [elements.timerServiceSelect, elements.serviceSelect];

  dropdowns.forEach((dropdown) => {
    // Clear existing options
    dropdown.innerHTML = '<option value="">Select a service...</option>';

    // Group services by customer name
    const servicesByCustomer = {};
    services.forEach((service) => {
      const customerName = service.customer_name || 'Unknown Customer';
      if (!servicesByCustomer[customerName]) {
        servicesByCustomer[customerName] = [];
      }
      servicesByCustomer[customerName].push(service);
    });

    // Sort customer names alphabetically
    const sortedCustomerNames = Object.keys(servicesByCustomer).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' })
    );

    // Add optgroups for each customer
    sortedCustomerNames.forEach((customerName) => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = customerName;

      // Sort services within customer alphabetically
      const customerServices = servicesByCustomer[customerName].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      );

      customerServices.forEach((service) => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        optgroup.appendChild(option);
      });

      dropdown.appendChild(optgroup);
    });
  });

  // Reset task dropdown when services change
  resetTaskDropdown();
}

function resetTaskDropdown() {
  elements.timerTaskSelect.innerHTML = '<option value="">Select a service first...</option>';
  elements.timerTaskSelect.disabled = true;
}

function handleTimerServiceChange() {
  const serviceId = elements.timerServiceSelect.value;

  if (!serviceId) {
    resetTaskDropdown();
    return;
  }

  // Find the selected service
  const selectedService = state.services.find(s => s.id === serviceId);

  if (!selectedService || !selectedService.tasks || selectedService.tasks.length === 0) {
    elements.timerTaskSelect.innerHTML = '<option value="">No tasks available</option>';
    elements.timerTaskSelect.disabled = true;
    return;
  }

  // Populate task dropdown
  elements.timerTaskSelect.innerHTML = '<option value="">Select a task...</option>';

  selectedService.tasks.forEach((task) => {
    const option = document.createElement('option');
    option.value = task.id;
    option.textContent = task.name;
    option.dataset.billable = task.billable;
    elements.timerTaskSelect.appendChild(option);
  });

  elements.timerTaskSelect.disabled = false;
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

  // Filter out the currently running timer entry
  const filteredEntries = entries.filter(entry => {
    // Exclude if this entry is the current running timer
    return !state.currentTimer || entry.id !== state.currentTimer.id;
  });

  if (filteredEntries.length === 0) {
    elements.entriesList.innerHTML = `
      <div class="empty-state">
        No recent entries. Log your first time entry above!
      </div>
    `;
    return;
  }

  elements.entriesList.innerHTML = filteredEntries
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
        <div class="entry-actions">
          <button class="btn-restart-timer" data-service-id="${entry.service_id}" data-task-id="${entry.task_id}" data-description="${escapeHtml(entry.description || '')}" title="Start timer with same details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </button>
          <span class="entry-duration">${entry.duration_hours}h</span>
        </div>
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

// ==================== TIMER FUNCTIONALITY ====================

async function checkPendingTimer() {
  try {
    const result = await chrome.storage.local.get(['pending_timer']);
    const pendingTimer = result.pending_timer;

    if (!pendingTimer) {
      return;
    }

    // Check if it's not too old (within last 5 minutes)
    const ageMinutes = (Date.now() - pendingTimer.timestamp) / 1000 / 60;
    if (ageMinutes > 5) {
      // Clear old pending timer
      await chrome.storage.local.remove(['pending_timer']);
      return;
    }

    // Store the external reference in state for when timer is started
    state.pendingExternalReference = pendingTimer.external_reference;

    // Pre-fill the timer form with the pending timer info
    elements.timerDescriptionInput.value = `${pendingTimer.title} ${pendingTimer.reference}`;

    // Filter services to only show those matching the GitHub repo
    if (pendingTimer.repo && state.services.length > 0) {
      const filteredServices = state.services.filter(service => {
        const serviceRepo = service.github_repo?.toLowerCase().trim();
        const pendingRepo = pendingTimer.repo?.toLowerCase().trim();
        return serviceRepo === pendingRepo;
      });

      if (filteredServices.length > 0) {
        updateServicesDropdown(filteredServices, true); // true = skip cache update
        showSuccess(`Showing ${filteredServices.length} service(s) for ${pendingTimer.repo}`);
      } else {
        showSuccess(`Ready to start timer for: ${pendingTimer.title}`);
      }
    } else {
      showSuccess(`Ready to start timer for: ${pendingTimer.title}`);
    }

    // Clear the pending timer and badge (but keep external_reference in state)
    await chrome.storage.local.remove(['pending_timer']);
    chrome.action.setBadgeText({ text: '' });

  } catch (error) {
    console.error('Failed to check pending timer:', error);
  }
}

async function loadCurrentTimer() {
  try {
    const response = await api.getCurrentTimer();

    if (response.running && response.timer) {
      state.currentTimer = response.timer;
      updateTimerUI();
      startTimerUpdates();
    } else {
      state.currentTimer = null;
      updateTimerUI();
    }
  } catch (error) {
    console.error('Failed to load current timer:', error);
    state.currentTimer = null;
    updateTimerUI();
  }
}

function updateTimerUI() {
  if (state.currentTimer) {
    // Show timer bar
    elements.timerRunningBar.classList.remove('hidden');
    elements.timerServiceName.textContent = state.currentTimer.service_name;

    // Tell background script to set red icon
    chrome.runtime.sendMessage({ action: 'set-icon', icon: 'red' });

    // Build meta text
    const metaParts = [];
    if (state.currentTimer.task_name) {
      metaParts.push(state.currentTimer.task_name);
    }
    if (state.currentTimer.customer_name) {
      metaParts.push(state.currentTimer.customer_name);
    }
    if (state.currentTimer.project_name) {
      metaParts.push(state.currentTimer.project_name);
    }
    elements.timerMeta.textContent = metaParts.join(' • ') || state.currentTimer.description || '';

    // Update elapsed time
    updateElapsedTime();

    // Hide start timer form when timer is running
    document.getElementById('start-timer-section').style.display = 'none';
  } else {
    // Hide timer bar
    elements.timerRunningBar.classList.add('hidden');

    // Show start timer form
    document.getElementById('start-timer-section').style.display = 'block';

    // Stop timer updates
    stopTimerUpdates();

    // Tell background script to reset icon to default
    chrome.runtime.sendMessage({ action: 'set-icon', icon: 'default' });
  }

  // Update recent entries display to filter out running timer
  if (state.recentEntries.length > 0) {
    updateRecentEntries(state.recentEntries);
  }
}

function updateElapsedTime() {
  if (!state.currentTimer) return;

  const startedAt = new Date(state.currentTimer.started_at);
  const elapsedSeconds = Math.floor((new Date() - startedAt) / 1000);

  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  elements.timerElapsed.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimerUpdates() {
  // Clear any existing interval
  stopTimerUpdates();

  // Update every second
  state.timerInterval = setInterval(() => {
    updateElapsedTime();
  }, 1000);
}

function stopTimerUpdates() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

async function handleStartTimer(e) {
  e.preventDefault();

  const serviceId = elements.timerServiceSelect.value;
  const taskId = elements.timerTaskSelect.value;
  const description = elements.timerDescriptionInput.value.trim() || null;

  if (!serviceId) {
    showError('Please select a service');
    return;
  }

  if (!taskId) {
    showError('Please select a task');
    return;
  }

  setLoading(elements.startTimerBtn, true);

  try {
    // Include external reference if available from GitHub/ClickUp/etc
    const externalReference = state.pendingExternalReference;
    const response = await api.startTimer(serviceId, taskId, description, externalReference);

    if (response.success && response.timer) {
      state.currentTimer = response.timer;
      updateTimerUI();
      startTimerUpdates();

      // Reset form and clear external reference
      elements.startTimerForm.reset();
      resetTaskDropdown();
      state.pendingExternalReference = null; // Clear after use

      showSuccess('Timer started!');

      // Refresh recent entries
      await StorageManager.clearRecentEntriesCache();
      await loadRecentEntries();
    } else {
      showError(response.message || 'Failed to start timer');
    }
  } catch (error) {
    console.error('Failed to start timer:', error);

    if (error instanceof AuthError) {
      showError('Authentication failed. Please login again.');
      await handleLogout();
    } else {
      showError(error.message || 'Failed to start timer. Please try again.');
    }
  } finally {
    setLoading(elements.startTimerBtn, false);
  }
}

async function handleStopTimer() {
  if (!state.currentTimer) return;

  const timerId = state.currentTimer.id;

  try {
    const response = await api.stopTimer(timerId);

    if (response.success) {
      state.currentTimer = null;
      updateTimerUI();

      showSuccess(`Timer stopped! Logged ${response.entry.duration_hours.toFixed(2)}h`);

      // Refresh recent entries
      await StorageManager.clearRecentEntriesCache();
      await loadRecentEntries();
    } else {
      showError(response.message || 'Failed to stop timer');
    }
  } catch (error) {
    console.error('Failed to stop timer:', error);

    if (error instanceof AuthError) {
      showError('Authentication failed. Please login again.');
      await handleLogout();
    } else {
      showError('Failed to stop timer. Please try again.');
    }
  }
}

async function handleRestartTimer(serviceId, taskId, description) {
  if (!serviceId || !taskId) {
    showError('Invalid entry data. Cannot restart timer.');
    return;
  }

  try {
    // Stop current timer if running
    if (state.currentTimer) {
      await api.stopTimer(state.currentTimer.id);
    }

    // Start new timer with same details
    const response = await api.startTimer(serviceId, taskId, description);

    if (response.success && response.timer) {
      state.currentTimer = response.timer;
      updateTimerUI();
      startTimerUpdates();

      showSuccess('Timer restarted!');

      // Refresh recent entries
      await StorageManager.clearRecentEntriesCache();
      await loadRecentEntries();
    } else {
      showError(response.message || 'Failed to restart timer');
    }
  } catch (error) {
    console.error('Failed to restart timer:', error);

    if (error instanceof AuthError) {
      showError('Authentication failed. Please login again.');
      await handleLogout();
    } else {
      showError(error.message || 'Failed to restart timer. Please try again.');
    }
  }
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
    button.querySelector('.btn-text, #submit-text, #start-timer-text')?.classList.add('hidden');
    button.querySelector('.btn-loader, #submit-loader, #start-timer-loader')?.classList.remove('hidden');
  } else {
    button.disabled = false;
    button.querySelector('.btn-text, #submit-text, #start-timer-text')?.classList.remove('hidden');
    button.querySelector('.btn-loader, #submit-loader, #start-timer-loader')?.classList.add('hidden');
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

// ==================== THEME MANAGEMENT ====================

function initializeTheme() {
  // Check if chrome.storage is available (it might not be in some contexts)
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    // Get saved theme preference or default to 'system'
    chrome.storage.local.get(['theme'], (result) => {
      const theme = result.theme || 'system';
      applyTheme(theme);
      updateThemeButtons(theme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      chrome.storage.local.get(['theme'], (result) => {
        if (result.theme === 'system' || !result.theme) {
          applyTheme('system');
        }
      });
    });
  } else {
    // Fallback to system theme if chrome.storage is not available
    applyTheme('system');
    updateThemeButtons('system');
  }
}

function applyTheme(theme) {
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function updateThemeButtons(activeTheme) {
  document.querySelectorAll('.theme-option').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === activeTheme);
  });
}

function handleThemeChange(theme) {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ theme }, () => {
      applyTheme(theme);
      updateThemeButtons(theme);
    });
  } else {
    applyTheme(theme);
    updateThemeButtons(theme);
  }
}

// ==================== SETTINGS MENU ====================

function toggleSettingsMenu() {
  state.settingsMenuOpen = !state.settingsMenuOpen;
  elements.settingsMenu.classList.toggle('hidden', !state.settingsMenuOpen);
}

// Close settings menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    state.settingsMenuOpen &&
    !elements.settingsMenu.contains(e.target) &&
    !elements.settingsBtn.contains(e.target)
  ) {
    state.settingsMenuOpen = false;
    elements.settingsMenu.classList.add('hidden');
  }
});

// ==================== MANUAL ENTRY TOGGLE ====================

function toggleManualEntry() {
  const isHidden = elements.manualEntryContent.classList.contains('hidden');
  elements.manualEntryContent.classList.toggle('hidden', !isHidden);

  // Rotate the chevron icon
  const chevron = elements.manualEntryToggle.querySelector('svg');
  chevron.style.transform = isHidden ? 'rotate(90deg)' : 'rotate(0deg)';
}

// ==================== REFRESH SERVICES ====================

async function handleRefreshServices() {
  // Add spinning animation
  elements.refreshServicesBtn.classList.add('spinning');
  elements.refreshServicesBtn.disabled = true;

  try {
    // Clear cache and reload
    await StorageManager.clearServicesCache();
    await loadServices(true);
    showSuccess('Services refreshed');
  } catch (error) {
    console.error('Failed to refresh services:', error);
    showError('Failed to refresh services');
  } finally {
    // Remove spinning animation
    setTimeout(() => {
      elements.refreshServicesBtn.classList.remove('spinning');
      elements.refreshServicesBtn.disabled = false;
    }, 500);
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

  // Allow Enter key in token input
  elements.tokenInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !elements.saveTokenBtn.disabled) {
      handleSaveToken();
    }
  });

  // Main view - Settings
  elements.settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSettingsMenu();
  });
  elements.logoutBtn.addEventListener('click', handleLogout);

  // Organisation switcher
  elements.organisationSwitcher.addEventListener('change', handleOrganisationChange);

  // Theme options
  document.querySelectorAll('.theme-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      handleThemeChange(btn.dataset.theme);
    });
  });

  // Timer
  elements.timerServiceSelect.addEventListener('change', handleTimerServiceChange);
  elements.startTimerForm.addEventListener('submit', handleStartTimer);
  elements.stopTimerBtn.addEventListener('click', handleStopTimer);

  // Refresh services
  elements.refreshServicesBtn.addEventListener('click', handleRefreshServices);

  // Manual entry toggle
  elements.manualEntryToggle.addEventListener('click', toggleManualEntry);

  // Manual entry form
  elements.entryForm.addEventListener('submit', handleFormSubmit);

  // Recent entries - restart timer buttons (event delegation)
  elements.entriesList.addEventListener('click', (e) => {
    const restartBtn = e.target.closest('.btn-restart-timer');
    if (restartBtn) {
      const serviceId = restartBtn.dataset.serviceId;
      const taskId = restartBtn.dataset.taskId;
      const description = restartBtn.dataset.description || null;
      handleRestartTimer(serviceId, taskId, description);
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
