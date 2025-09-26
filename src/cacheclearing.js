// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-19

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
  // Clear any cached fetch requests
  if ('caches' in window) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
      });
    });
  }
  
  // Don't force reload of all external resources to avoid style flickering
  // Instead, we'll just clear the module containers to force content reload
  // This prevents the white flash caused by style reloading
  
  // Clear any module containers to force reload
  const moduleContainers = document.querySelectorAll('.modules-container');
  moduleContainers.forEach(container => {
    container.innerHTML = '';
  });
  
  // After clearing cache, we need to recheck and hide empty modules
  // This ensures that modules that were relying on preloaded content
  // are properly hidden when the cache is cleared
  setTimeout(() => {
    // Check experiences section modules
    const experiencesSection = document.getElementById('experiences');
    if (experiencesSection) {
      const lang = getCurrentLanguage();
      
      // Check employment content
      const employmentData = getPreloadedContent ? getPreloadedContent('employment', lang) : null;
      if (!employmentData || (Array.isArray(employmentData) && employmentData.length === 0)) {
        const employmentTab = experiencesSection.querySelector('.tab-button[data-tab="employment"]');
        if (employmentTab && employmentTab.style.display !== 'none') {
          employmentTab.style.display = 'none';
        }
      }
      
      // Check honors content
      const honorsData = getPreloadedContent ? getPreloadedContent('honors', lang) : null;
      if (!honorsData || (Array.isArray(honorsData) && honorsData.length === 0)) {
        const honorsTab = experiencesSection.querySelector('.tab-button[data-tab="honors-awards"]');
        if (honorsTab && honorsTab.style.display !== 'none') {
          honorsTab.style.display = 'none';
        }
      }
      
      // Check teaching content
      const teachingData = getPreloadedContent ? getPreloadedContent('teaching', lang) : null;
      if (!teachingData || (Array.isArray(teachingData) && teachingData.length === 0)) {
        const teachingTab = experiencesSection.querySelector('.tab-button[data-tab="teaching"]');
        if (teachingTab && teachingTab.style.display !== 'none') {
          teachingTab.style.display = 'none';
        }
      }
      
      // Check reviewer content
      const reviewerData = getPreloadedContent ? getPreloadedContent('reviewer', lang) : null;
      if (!reviewerData || (Array.isArray(reviewerData) && reviewerData.length === 0)) {
        const reviewerTab = experiencesSection.querySelector('.tab-button[data-tab="reviewer"]');
        if (reviewerTab && reviewerTab.style.display !== 'none') {
          reviewerTab.style.display = 'none';
        }
      }
    }
    
    // Check publications section modules
    const publicationsSection = document.getElementById('publications');
    if (publicationsSection) {
      const lang = getCurrentLanguage();
      const patentsData = getPreloadedContent ? getPreloadedContent('patents', lang) : null;
      if (!patentsData || (Array.isArray(patentsData) && patentsData.length === 0) || 
          (patentsData && patentsData.patents && Array.isArray(patentsData.patents) && patentsData.patents.length === 0)) {
        const patentsTab = publicationsSection.querySelector('.tab-button[data-tab="patents"]');
        if (patentsTab && patentsTab.style.display !== 'none') {
          patentsTab.style.display = 'none';
        }
      }
    }
  }, 300); // Wait a bit for the cache to be cleared
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
      // Only clear cache if language actually changed
      if (getCurrentLanguage() !== lang) {
        clearPageCache();
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
  
  // Override the original switchSection function to include cache clearing
  if (typeof switchSection === 'function') {
    const originalSwitchSection = switchSection;
    window.switchSection = function(sectionId) {
      // Clear cache before section switch
      clearPageCache();
      // Call original function
      originalSwitchSection(sectionId);
    };
  }
  
  // Simplified navigation click handler to reduce performance impact
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.closest('.nav-links')) {
      // Get current language before navigation
      const currentLang = getCurrentLanguage();
      
      // After navigation, ensure the new content uses the correct language
      setTimeout(() => {
        // Ensure the language is still correct after navigation
        if (getCurrentLanguage() !== currentLang) {
          // Only set language if it actually changed
          // This prevents unnecessary cache clearing
          setLanguage(currentLang);
        }
        
        // Update UI language elements
        updateUILanguage();
        
        // If the active section changed, ensure its content is in the correct language
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
          const sectionId = activeSection.id;
          // Use the centralized function to update section content
          if (typeof updateSectionContentLanguage === 'function') {
            updateSectionContentLanguage(sectionId);
          }
        }
      }, 100); // Slightly increased delay for smoother transition
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