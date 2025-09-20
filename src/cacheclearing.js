// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-19

// Cache clearing module
// This module provides functions to clear page cache to ensure proper language switching and page transitions

// Track the last language change time to avoid excessive cache clearing
let lastLanguageChangeTime = 0;
const MIN_LANGUAGE_CHANGE_INTERVAL = 2000; // Increased to 2 seconds minimum between language changes

/**
 * Clears page cache to ensure fresh content loading
 * This is a minimal version that only clears essential caches
 */
function clearPageCache() {
  // Only clear fetch request cache, keep other caches for performance
  if ('caches' in window) {
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        // Only clear specific caches, not all caches
        if (cacheName.includes('fetch-') || cacheName.includes('api-')) {
          caches.delete(cacheName);
        }
      });
    });
  }
  
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
 * Initialize cache clearing overrides
 */
function initializeCacheClearing() {
  // Only override the setLanguage function to include minimal cache clearing
  if (typeof setLanguage === 'function') {
    const originalSetLanguage = setLanguage;
    window.setLanguage = function(lang) {
      // Call original function first
      originalSetLanguage(lang);
      
      // Only clear cache if enough time has passed since the last language change
      const currentTime = new Date().getTime();
      if (currentTime - lastLanguageChangeTime > MIN_LANGUAGE_CHANGE_INTERVAL) {
        lastLanguageChangeTime = currentTime;
        // Clear cache with a longer delay to avoid blocking the UI
        setTimeout(() => {
          clearPageCache();
        }, 500); // Increased delay to reduce UI impact
      }
    };
  }
  
  // Only override the toggleLanguage function to include minimal cache clearing
  if (typeof toggleLanguage === 'function') {
    const originalToggleLanguage = toggleLanguage;
    window.toggleLanguage = function() {
      // Call original function first
      originalToggleLanguage();
      
      // Only clear cache if enough time has passed since the last language change
      const currentTime = new Date().getTime();
      if (currentTime - lastLanguageChangeTime > MIN_LANGUAGE_CHANGE_INTERVAL) {
        lastLanguageChangeTime = currentTime;
        // Clear cache with a longer delay to avoid blocking the UI
        setTimeout(() => {
          clearPageCache();
        }, 500); // Increased delay to reduce UI impact
      }
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
  
  // Add a new function for manual cache clearing
  window.manualClearCache = function() {
    if (confirm('确定要清除缓存并重新加载页面吗？')) {
      forcePageReload();
    }
  };
  
  // Add a manual cache clearing button to the page
  function addCacheClearButton() {
    // Check if button already exists
    if (document.querySelector('.cache-clear-button')) {
      return;
    }
    
    // Create button
    const button = document.createElement('button');
    button.className = 'cache-clear-button';
    button.textContent = '清除缓存';
    button.style.cssText = 'position: fixed; bottom: 10px; right: 10px; z-index: 9999; padding: 5px 10px; background: #f0f0f0; border: 1px solid #ccc; border-radius: 3px; cursor: pointer; font-size: 12px;';
    
    // Add click event
    button.addEventListener('click', manualClearCache);
    
    // Add to page
    document.body.appendChild(button);
  }
  
  // Add the button after a longer delay
  setTimeout(addCacheClearButton, 2000); // Increased delay
}

// Initialize cache clearing when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeCacheClearing();
});

// Export functions for use in other modules
window.clearPageCache = clearPageCache;
window.initializeCacheClearing = initializeCacheClearing;
window.forcePageReload = forcePageReload;