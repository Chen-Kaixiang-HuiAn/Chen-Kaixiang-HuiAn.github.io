// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-19

// Publications section content
// Chinese text inherits English structure, only differs in nouns and data introduction
function loadPublicationsContent() {
    const currentLang = getCurrentLanguage();
    
    // Create a container for the modules with tabs
    let content = `
        <div class="section-title">
            <h2>${getText('publications')}</h2>
        </div>
        <div class="tabs-container">
            <div class="tabs">
                <button class="tab-button active" data-tab="academic-papers">${getText('academicPapers')}</button>
                <button class="tab-button" data-tab="patents">${getText('patents')}</button>
            </div>
            <div class="tab-content">
                <div id="academic-papers" class="tab-pane active">
                    <div id="academic-papers-modules-container"></div>
                </div>
                <div id="patents" class="tab-pane">
                    <div id="patents-modules-container"></div>
                </div>
            </div>
        </div>
    `;
    
    // Load modules after the content is added to the DOM
    setTimeout(() => {
        loadAcademicPapersModules('academic-papers-modules-container', currentLang);
        loadPatentsModules('patents-modules-container', currentLang);
        
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
                    activeTabStates.publications = tabId;
                }
            });
        });
        
        // Check if patents tab is visible, if not, ensure academic-papers is active
        const patentsTabButton = document.querySelector('.tab-button[data-tab="patents"]');
        if (patentsTabButton && patentsTabButton.style.display === 'none') {
            // Make sure academic-papers is active
            const academicPapersButton = document.querySelector('.tab-button[data-tab="academic-papers"]');
            const academicPapersPane = document.getElementById('academic-papers');
            
            if (academicPapersButton && academicPapersPane) {
                academicPapersButton.classList.add('active');
                academicPapersPane.classList.add('active');
            }
        }
    }, 100);
    
    return content;
}

/**
 * Loads academic papers modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 * Chinese text inherits English structure, only differs in nouns and data introduction
 */
function loadAcademicPapersModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedPapers = getPreloadedContent('papers');
    
    if (preloadedPapers) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Check if there are any papers
        const years = Object.keys(preloadedPapers);
        if (years.length === 0) {
            // If no papers, show a message
            container.innerHTML = `
                <div class="no-content-message">
                    <p>${language === 'zh' ? '暂无学术论文。' : 'No academic papers to display at this time.'}</p>
                </div>
            `;
            return;
        }
        
        // Sort years in descending order (newest first)
        years.sort((a, b) => parseInt(b) - parseInt(a));
        
        // Create year sections and add papers
        years.forEach(year => {
            // Filter only academic papers for this year (Conference Paper, Journal Paper, etc.)
            const academicPapers = preloadedPapers[year].filter(paper => {
                if (!paper.type) return false;
                
                // Check for English paper types
                if (language === 'en') {
                    return paper.type.toLowerCase().includes('submission') || 
                           paper.type.toLowerCase().includes('journal') ||
                           paper.type.toLowerCase().includes('conference') ||
                           paper.type.toLowerCase().includes('workshop');
                }
                // Check for Chinese paper types
                else {
                    return paper.type.includes('在投') || 
                           paper.type.includes('期刊') || 
                           paper.type.includes('会议') ||
                           paper.type.includes('研讨会');
                }
            });
            
            // Only create year section if there are academic papers for this year
            if (academicPapers.length > 0) {
                // Create year header
                const yearHeader = document.createElement('div');
                yearHeader.className = 'year-header';
                yearHeader.innerHTML = `<h3>${year}</h3>`;
                container.appendChild(yearHeader);
                
                // Create a container for papers of this year
                const yearContainer = document.createElement('div');
                yearContainer.className = 'year-container';
                yearContainer.id = `year-${year}-container`;
                container.appendChild(yearContainer);
                
                // Add year to each paper
                academicPapers.forEach(paper => {
                    paper.year = year;
                });
                
                // Render papers for this year
                renderModuleContainers(academicPapers, 'publication', yearContainer.id, language);
            }
        });
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/papers_zh.json' : 
            'configs/en/papers.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // Get container element
                const container = document.getElementById(containerId);
                if (!container) return;
                
                // Clear existing content
                container.innerHTML = '';
                
                // Check if there are any papers
                const years = Object.keys(data);
                if (years.length === 0) {
                    // If no papers, show a message
                    container.innerHTML = `
                        <div class="no-content-message">
                            <p>${language === 'zh' ? '暂无学术论文。' : 'No academic papers to display at this time.'}</p>
                        </div>
                    `;
                    return;
                }
                
                // Sort years in descending order (newest first)
                years.sort((a, b) => parseInt(b) - parseInt(a));
                
                // Create year sections and add papers
                years.forEach(year => {
                    // Filter only academic papers for this year (Conference Paper, Journal Paper, etc.)
                    const academicPapers = data[year].filter(paper => {
                        if (!paper.type) return false;
                        
                        // Check for English paper types
                        if (language === 'en') {
                            return paper.type.toLowerCase().includes('paper') || 
                                   paper.type.toLowerCase().includes('journal') ||
                                   paper.type.toLowerCase().includes('conference') ||
                                   paper.type.toLowerCase().includes('proceedings');
                        }
                        // Check for Chinese paper types
                        else {
                            return paper.type.includes('论文') || 
                                   paper.type.includes('期刊') || 
                                   paper.type.includes('会议');
                        }
                    });
                    
                    // Only create year section if there are academic papers for this year
                    if (academicPapers.length > 0) {
                        // Create year header
                        const yearHeader = document.createElement('div');
                        yearHeader.className = 'year-header';
                        yearHeader.innerHTML = `<h3>${year}</h3>`;
                        container.appendChild(yearHeader);
                        
                        // Create a container for papers of this year
                        const yearContainer = document.createElement('div');
                        yearContainer.className = 'year-container';
                        yearContainer.id = `year-${year}-container`;
                        container.appendChild(yearContainer);
                        
                        // Add year to each paper
                        academicPapers.forEach(paper => {
                            paper.year = year;
                        });
                        
                        // Render papers for this year
                        renderModuleContainers(academicPapers, 'publication', yearContainer.id, language);
                    }
                });
            })
            .catch(error => {
                console.error('Error loading academic papers modules:', error);
            });
    }
}

/**
 * Load patents modules
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 * Chinese text inherits English structure, only differs in nouns and data introduction
 */
function loadPatentsModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedPatents = getPreloadedContent('patents');
    
    if (preloadedPatents) {
        // Use preloaded content
        // Check if there are any patents
        if (preloadedPatents && preloadedPatents.patents && preloadedPatents.patents.length > 0) {
            // Get container element
            const container = document.getElementById(containerId);
            if (!container) return;
            
            // Map the data to the format expected by renderModuleContainers
            const patentsData = preloadedPatents.patents.map(patent => ({
                title: patent.title,
                authors: patent.authors,
                type: patent.type,
                number: patent.number,
                date: patent.date,
                link: patent.link,
                description: `${patent.type} - ${patent.number}`
            }));
            
            renderModuleContainers(patentsData, 'patent', containerId, language);
            
            // Show the tab button if it was hidden
            const tabButton = document.querySelector('.tab-button[data-tab="patents"]');
            if (tabButton) {
                tabButton.style.display = '';
            }
        } else {
            // Hide the tab button if no patents data
            const tabButton = document.querySelector('.tab-button[data-tab="patents"]');
            if (tabButton) {
                tabButton.style.display = 'none';
            }
        }
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/patents_zh.json' : 
            'configs/en/patents.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // Check if there are any patents
                if (data && data.patents && data.patents.length > 0) {
                    // Get container element
                    const container = document.getElementById(containerId);
                    if (!container) return;
                    
                    // Map the data to the format expected by renderModuleContainers
                    const patentsData = data.patents.map(patent => ({
                        title: patent.title,
                        authors: patent.authors,
                        type: patent.type,
                        number: patent.number,
                        date: patent.date,
                        link: patent.link,
                        description: `${patent.type} - ${patent.number}`
                    }));
                    
                    renderModuleContainers(patentsData, 'patent', containerId, language);
                    
                    // Show the tab button if it was hidden
                    const tabButton = document.querySelector('.tab-button[data-tab="patents"]');
                    if (tabButton) {
                        tabButton.style.display = '';
                    }
                } else {
                    // Hide the tab button if no patents data
                    const tabButton = document.querySelector('.tab-button[data-tab="patents"]');
                    if (tabButton) {
                        tabButton.style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('Error loading patents modules:', error);
                
                // Hide the tab button if there's an error loading the data
                const tabButton = document.querySelector('.tab-button[data-tab="patents"]');
                if (tabButton) {
                    tabButton.style.display = 'none';
                }
            });
    }
}

// Export functions for use in other modules
window.loadPublicationsContent = loadPublicationsContent;
window.loadAcademicPapersModules = loadAcademicPapersModules;
window.loadPatentsModules = loadPatentsModules;