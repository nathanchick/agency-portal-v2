/**
 * Extension Configuration
 *
 * Update these values for your environment
 */

const CONFIG = {
  // API Base URL - Update this to match your portal domain
  API_BASE_URL: 'http://localhost/api',

  // Portal Base URL - For opening token generation page
  PORTAL_BASE_URL: 'http://localhost',

  // Cache TTLs (in milliseconds)
  CACHE_TTL: {
    SERVICES: 6 * 60 * 60 * 1000,    // 6 hours
    USER: 1 * 60 * 60 * 1000,         // 1 hour
    RECENT_ENTRIES: 5 * 60 * 1000,    // 5 minutes
  },

  // API Request timeout
  API_TIMEOUT: 30000, // 30 seconds

  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second, will use exponential backoff

  // Extension version
  VERSION: '1.0.0',
};

// Don't modify below this line
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
