// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-17
// Experiences section content
function loadExperiencesContent() {
    const currentLang = getCurrentLanguage();
    
    // Create a container for the modules with tabs
    let content = `
        <div class="section-title">
            <h2>${getText('experiences')}</h2>
        </div>
        <div class="tabs-container">
            <div class="tabs">
                <button class="tab-button active" data-tab="institution-experiences">${getText('institutionExperiences')}</button>
                <button class="tab-button" data-tab="honors-awards">${getText('honorsAndAwards')}</button>
                <button class="tab-button" data-tab="teaching">${getText('teaching')}</button>
                <button class="tab-button" data-tab="reviewer">${getText('reviewer')}</button>
            </div>
            <div class="tab-content">
                <div id="institution-experiences" class="tab-pane active">
                    <div id="institution-experiences-modules-container"></div>
                </div>
                <div id="honors-awards" class="tab-pane">
                    <div id="honors-awards-modules-container"></div>
                </div>
                <div id="teaching" class="tab-pane">
                    <div id="teaching-modules-container"></div>
                </div>
                <div id="reviewer" class="tab-pane">
                    <div id="reviewer-modules-container"></div>
                </div>
            </div>
        </div>
    `;
    
    // Load modules after the content is added to the DOM
    setTimeout(() => {
        loadInstitutionExperiencesModules('institution-experiences-modules-container', currentLang);
        loadHonorsAwardsModules('honors-awards-modules-container', currentLang);
        loadTeachingModules('teaching-modules-container', currentLang);
        loadReviewerModules('reviewer-modules-container', currentLang);
        
        // Add tab switching functionality
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding pane
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                // Store the active tab state
                if (typeof activeTabStates !== 'undefined') {
                    activeTabStates.experiences = tabId;
                }
            });
        });
    }, 100);
    
    return content;
}

/**
 * Loads institution experiences modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadInstitutionExperiencesModules(containerId, language = 'en') {
    const configPath = language === 'zh' ? 
        'configs/zh/experiences_zh.json' : 
        'configs/en/experiences.json';
    
    fetch(configPath)
        .then(response => response.json())
        .then(data => {
            // All experiences in the current structure are institution experiences
            const institutionExperiences = data;
            
            // Get container element
            const container = document.getElementById(containerId);
            if (!container) return;
            
            renderModuleContainers(institutionExperiences, 'education', containerId, language);
        })
        .catch(error => {
            console.error('Error loading institution experiences modules:', error);
        });
}



/**
 * Loads honors and awards modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadHonorsAwardsModules(containerId, language = 'en') {
    const configPath = language === 'zh' ? 
        'configs/zh/honors_zh.json' : 
        'configs/en/honors.json';
    
    fetch(configPath)
        .then(response => response.json())
        .then(data => {
            // Check if there are any honors
            if (data && data.length > 0) {
                // Get container element
                const container = document.getElementById(containerId);
                if (!container) return;
                
                // Map the data to the format expected by renderModuleContainers
                const honorsData = data.map(honor => ({
                    title: honor.award,
                    organization: honor.unit,
                    time: honor.time,
                    description: `${honor.award} - ${honor.unit}`
                }));
                
                renderModuleContainers(honorsData, 'honor', containerId, language);
                
                // Show the tab button if it was hidden
                const tabButton = document.querySelector('.tab-button[data-tab="honors-awards"]');
                if (tabButton) {
                    tabButton.style.display = '';
                }
            } else {
                // Hide the tab button if no honors data
                const tabButton = document.querySelector('.tab-button[data-tab="honors-awards"]');
                if (tabButton) {
                    tabButton.style.display = 'none';
                }
            }
        })
        .catch(error => {
            console.error('Error loading honors and awards modules:', error);
            
            // Hide the tab button if there's an error loading the data
            const tabButton = document.querySelector('.tab-button[data-tab="honors-awards"]');
            if (tabButton) {
                tabButton.style.display = 'none';
            }
        });
}

/**
 * Loads teaching modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadTeachingModules(containerId, language = 'en') {
    const configPath = language === 'zh' ? 
        'configs/zh/teaching_zh.json' : 
        'configs/en/teaching.json';
    
    fetch(configPath)
        .then(response => response.json())
        .then(data => {
            // Check if there are any teaching experiences
            if (data && data.length > 0) {
                // Get container element
                const container = document.getElementById(containerId);
                if (!container) return;
                
                // Map the data to the format expected by renderModuleContainers
                const teachingData = data.map(teaching => {
                    // 根据语言调整年份和季节的显示顺序
                    const timeDisplay = language === 'zh' ? 
                        `${teaching.year || ''} ${teaching.season || ''}` : 
                        `${teaching.season || ''} ${teaching.year || ''}`;
                    
                    return {
                        title: `${teaching.code || ''} ${teaching.course || ''}${teaching.school ? ', ' + teaching.school : ''}`.trim(),
                        school: teaching.school || '',
                        code: teaching.code || '',
                        identity: teaching.identity || (language === 'zh' ? '助教' : 'Teaching Assistant'),
                        season: teaching.season || '',
                        year: teaching.year || '',
                        description: `${teaching.identity || (language === 'zh' ? '助教' : 'Teaching Assistant')} - ${timeDisplay}`.trim()
                    };
                });
                
                renderModuleContainers(teachingData, 'teaching', containerId, language);
                
                // Show the tab button if it was hidden
                const tabButton = document.querySelector('.tab-button[data-tab="teaching"]');
                if (tabButton) {
                    tabButton.style.display = '';
                }
            } else {
                // Hide the tab button if no teaching data
                const tabButton = document.querySelector('.tab-button[data-tab="teaching"]');
                if (tabButton) {
                    tabButton.style.display = 'none';
                }
            }
        })
        .catch(error => {
            console.error('Error loading teaching modules:', error);
            
            // Hide the tab button if there's an error loading the data
            const tabButton = document.querySelector('.tab-button[data-tab="teaching"]');
            if (tabButton) {
                tabButton.style.display = 'none';
            }
        });
}

/**
 * Loads reviewer modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadReviewerModules(containerId, language = 'en') {
    const configPath = language === 'zh' ? 
        'configs/zh/reviewer_zh.json' : 
        'configs/en/reviewer.json';
    
    fetch(configPath)
        .then(response => response.json())
        .then(data => {
            // Check if there are any reviewer experiences
            if (data && data.length > 0) {
                // Get container element
                const container = document.getElementById(containerId);
                if (!container) return;
                
                // Map the data to the format expected by renderModuleContainers
                const reviewerData = data.map(reviewer => ({
                    title: `${reviewer.journal || reviewer.conference}, ${reviewer.year}`,
                    organization: reviewer.publisher || reviewer.organization,
                    time: null, // Set to null to hide the time display
                    description: `${reviewer.journal || reviewer.conference}, ${reviewer.year}`
                }));
                
                renderModuleContainers(reviewerData, 'reviewer', containerId, language);
                
                // Show the tab button if it was hidden
                const tabButton = document.querySelector('.tab-button[data-tab="reviewer"]');
                if (tabButton) {
                    tabButton.style.display = '';
                }
            } else {
                // Hide the tab button if no reviewer data
                const tabButton = document.querySelector('.tab-button[data-tab="reviewer"]');
                if (tabButton) {
                    tabButton.style.display = 'none';
                }
            }
        })
        .catch(error => {
            console.error('Error loading reviewer modules:', error);
            
            // Hide the tab button if there's an error loading the data
            const tabButton = document.querySelector('.tab-button[data-tab="reviewer"]');
            if (tabButton) {
                tabButton.style.display = 'none';
            }
        });
}

// Export functions for use in other modules
window.loadExperiencesContent = loadExperiencesContent;
window.loadInstitutionExperiencesModules = loadInstitutionExperiencesModules;

window.loadHonorsAwardsModules = loadHonorsAwardsModules;
window.loadTeachingModules = loadTeachingModules;
window.loadReviewerModules = loadReviewerModules;