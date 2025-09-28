// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-29

// Cache clearing module
// This module provides functions to clear page cache to ensure proper language switching and page transitions

// Track the last language change time to avoid excessive cache clearing
let lastLanguageChangeTime = 0;
const MIN_LANGUAGE_CHANGE_INTERVAL = 2000; // Increased to 2 seconds minimum between language changes

/**
 * Clears page cache to ensure fresh content loading
 * This is a comprehensive version that clears all caches and reloads resources
 */
function clearPageCache() {
    // Abandoned already, as it's not necessary to clear cache to ensure proper language switching and page transitions
}

/**
 * Force complete page reload
 */
function forcePageReload() {
  // Add a timestamp to URL to prevent browser cache
  const timestamp = new Date().getTime();
  const currentUrl = window.location.href.split('?')[0];
  window.location.href = currentUrl + '?t=' + timestamp;
}

/**
 * Initialize cache clearing overrides and page load functionality
 */
function initializeCacheClearing() {
  // Intercept and block requests to /@vite/client to prevent 404 errors
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    if (typeof url === 'string' && url.includes('/@vite/client')) {
      console.log('Blocked request to Vite client:', url);
      return Promise.reject(new Error('Vite client request blocked'));
    }
    return originalFetch.apply(this, arguments);
  };
  
  // Also intercept XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    if (typeof url === 'string' && url.includes('/@vite/client')) {
      console.log('Blocked XHR request to Vite client:', url);
      throw new Error('Vite client request blocked');
    }
    return originalXHROpen.apply(this, [method, url, ...args]);
  };
  
  // Override the original setLanguage function to include cache clearing
  if (typeof setLanguage === 'function') {
    const originalSetLanguage = setLanguage;
    window.setLanguage = function(lang) {
      // Only clear cache if language actually changed and enough time has passed
      const currentTime = new Date().getTime();
      if (getCurrentLanguage() !== lang && (currentTime - lastLanguageChangeTime) > MIN_LANGUAGE_CHANGE_INTERVAL) {
        lastLanguageChangeTime = currentTime;
        // Don't clear cache to avoid page reload
        // clearPageCache();
      }
      // Call original function
      originalSetLanguage(lang);
    };
  }
  
  // Override the original toggleLanguage function to include cache clearing
  if (typeof toggleLanguage === 'function') {
    const originalToggleLanguage = toggleLanguage;
    window.toggleLanguage = function() {
      // Call original function without clearing cache here
      // The cache will be cleared in the setLanguage function instead
      originalToggleLanguage();
    };
  }
  
  // Override the original reloadContent function to include cache clearing
  if (typeof reloadContent === 'function') {
    const originalReloadContent = reloadContent;
    window.reloadContent = function() {
      // Don't clear cache here as it's already cleared in setLanguage
      // Call original function
      originalReloadContent();
    };
  }
  
  // Override the original switchSection function to remove cache clearing
  if (typeof switchSection === 'function') {
    const originalSwitchSection = switchSection;
    window.switchSection = function(sectionId) {
      // Don't clear cache before section switch to avoid page reload
      // Call original function
      originalSwitchSection(sectionId);
    };
  }
  
  // Simplified navigation click handler to reduce performance impact
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.closest('.nav-links')) {
      // Don't get current language before navigation to avoid page reload
      // const currentLang = getCurrentLanguage();
      
      // After navigation, don't ensure the new content uses the correct language to avoid page reload
      // setTimeout(() => {
      //   // Ensure the language is still correct after navigation
      //   if (getCurrentLanguage() !== currentLang) {
      //     // Only set language if it actually changed
      //     // This prevents unnecessary cache clearing
      //     setLanguage(currentLang);
      //   }
      //   
      //   // Update UI language elements
      //   updateUILanguage();
      //   
      //   // Don't call updateSectionContentLanguage here to avoid page reload
      //   // The section content will be updated by the original navigation handler
      // }, 100); // Slightly increased delay for smoother transition
    }
  }, true); // Use capture to ensure this runs before the original handler
  
  
}

// Initialize cache clearing when the page loads
window.onload = function() {
  initializeCacheClearing();
};

// Initialize cache clearing when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeCacheClearing();
});

// Export functions for use in other modules
window.clearPageCache = clearPageCache;
window.initializeCacheClearing = initializeCacheClearing;
window.forcePageReload = forcePageReload;