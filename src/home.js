// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-19

// Home section content - Chinese version inherits English structure, differs only in nouns and data
function loadHomeContent() {
    const currentLang = getCurrentLanguage();
    
    // Create a container for the home content with fade effect
    // Both languages use the same structure, only content differs
    let content = `
        <div class="home-content-wrapper" style="opacity: 0;">
            <div class="home-container">
                <!-- Container for info and content sections -->
                <div class="home-content-container">
                    <!-- Left Information Section -->
                    <div class="info-section">
                        <div class="profile-container">
                            <img src="images/homepage/photo/photo.png" alt="Profile Photo" class="profile-photo">
                        </div>
                        <div class="info-content" id="info-content">
                            <!-- Info will be loaded dynamically based on language -->
                        </div>
                    </div>
                    
                    <!-- Right Content Section -->
                    <div class="home-content-section">
                        <div class="intro-section">
                            <h3>${getText('aboutMe')}</h3>
                            <div id="intro-content">
                                <!-- Intro content will be loaded dynamically based on language -->
                            </div>
                        </div>
                        <div class="news-section">
                            <h3>${getText('news')}</h3>
                            <div id="news-content">
                                <!-- News content will be loaded dynamically based on language -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Load content after the content is added to the DOM
    setTimeout(() => {
        loadPersonalInfo();
        loadIntroContent();
        loadWelcomeMessage();
        loadNewsContent();
        
        // Add fade in effect to home content
        const homeContentWrapper = document.querySelector('.home-content-wrapper');
        if (homeContentWrapper) {
            // Set transition and trigger fade in
            homeContentWrapper.style.transition = 'opacity 0.5s ease';
            
            // Use requestAnimationFrame to ensure smooth transition
            requestAnimationFrame(() => {
                homeContentWrapper.style.opacity = '1';
            });
        }
    }, 50);
    
    return content;
}

// Function to load personal information - Chinese version inherits English structure, differs only in data
function loadPersonalInfo() {
    // First try to get preloaded content
    const preloadedInfo = getPreloadedContent('info');
    
    if (preloadedInfo) {
        // Use preloaded content
        const infoContent = document.getElementById('info-content');
        if (infoContent) {
            // Use UTC+8 as default timezone if not defined in JSON
            const timezoneOffset = preloadedInfo.UTC ? parseInt(preloadedInfo.UTC) : 8;
            
            const currentLang = getCurrentLanguage();
            
            // Store timezone offset for use in updateTime function
            infoContent.setAttribute('data-timezone', timezoneOffset);
            
            // Both languages use the same structure, only data differs
            infoContent.innerHTML = `
                <h2>${preloadedInfo.name}</h2>
                <div class="info-item">
                    <img src="images/homepage/info icon/location.png" alt="Location" class="info-icon">
                    <span>${preloadedInfo.address}</span>
                </div>
                <div class="info-item">
                    <img src="images/homepage/info icon/school.png" alt="School" class="info-icon">
                    <span>${preloadedInfo.institution}</span>
                </div>
                <div class="info-item">
                    <img src="images/homepage/info icon/google scholar.png" alt="Google Scholar" class="info-icon">
                    <a href="${preloadedInfo.googlescholar}" target="_blank">${getText('googleScholar')}</a>
                </div>
                <div class="info-item">
                    <img src="images/homepage/info icon/github.png" alt="GitHub" class="info-icon">
                    <a href="${preloadedInfo.github}" target="_blank">${getText('github')}</a>
                </div>
                <div class="info-item">
                    <img src="images/homepage/info icon/email.png" alt="Email" class="info-icon">
                    <a href="mailto:${preloadedInfo.email}">${preloadedInfo.email}</a>
                </div>
                <div class="info-item">
                    <img src="images/homepage/info icon/time.png" alt="Current Time" class="info-icon">
                    <span id="current-time"></span>
                </div>
            `;
            
            // Initial time update after HTML is set
            updateTime(timezoneOffset, currentLang);
            
            // Set up interval to update time every minute
            setInterval(() => {
                updateTime(timezoneOffset, currentLang);
            }, 60000); // Update every minute
        }
    } else {
        // Fall back to fetching content
        const configPath = getConfigPath('info');
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                const infoContent = document.getElementById('info-content');
                if (infoContent) {
                    // Use UTC+8 as default timezone if not defined in JSON
                    const timezoneOffset = data.UTC ? parseInt(data.UTC) : 8;
                    
                    const currentLang = getCurrentLanguage();
                    
                    // Store timezone offset for use in updateTime function
                    infoContent.setAttribute('data-timezone', timezoneOffset);
                    
                    // Both languages use the same structure, only data differs
                    infoContent.innerHTML = `
                        <h2>${data.name}</h2>
                        <div class="info-item">
                            <img src="images/homepage/info icon/location.png" alt="Location" class="info-icon">
                            <span>${data.address}</span>
                        </div>
                        <div class="info-item">
                            <img src="images/homepage/info icon/school.png" alt="School" class="info-icon">
                            <span>${data.institution}</span>
                        </div>
                        <div class="info-item">
                            <img src="images/homepage/info icon/google scholar.png" alt="Google Scholar" class="info-icon">
                            <a href="${data.googlescholar}" target="_blank">${getText('googleScholar')}</a>
                        </div>
                        <div class="info-item">
                            <img src="images/homepage/info icon/github.png" alt="GitHub" class="info-icon">
                            <a href="${data.github}" target="_blank">${getText('github')}</a>
                        </div>
                        <div class="info-item">
                            <img src="images/homepage/info icon/email.png" alt="Email" class="info-icon">
                            <a href="mailto:${data.email}">${data.email}</a>
                        </div>
                        <div class="info-item">
                            <img src="images/homepage/info icon/time.png" alt="Current Time" class="info-icon">
                            <span id="current-time"></span>
                        </div>
                    `;
                    
                    // Initial time update after HTML is set
                    updateTime(timezoneOffset, currentLang);
                    
                    // Set up interval to update time every minute
                    setInterval(() => {
                        updateTime(timezoneOffset, currentLang);
                    }, 60000); // Update every minute
                }
            })
            .catch(error => {
                console.error('Error loading personal info:', error);
            });
    }
}

// Function to update time dynamically - Same logic for both languages, only display format may differ
function updateTime(timezoneOffset, currentLang) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const currentTime = new Date(utc + (3600000 * timezoneOffset));
    
    // Format time as HH:MM (UTC+08:00) - same format for both languages
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const timezoneString = (timezoneOffset >= 0 ? '+' : '') + timezoneOffset.toString().padStart(2, '0');
    const timeString = `${hours}:${minutes} (UTC${timezoneString}:00)`;
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Function to load intro content - Chinese version inherits English structure, differs only in text content
function loadIntroContent() {
    // First try to get preloaded content
    const preloadedIntro = getPreloadedContent('intro');
    
    if (preloadedIntro) {
        // Use preloaded content
        const introContent = document.getElementById('intro-content');
        if (introContent) {
            // Both languages use the same structure, only text content differs
            // Convert line breaks to paragraphs
            const paragraphs = preloadedIntro.split('\n').filter(p => p.trim() !== '');
            introContent.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
        }
    } else {
        // If preloaded content is not available yet, start both:
        // 1. A quick check for preloaded content with moderate intervals
        // 2. A direct fetch request as fallback
        
        let isResolved = false;
        const introContent = document.getElementById('intro-content');
        
        // Start direct fetch immediately
        const configPath = getConfigPath('intro', '.txt');
        const fetchPromise = fetch(configPath)
            .then(response => response.text())
            .then(data => {
                if (!isResolved && introContent) {
                    isResolved = true;
                    // Both languages use the same structure, only text content differs
                    // Convert line breaks to paragraphs
                    const paragraphs = data.split('\n').filter(p => p.trim() !== '');
                    introContent.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
                }
                return data;
            })
            .catch(error => {
                console.error('Error loading intro content:', error);
            });
        
        // Check for preloaded content with moderate intervals
        const checkPreloadStatus = setInterval(() => {
            if (isResolved) {
                clearInterval(checkPreloadStatus);
                return;
            }
            
            const preloadedIntroAfterWait = getPreloadedContent('intro');
            if (preloadedIntroAfterWait) {
                clearInterval(checkPreloadStatus);
                if (!isResolved && introContent) {
                    isResolved = true;
                    // Both languages use the same structure, only text content differs
                    // Convert line breaks to paragraphs
                    const paragraphs = preloadedIntroAfterWait.split('\n').filter(p => p.trim() !== '');
                    introContent.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
                }
            }
        }, 80); // Check every 80ms for a balanced response
        
        // Set a moderate timeout to stop checking after 1.5 seconds
        setTimeout(() => {
            clearInterval(checkPreloadStatus);
            // If fetch is still pending and we haven't resolved yet, 
            // the fetchPromise will handle it when it completes
        }, 1500);
    }
}

// Function to load welcome message - Intentionally left blank for both languages
function loadWelcomeMessage() {
    // Welcome title removed, function intentionally left blank for both languages
}

// Function to load news content - Chinese version inherits English structure, differs only in news data
function loadNewsContent() {
    // First try to get preloaded content
    const preloadedNews = getPreloadedContent('news');
    
    if (preloadedNews) {
        // Use preloaded content
        const newsContent = document.getElementById('news-content');
        if (newsContent) {
            // Sort news by date (newest first) - same logic for both languages
            const sortedNews = [...preloadedNews].sort((a, b) => new Date(b.time) - new Date(a.time));
            
            const currentLang = getCurrentLanguage();
            
            // Both languages use the same structure, only news content differs
            let newsHTML = '<ul class="news-list">';
            sortedNews.forEach((item, index) => {
                // Format date from YYYY-MM-DD to locale-specific format
                const dateObj = new Date(item.time);
                const formattedDate = dateObj.toLocaleDateString(
                    currentLang === 'zh' ? 'zh-CN' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                // Add "Latest" label to the first (most recent) news item
                const latestLabel = index === 0 ? 
                    `<span class="latest-label">${getText('latest')}</span>` : '';
                
                newsHTML += `
                    <li class="news-item">
                        <div class="news-date">${formattedDate}${latestLabel}</div>
                        <div class="news-content">${item.content}</div>
                    </li>
                `;
            });
            newsHTML += '</ul>';
            
            newsContent.innerHTML = newsHTML;
        }
    } else {
        // Fall back to fetching content
        const configPath = getConfigPath('news');
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                const newsContent = document.getElementById('news-content');
                if (newsContent) {
                    // Sort news by date (newest first) - same logic for both languages
                    data.sort((a, b) => new Date(b.time) - new Date(a.time));
                    
                    const currentLang = getCurrentLanguage();
                    
                    // Both languages use the same structure, only news content differs
                    let newsHTML = '<ul class="news-list">';
                    data.forEach((item, index) => {
                        // Format date from YYYY-MM-DD to locale-specific format
                        const dateObj = new Date(item.time);
                        const formattedDate = dateObj.toLocaleDateString(
                            currentLang === 'zh' ? 'zh-CN' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        });
                        
                        // Add "Latest" label to the first (most recent) news item
                        const latestLabel = index === 0 ? 
                            `<span class="latest-label">${getText('latest')}</span>` : '';
                        
                        newsHTML += `
                            <li class="news-item">
                                <div class="news-date">${formattedDate}${latestLabel}</div>
                                <div class="news-content">${item.content}</div>
                            </li>
                        `;
                    });
                    newsHTML += '</ul>';
                    
                    newsContent.innerHTML = newsHTML;
                }
            })
            .catch(error => {
                console.error('Error loading news content:', error);
            });
    }
}

// Initialize home content when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all scripts are loaded
    setTimeout(() => {
        loadPersonalInfo();
        loadIntroContent();
        loadWelcomeMessage();
        loadNewsContent();
    }, 150);
});

// Export functions for use in other modules
window.loadPersonalInfo = loadPersonalInfo;
window.loadIntroContent = loadIntroContent;
window.loadWelcomeMessage = loadWelcomeMessage;
window.loadNewsContent = loadNewsContent;
