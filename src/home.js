// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-17
// Home section content
function loadHomeContent() {
    const currentLang = getCurrentLanguage();
    
    // Create a container for the home content with fade effect
    let content = `
        <div class="home-content-wrapper" style="opacity: 0;">
    `;
    
    if (currentLang === 'zh') {
        content += `
            <div class="home-container">
                <!-- Container for info and content sections -->
                <div class="home-content-container">
                    <!-- Left Information Section -->
                    <div class="info-section">
                        <div class="profile-container">
                            <img src="images/homepage/photo/photo.png" alt="Profile Photo" class="profile-photo">
                        </div>
                        <div class="info-content" id="info-content">
                            <!-- Info will be loaded dynamically -->
                        </div>
                    </div>
                    
                    <!-- Right Content Section -->
                    <div class="home-content-section">
                        <div class="intro-section">
                            <h3>${getText('aboutMe')}</h3>
                            <div id="intro-content">
                                <!-- Intro content will be loaded dynamically -->
                            </div>
                        </div>
                        <div class="news-section">
                            <h3>${getText('news')}</h3>
                            <div id="news-content">
                                <!-- News content will be loaded dynamically -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Research Highlights Section -->
                <div class="research-section">
                    <h3>${getText('researchHighlights')}</h3>
                    <div id="research-highlights-container"></div>
                </div>
            </div>
        `;
    } else {
        content += `
            <div class="home-container">
                <!-- Container for info and content sections -->
                <div class="home-content-container">
                    <!-- Left Information Section -->
                    <div class="info-section">
                        <div class="profile-container">
                            <img src="images/homepage/photo/photo.png" alt="Profile Photo" class="profile-photo">
                        </div>
                        <div class="info-content" id="info-content">
                            <!-- Info will be loaded dynamically -->
                        </div>
                    </div>
                    
                    <!-- Right Content Section -->
                    <div class="home-content-section">
                        <div class="intro-section">
                            <h3>${getText('aboutMe')}</h3>
                            <div id="intro-content">
                                <!-- Intro content will be loaded dynamically -->
                            </div>
                        </div>
                        <div class="news-section">
                            <h3>${getText('news')}</h3>
                            <div id="news-content">
                                <!-- News content will be loaded dynamically -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Research Highlights Section -->
                <div class="research-section">
                    <h3>${getText('researchHighlights')}</h3>
                    <div id="research-highlights-container"></div>
                </div>
            </div>
        `;
    }
    
    content += `</div>`;
    
    // Load content after the content is added to the DOM
    setTimeout(() => {
        loadPersonalInfo();
        loadIntroContent();
        loadWelcomeMessage();
        loadNewsContent();
        loadResearchHighlights();
        
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

// Function to load personal information
function loadPersonalInfo() {
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

// Function to update time dynamically
function updateTime(timezoneOffset, currentLang) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const currentTime = new Date(utc + (3600000 * timezoneOffset));
    
    // Format time as HH:MM (UTC+08:00)
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const timezoneString = (timezoneOffset >= 0 ? '+' : '') + timezoneOffset.toString().padStart(2, '0');
    const timeString = `${hours}:${minutes} (UTC${timezoneString}:00)`;
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Function to load intro content
function loadIntroContent() {
    const configPath = getConfigPath('intro', '.txt');
    fetch(configPath)
        .then(response => response.text())
        .then(data => {
            const introContent = document.getElementById('intro-content');
            if (introContent) {
                // Convert line breaks to paragraphs
                const paragraphs = data.split('\n').filter(p => p.trim() !== '');
                introContent.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
            }
        })
        .catch(error => {
            console.error('Error loading intro content:', error);
        });
}

// Function to load welcome message
function loadWelcomeMessage() {
    // Welcome title removed, function intentionally left blank
}

// Function to load news content
function loadNewsContent() {
    const configPath = getConfigPath('news');
    fetch(configPath)
        .then(response => response.json())
        .then(data => {
            const newsContent = document.getElementById('news-content');
            if (newsContent) {
                // Sort news by date (newest first)
                data.sort((a, b) => new Date(b.time) - new Date(a.time));
                
                const currentLang = getCurrentLanguage();
                
                let newsHTML = '<ul class="news-list">';
                data.forEach((item, index) => {
                    // Format date from YYYY-MM-DD to Mon DD, YYYY
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

// Function to load research highlights
function loadResearchHighlights() {
    const currentLang = getCurrentLanguage();
    const configPath = currentLang === 'zh' ? 
        'configs/zh/papers_zh.json' : 
        'configs/en/papers.json';
    
    fetch(configPath)
        .then(response => response.json())
        .then(data => {
            // Convert the year-based structure to a flat array
            const papers = [];
            Object.keys(data).forEach(year => {
                data[year].forEach(paper => {
                    paper.year = year;
                    papers.push(paper);
                });
            });
            
            // Filter only highlighted papers
            const highlightedPapers = papers.filter(paper => paper.highlighted === true);
            
            // Get container element
            const container = document.getElementById('research-highlights-container');
            if (!container) return;
            
            if (highlightedPapers.length > 0) {
                renderModuleContainers(highlightedPapers, 'publication', 'research-highlights-container', currentLang);
            } else {
                // If no highlighted papers, show a message
                container.innerHTML = `
                    <div class="no-content-message">
                        <p>No research highlights to display at this time.</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error loading research highlights:', error);
        });
}

// Initialize home content when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadPersonalInfo();
    loadIntroContent();
    loadWelcomeMessage();
    loadNewsContent();
    loadResearchHighlights();
});

// Export functions for use in other modules
window.loadPersonalInfo = loadPersonalInfo;
window.loadIntroContent = loadIntroContent;
window.loadWelcomeMessage = loadWelcomeMessage;
window.loadNewsContent = loadNewsContent;
window.loadResearchHighlights = loadResearchHighlights;
