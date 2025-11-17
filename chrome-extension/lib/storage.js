/**
 * Storage Manager
 *
 * Wrapper for Chrome Storage API with typed methods and cache management
 */

const StorageManager = {
  // Storage keys
  KEYS: {
    TOKEN: 'extension_token',
    CACHE_SERVICES: 'cache_services',
    CACHE_USER: 'cache_user',
    CACHE_RECENT_ENTRIES: 'cache_recent_entries',
    QUEUE_ENTRIES: 'queue_entries',
    PREFERENCES: 'preferences',
  },

  /**
   * Get a value from storage
   */
  async get(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] || null);
      });
    });
  },

  /**
   * Set a value in storage
   */
  async set(key, value) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve();
      });
    });
  },

  /**
   * Remove a key from storage
   */
  async remove(key) {
    return new Promise((resolve) => {
      chrome.storage.local.remove([key], () => {
        resolve();
      });
    });
  },

  /**
   * Clear all storage
   */
  async clear() {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve();
      });
    });
  },

  // ==================== TOKEN METHODS ====================

  /**
   * Save extension token
   */
  async setToken(token) {
    await this.set(this.KEYS.TOKEN, token);
  },

  /**
   * Get extension token
   */
  async getToken() {
    return await this.get(this.KEYS.TOKEN);
  },

  /**
   * Clear extension token
   */
  async clearToken() {
    await this.remove(this.KEYS.TOKEN);
  },

  // ==================== CACHE METHODS ====================

  /**
   * Create cached data with expiration
   */
  createCacheEntry(data, ttl) {
    return {
      data: data,
      expires_at: Date.now() + ttl,
    };
  },

  /**
   * Check if cached data is still valid
   */
  isCacheValid(cacheEntry) {
    if (!cacheEntry) return false;
    return Date.now() < cacheEntry.expires_at;
  },

  /**
   * Cache services list
   */
  async cacheServices(services, ttl = CONFIG.CACHE_TTL.SERVICES) {
    const cacheEntry = this.createCacheEntry(services, ttl);
    await this.set(this.KEYS.CACHE_SERVICES, cacheEntry);
  },

  /**
   * Get cached services
   */
  async getCachedServices() {
    const cacheEntry = await this.get(this.KEYS.CACHE_SERVICES);
    if (this.isCacheValid(cacheEntry)) {
      return cacheEntry.data;
    }
    return null;
  },

  /**
   * Clear services cache
   */
  async clearServicesCache() {
    await this.remove(this.KEYS.CACHE_SERVICES);
  },

  /**
   * Cache user info
   */
  async cacheUserInfo(user, ttl = CONFIG.CACHE_TTL.USER) {
    const cacheEntry = this.createCacheEntry(user, ttl);
    await this.set(this.KEYS.CACHE_USER, cacheEntry);
  },

  /**
   * Get cached user info
   */
  async getCachedUserInfo() {
    const cacheEntry = await this.get(this.KEYS.CACHE_USER);
    if (this.isCacheValid(cacheEntry)) {
      return cacheEntry.data;
    }
    return null;
  },

  /**
   * Clear user info cache
   */
  async clearUserCache() {
    await this.remove(this.KEYS.CACHE_USER);
  },

  /**
   * Cache recent entries
   */
  async cacheRecentEntries(entries, ttl = CONFIG.CACHE_TTL.RECENT_ENTRIES) {
    const cacheEntry = this.createCacheEntry(entries, ttl);
    await this.set(this.KEYS.CACHE_RECENT_ENTRIES, cacheEntry);
  },

  /**
   * Get cached recent entries
   */
  async getCachedRecentEntries() {
    const cacheEntry = await this.get(this.KEYS.CACHE_RECENT_ENTRIES);
    if (this.isCacheValid(cacheEntry)) {
      return cacheEntry.data;
    }
    return null;
  },

  /**
   * Clear recent entries cache
   */
  async clearRecentEntriesCache() {
    await this.remove(this.KEYS.CACHE_RECENT_ENTRIES);
  },

  /**
   * Clear all caches
   */
  async clearAllCaches() {
    await Promise.all([
      this.clearServicesCache(),
      this.clearUserCache(),
      this.clearRecentEntriesCache(),
    ]);
  },

  // ==================== OFFLINE QUEUE METHODS ====================

  /**
   * Add entry to offline queue
   */
  async queueEntry(entry) {
    const queue = await this.getQueuedEntries();
    const queuedEntry = {
      ...entry,
      id: `temp-${Date.now()}-${Math.random()}`,
      queued_at: Date.now(),
    };
    queue.push(queuedEntry);
    await this.set(this.KEYS.QUEUE_ENTRIES, queue);
    return queuedEntry;
  },

  /**
   * Get all queued entries
   */
  async getQueuedEntries() {
    const queue = await this.get(this.KEYS.QUEUE_ENTRIES);
    return queue || [];
  },

  /**
   * Remove entry from queue
   */
  async removeQueuedEntry(id) {
    const queue = await this.getQueuedEntries();
    const filtered = queue.filter((entry) => entry.id !== id);
    await this.set(this.KEYS.QUEUE_ENTRIES, filtered);
  },

  /**
   * Clear entire queue
   */
  async clearQueue() {
    await this.remove(this.KEYS.QUEUE_ENTRIES);
  },

  /**
   * Get queue count
   */
  async getQueueCount() {
    const queue = await this.getQueuedEntries();
    return queue.length;
  },

  // ==================== PREFERENCES METHODS ====================

  /**
   * Get all preferences
   */
  async getPreferences() {
    const prefs = await this.get(this.KEYS.PREFERENCES);
    return prefs || {};
  },

  /**
   * Set a preference
   */
  async setPreference(key, value) {
    const prefs = await this.getPreferences();
    prefs[key] = value;
    await this.set(this.KEYS.PREFERENCES, prefs);
  },

  /**
   * Get a preference with default value
   */
  async getPreference(key, defaultValue = null) {
    const prefs = await this.getPreferences();
    return prefs[key] !== undefined ? prefs[key] : defaultValue;
  },

  // ==================== UTILITY METHODS ====================

  /**
   * Get storage usage statistics
   */
  async getStorageUsage() {
    return new Promise((resolve) => {
      chrome.storage.local.getBytesInUse(null, (bytes) => {
        const mb = (bytes / (1024 * 1024)).toFixed(2);
        resolve({
          bytes: bytes,
          mb: mb,
          warning: bytes > 5 * 1024 * 1024, // Warning if > 5MB
        });
      });
    });
  },

  /**
   * Export all storage data (for debugging)
   */
  async exportAll() {
    return new Promise((resolve) => {
      chrome.storage.local.get(null, (items) => {
        resolve(items);
      });
    });
  },
};

// Make available globally
if (typeof window !== 'undefined') {
  window.StorageManager = StorageManager;
}
