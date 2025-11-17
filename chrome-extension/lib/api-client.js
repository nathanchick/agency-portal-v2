/**
 * API Client
 *
 * Centralized API communication with error handling and retry logic
 */

class ApiClient {
  constructor(baseUrl = CONFIG.API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.timeout = CONFIG.API_TIMEOUT;
    this.maxRetries = CONFIG.MAX_RETRIES;
    this.retryDelay = CONFIG.RETRY_DELAY;
  }

  /**
   * Get authorization headers
   */
  async _getHeaders() {
    const token = await StorageManager.getToken();
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Make HTTP request with timeout
   */
  async _fetch(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new NetworkError('Request timeout');
      }
      throw error;
    }
  }

  /**
   * Handle response and convert to JSON
   */
  async _handleResponse(response) {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new AuthError(data.message || 'Authentication failed');
      } else if (response.status === 422) {
        throw new ValidationError(data.message || 'Validation failed', data.errors);
      } else if (response.status === 429) {
        throw new RateLimitError(data.message || 'Too many requests');
      } else if (response.status >= 500) {
        throw new ServerError(data.message || 'Server error');
      } else {
        throw new ApiError(data.message || 'Request failed', response.status);
      }
    }

    return data;
  }

  /**
   * Retry failed requests with exponential backoff
   */
  async _retry(fn, attempt = 1) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= this.maxRetries) {
        throw error;
      }

      // Don't retry auth errors or validation errors
      if (error instanceof AuthError || error instanceof ValidationError) {
        throw error;
      }

      // Exponential backoff
      const delay = this.retryDelay * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));

      return this._retry(fn, attempt + 1);
    }
  }

  /**
   * Make API request
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = await this._getHeaders();

    const fetchOptions = {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
    };

    return this._retry(async () => {
      const response = await this._fetch(url, fetchOptions);
      return this._handleResponse(response);
    });
  }

  // ==================== AUTHENTICATION METHODS ====================

  /**
   * Validate extension token
   */
  async validateToken(token) {
    try {
      const response = await fetch(`${this.baseUrl}/extension/auth/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      return data.valid ? data : null;
    } catch (error) {
      console.error('Token validation error:', error);
      return null;
    }
  }

  // ==================== USER METHODS ====================

  /**
   * Get user information
   */
  async getUser() {
    return this.request('/extension/user', {
      method: 'GET',
    });
  }

  // ==================== SERVICE METHODS ====================

  /**
   * Get user's assigned services
   */
  async getServices() {
    return this.request('/extension/services', {
      method: 'GET',
    });
  }

  // ==================== TIME ENTRY METHODS ====================

  /**
   * Get recent time entries
   */
  async getRecentEntries(limit = 10) {
    return this.request(`/extension/recent-entries?limit=${limit}`, {
      method: 'GET',
    });
  }

  /**
   * Create a new time entry
   */
  async createEntry(data) {
    return this.request('/extension/time-entries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Sync queued entries (batch create)
   */
  async syncQueuedEntries(entries) {
    // For now, send entries one by one
    // TODO: Create batch endpoint if needed
    const results = [];

    for (const entry of entries) {
      try {
        const result = await this.createEntry({
          service_id: entry.service_id,
          duration_hours: entry.duration_hours,
          date: entry.date,
          description: entry.description,
        });
        results.push({ success: true, entry: entry, result: result });
      } catch (error) {
        results.push({ success: false, entry: entry, error: error.message });
      }
    }

    return results;
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Check if online
   */
  isOnline() {
    return navigator.onLine;
  }

  /**
   * Ping API to check connectivity
   */
  async ping() {
    try {
      const response = await this._fetch(`${this.baseUrl}/extension/user`, {
        method: 'HEAD',
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// ==================== ERROR CLASSES ====================

class ApiError extends Error {
  constructor(message, statusCode = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}

class ValidationError extends Error {
  constructor(message, errors = {}) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

class RateLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RateLimitError';
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
  }
}

// Make available globally
if (typeof window !== 'undefined') {
  window.ApiClient = ApiClient;
  window.ApiError = ApiError;
  window.NetworkError = NetworkError;
  window.AuthError = AuthError;
  window.ValidationError = ValidationError;
  window.RateLimitError = RateLimitError;
  window.ServerError = ServerError;
}
