// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-26

// Experiences section content
// Chinese text inherits English structure, only differs in nouns and data introduction
function loadExperiencesContent() {
    const currentLang = getCurrentLanguage();
    
    // Create a container for the modules with tabs
    let content = `
        <div class="section-title">
            <h2>${getText('experiences')}</h2>
        </div>
        <div class="tabs-container">
            <div class="tabs">
                <button class="tab-button active" data-tab="education">${getText('education')}</button>
                <button class="tab-button" data-tab="employment">${getText('employment')}</button>
                <button class="tab-button" data-tab="honors-awards">${getText('honorsAndAwards')}</button>
                <button class="tab-button" data-tab="teaching">${getText('teaching')}</button>
                <button class="tab-button" data-tab="reviewer">${getText('reviewer')}</button>
            </div>
            <div class="tab-content">
                <div id="education" class="tab-pane active">
                    <div id="education-modules-container"></div>
                </div>
                <div id="employment" class="tab-pane">
                    <div id="employment-modules-container"></div>
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
        loadInstitutionExperiencesModules('education-modules-container', currentLang);
        loadEmploymentModules('employment-modules-container', currentLang);
        loadHonorsAwardsModules('honors-awards-modules-container', currentLang);
        loadTeachingModules('teaching-modules-container', currentLang);
        loadReviewerModules('reviewer-modules-container', currentLang);
        
        // After loading all modules, check if we need to hide any tabs
        setTimeout(() => {
            // Check if employment tab should be hidden
            const employmentContainer = document.getElementById('employment-modules-container');
            if (employmentContainer && employmentContainer.children.length === 0) {
                const employmentTab = document.querySelector('.tab-button[data-tab="employment"]');
                if (employmentTab) {
                    employmentTab.style.display = 'none';
                }
            }
            
            // Check if honors-awards tab should be hidden
            const honorsContainer = document.getElementById('honors-awards-modules-container');
            if (honorsContainer && honorsContainer.children.length === 0) {
                const honorsTab = document.querySelector('.tab-button[data-tab="honors-awards"]');
                if (honorsTab) {
                    honorsTab.style.display = 'none';
                }
            }
            
            // Check if teaching tab should be hidden
            const teachingContainer = document.getElementById('teaching-modules-container');
            if (teachingContainer && teachingContainer.children.length === 0) {
                const teachingTab = document.querySelector('.tab-button[data-tab="teaching"]');
                if (teachingTab) {
                    teachingTab.style.display = 'none';
                }
            }
            
            // Check if reviewer tab should be hidden
            const reviewerContainer = document.getElementById('reviewer-modules-container');
            if (reviewerContainer && reviewerContainer.children.length === 0) {
                const reviewerTab = document.querySelector('.tab-button[data-tab="reviewer"]');
                if (reviewerTab) {
                    reviewerTab.style.display = 'none';
                }
            }
            
            // Ensure at least one tab is active and visible
            const visibleTabs = Array.from(document.querySelectorAll('.tab-button')).filter(tab => 
                tab.style.display !== 'none'
            );
            
            if (visibleTabs.length > 0) {
                // Check if the currently active tab is visible
                const activeTab = document.querySelector('.tab-button.active');
                if (activeTab && activeTab.style.display === 'none') {
                    // If active tab is hidden, activate the first visible tab
                    activeTab.classList.remove('active');
                    const firstVisibleTab = visibleTabs[0];
                    firstVisibleTab.classList.add('active');
                    
                    // Also activate the corresponding pane
                    const tabId = firstVisibleTab.getAttribute('data-tab');
                    document.querySelectorAll('.tab-pane').forEach(pane => {
                        pane.classList.remove('active');
                    });
                    const targetPane = document.getElementById(tabId);
                    if (targetPane) {
                        targetPane.classList.add('active');
                    }
                    
                    // Update the stored state
                    if (typeof activeTabStates !== 'undefined') {
                        activeTabStates.experiences = tabId;
                    }
                }
            }
            
            // Force a reflow to ensure all floating elements are properly rendered
            const experiencesSection = document.getElementById('experiences');
            if (experiencesSection) {
                experiencesSection.style.display = 'none';
                experiencesSection.offsetHeight; // Trigger reflow
                experiencesSection.style.display = '';
            }
        }, 500); // Wait for modules to load
        
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
    // First try to get preloaded content
    const preloadedEducation = getPreloadedContent('education');
    
    if (preloadedEducation) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        renderModuleContainers(preloadedEducation, 'education', containerId, language, true);
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/education_zh.json' : 
            'configs/en/education.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // All education in the current structure are education
                const educationData = data;
                
                // Get container element
                const container = document.getElementById(containerId);
                if (!container) return;
                
                renderModuleContainers(educationData, 'education', containerId, language, true);
            })
            .catch(error => {
                console.error('Error loading education modules:', error);
            });
    }
}



/**
 * Loads employment modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadEmploymentModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedEmployment = getPreloadedContent('employment');
    
    if (preloadedEmployment) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Check if there are any employment records
        if (preloadedEmployment && preloadedEmployment.length > 0) {
            // Map the data to the format expected by renderModuleContainers
            const employmentData = preloadedEmployment.map(employment => {
                // Create a details list for the employment record
                const details = employment.details.map(detail => ({
                    position: detail.position,
                    department: detail.department,
                    time: detail.time,
                    project: detail.project
                }));
                
                return {
                    company: employment.company,
                    logoSrc: employment.logoSrc,
                    link: employment.link,
                    details: details,
                    description: employment.company
                };
            });
            
            renderModuleContainers(employmentData, 'employment', containerId, language, true);
            
            // Show the tab button if it was hidden
            const tabButton = document.querySelector('.tab-button[data-tab="employment"]');
            if (tabButton) {
                tabButton.style.display = '';
            }
        } else {
            // Hide the tab button if no employment data
            const tabButton = document.querySelector('.tab-button[data-tab="employment"]');
            if (tabButton) {
                tabButton.style.display = 'none';
            }
        }
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/employment_zh.json' : 
            'configs/en/employment.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // Check if there are any employment records
                if (data && data.length > 0) {
                    // Get container element
                    const container = document.getElementById(containerId);
                    if (!container) return;
                    
                    // Map the data to the format expected by renderModuleContainers
                    const employmentData = data.map(employment => {
                        // Create a details list for the employment record
                        const details = employment.details.map(detail => ({
                            position: detail.position,
                            department: detail.department,
                            time: detail.time,
                            project: detail.project
                        }));
                        
                        return {
                        company: employment.company,
                        logoSrc: employment.logoSrc,
                        link: employment.link,
                        details: details,
                        description: employment.company
                    };
                    });
                    
                    renderModuleContainers(employmentData, 'employment', containerId, language, true);
                    
                    // Show the tab button if it was hidden
                    const tabButton = document.querySelector('.tab-button[data-tab="employment"]');
                    if (tabButton) {
                        tabButton.style.display = '';
                    }
                } else {
                    // Hide the tab button if no employment data
                    const tabButton = document.querySelector('.tab-button[data-tab="employment"]');
                    if (tabButton) {
                        tabButton.style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('Error loading employment modules:', error);
                
                // Hide the tab button if there's an error loading the data
                const tabButton = document.querySelector('.tab-button[data-tab="employment"]');
                if (tabButton) {
                    tabButton.style.display = 'none';
                }
            });
    }
}

/**
 * Loads honors and awards modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadHonorsAwardsModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedHonors = getPreloadedContent('honors');
    
    if (preloadedHonors) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Check if there are any honors
        if (preloadedHonors && preloadedHonors.length > 0) {
            // Map the data to the format expected by renderModuleContainers
            const honorsData = preloadedHonors.map(honor => ({
                title: honor.award,
                organization: honor.unit,
                time: honor.time,
                description: `${honor.award} - ${honor.unit}`
            }));
            
            renderModuleContainers(honorsData, 'honor', containerId, language, true);
            
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
    } else {
        // Fall back to fetching content
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
                    
                    renderModuleContainers(honorsData, 'honor', containerId, language, true);
                    
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
}

/**
 * Loads teaching modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadTeachingModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedTeaching = getPreloadedContent('teaching');
    
    if (preloadedTeaching) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Check if there are any teaching experiences
        if (preloadedTeaching && preloadedTeaching.length > 0) {
            // Map the data to the format expected by renderModuleContainers
            const teachingData = preloadedTeaching.map(teaching => {
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
    } else {
        // Fall back to fetching content
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
                    
                    renderModuleContainers(teachingData, 'teaching', containerId, language, true);
                    
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
}

/**
 * Loads reviewer modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadReviewerModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedReviewer = getPreloadedContent('reviewer');
    
    if (preloadedReviewer) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Check if there are any reviewer experiences
        if (preloadedReviewer && preloadedReviewer.length > 0) {
            // Process and merge reviewer data
            const processedReviewerData = processReviewerData(preloadedReviewer, language);
            
            renderModuleContainers(processedReviewerData, 'reviewer', containerId, language, true);
            
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
    } else {
        // Fall back to fetching content
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
                    
                    // Process and merge reviewer data
                    const processedReviewerData = processReviewerData(data, language);
                    
                    renderModuleContainers(processedReviewerData, 'reviewer', containerId, language, true);
                    
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
}

/**
 * Processes reviewer data to merge entries with the same conference/journal but different years
 * @param {Array} reviewerData - The raw reviewer data
 * @param {string} language - The language code
 * @returns {Array} - Processed reviewer data with merged entries
 */
function processReviewerData(reviewerData, language = 'en') {
    // Create a map to group by conference/journal name
    const reviewerMap = new Map();
    
    reviewerData.forEach(reviewer => {
        // Use conference or journal as the key
        const key = reviewer.conference || reviewer.journal;
        
        if (reviewerMap.has(key)) {
            // If the key already exists, add the year to the existing entry
            const existingEntry = reviewerMap.get(key);
            if (!existingEntry.years.includes(reviewer.year)) {
                existingEntry.years.push(reviewer.year);
            }
        } else {
            // If the key doesn't exist, create a new entry
            reviewerMap.set(key, {
                title: key,
                years: [reviewer.year],
                type: reviewer.conference ? 'conference' : 'journal'
            });
        }
    });
    
    // Convert the map back to an array and sort years
    const processedData = Array.from(reviewerMap.values()).map(entry => {
        // Sort years in ascending order
        entry.years.sort((a, b) => parseInt(a) - parseInt(b));
        
        // Join years with slashes
        const yearsString = entry.years.join(' / ');
        
        return {
            title: entry.title,
            description: `${language === 'zh' ? '年份：' : 'Year: '}${yearsString}`,
            time: null // Set to null to use the custom description format
        };
    });
    
    return processedData;
}

// Export functions to be used by other modules
window.loadExperiencesContent = loadExperiencesContent;
window.loadInstitutionExperiencesModules = loadInstitutionExperiencesModules;
window.loadEmploymentModules = loadEmploymentModules;
window.loadHonorsAwardsModules = loadHonorsAwardsModules;
window.loadTeachingModules = loadTeachingModules;
window.loadReviewerModules = loadReviewerModules;