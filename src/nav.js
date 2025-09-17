// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-17
// Create navigation bar
function createNavbar() {
    // Check if navigation bar already exists
    if (document.querySelector('header.navbar')) {
        return;
    }
    
    // Create navigation bar container
    const navbar = document.createElement('div');
    navbar.className = 'navbar';
    
    // Create upper layer - Logo
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.innerHTML = '<img src="images/homepage/favicon/favicon.ico" alt="Logo" style="height: 32px; margin-right: 10px;"><span>EXCURSION CONSHEIN 2.0</span>';
    
    // Create lower layer - Navigation links
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    navLinks.innerHTML = `
        <a href="javascript:void(0)">${getText('home')}</a>
        <a href="javascript:void(0)">${getText('experiences')}</a>
        <a href="javascript:void(0)">${getText('publications')}</a>
        <a href="javascript:void(0)">${getText('cv')}</a>
    `;
    
    // Add click event to navigation links
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            // Hide all sections immediately
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Determine target section based on link text
            let targetId;
            const linkText = e.target.textContent;
            const currentLang = getCurrentLanguage();
            
            if (currentLang === 'zh') {
                switch(linkText) {
                    case '主页':
                        targetId = 'home';
                        break;
                    case '经历':
                        targetId = 'experiences';
                        break;
                    case '出版物':
                        targetId = 'publications';
                        break;
                    case '简历':
                        targetId = 'cv';
                        break;
                    default:
                        targetId = 'home';
                }
            } else {
                switch(linkText) {
                    case 'Home':
                        targetId = 'home';
                        break;
                    case 'Experiences':
                        targetId = 'experiences';
                        break;
                    case 'Publications':
                        targetId = 'publications';
                        break;
                    case 'CV':
                        targetId = 'cv';
                        break;
                    default:
                        targetId = 'home';
                }
            }
            
            // Show the target section immediately
            let targetSection = document.getElementById(targetId);
            if ((targetId === 'home' || targetId === 'cv') && targetSection) {
                // For home and cv sections, show them with fade effect
                // Only add transition if not already set
                if (!targetSection.style.transition) {
                    targetSection.style.transition = 'opacity 0.5s ease';
                }
                targetSection.style.opacity = '0';
                targetSection.classList.add('active');
                
                setTimeout(() => {
                    // Use requestAnimationFrame for smoother transition
                    requestAnimationFrame(() => {
                        targetSection.style.opacity = '1';
                    });
                    // Ensure home content is in the correct language
                    updateSectionContentLanguage(targetId);
                    // Load home content
                    if (targetId === 'home' && typeof loadHomeContent === 'function') {
                        loadHomeContent();
                    }
                    // Load CV content
                    if (targetId === 'cv' && typeof loadCVContent === 'function') {
                        loadCVContent();
                    }
                }, 50);
            } else if (targetSection) {
                targetSection.classList.add('active');
                // Ensure the section content is in the correct language
                setTimeout(() => {
                    updateSectionContentLanguage(targetId);
                    
                    // Reset to default tab for experiences and publications sections
                    if (targetId === 'experiences') {
                        // Find the first tab button (default tab)
                        const firstTabButton = targetSection.querySelector('.tab-button');
                        if (firstTabButton) {
                            // Remove active class from all buttons and panes
                            targetSection.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                            targetSection.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                            
                            // Add active class to the first tab button and its pane
                            firstTabButton.classList.add('active');
                            const tabId = firstTabButton.getAttribute('data-tab');
                            const tabPane = targetSection.querySelector(`.tab-pane#${tabId}`);
                            if (tabPane) {
                                tabPane.classList.add('active');
                            }
                            
                            // Update the stored state to default
                            if (typeof activeTabStates !== 'undefined') {
                                activeTabStates.experiences = tabId;
                            }
                        }
                    } else if (targetId === 'publications') {
                        // Find the first tab button (default tab)
                        const firstTabButton = targetSection.querySelector('.tab-button');
                        if (firstTabButton) {
                            // Remove active class from all buttons and panes
                            targetSection.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                            targetSection.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
                            
                            // Add active class to the first tab button and its pane
                            firstTabButton.classList.add('active');
                            const tabId = firstTabButton.getAttribute('data-tab');
                            const tabPane = targetSection.querySelector(`.tab-pane#${tabId}`);
                            if (tabPane) {
                                tabPane.classList.add('active');
                            }
                            
                            // Update the stored state to default
                            if (typeof activeTabStates !== 'undefined') {
                                activeTabStates.publications = tabId;
                            }
                        }
                    }
                }, 50);
            } else {
                // If target section doesn't exist, create it
                targetSection = document.createElement('section');
                targetSection.id = targetId;
                targetSection.className = 'content-section active';
                
                // Add fade effect for home and cv sections
                if (targetId === 'home' || targetId === 'cv') {
                    targetSection.style.transition = 'opacity 0.5s ease';
                    targetSection.style.opacity = '0';
                }
                
                // Add specific content based on section using the new functions
                switch(targetId) {
                    case 'home':
                        targetSection.innerHTML = '';
                        targetSection.appendChild(document.createElement('div')).id = 'home-content';
                        if (typeof loadHomeContent === 'function') {
                            loadHomeContent();
                        }
                        break;
                    case 'experiences':
                        targetSection.innerHTML = loadExperiencesContent();
                        break;
                    case 'publications':
                        targetSection.innerHTML = loadPublicationsContent();
                        break;
                    case 'cv':
                        targetSection.innerHTML = loadCVContent();
                        break;
                    default:
                        targetSection.innerHTML = `<p>Content for ${targetId} section.</p>`;
                }
                
                // Add to main content area
                let mainContent = document.getElementById('main-content');
                if (!mainContent) {
                    mainContent = document.querySelector('#main-content .content-wrapper');
                }
                if (!mainContent) {
                    mainContent = document.querySelector('.content-wrapper');
                }
                if (!mainContent) {
                    mainContent = document.body;
                }
                mainContent.appendChild(targetSection);
                
                // Apply fade in effect for home and cv sections
                if (targetId === 'home' || targetId === 'cv') {
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            targetSection.style.opacity = '1';
                        });
                    }, 50);
                }
                
                // Ensure the section content is in the correct language after creation
                setTimeout(() => {
                    updateSectionContentLanguage(targetId);
                    
                    // For newly created sections, the active tab state will be set by the section's own initialization
                }, 150);
            }
            
            // Update active link immediately
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
    
    // Add elements to navigation bar
    navbar.appendChild(logo);
    navbar.appendChild(navLinks);
    
    // Create header element and add navigation bar
    const header = document.createElement('header');
    header.appendChild(navbar);
    
    // Add header to the top of the page
    document.body.insertBefore(header, document.body.firstChild);
    
    // Set home link as active by default
    const homeLink = document.querySelector('.nav-links a:first-child');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Create and show home section by default
    let homeSection = document.getElementById('home');
    if (!homeSection) {
        // If home section doesn't exist, create it
        homeSection = document.createElement('section');
        homeSection.id = 'home';
        homeSection.className = 'content-section active';
        
        // Add content to home section
        homeSection.innerHTML = '';
        const homeContentDiv = document.createElement('div');
        homeContentDiv.id = 'home-content';
        homeSection.appendChild(homeContentDiv);
        
        // Add to main content area
        let mainContent = document.getElementById('main-content');
        if (!mainContent) {
            mainContent = document.querySelector('#main-content .content-wrapper');
        }
        if (!mainContent) {
            mainContent = document.querySelector('.content-wrapper');
        }
        if (!mainContent) {
            mainContent = document.body;
        }
        mainContent.appendChild(homeSection);
    } else {
        homeSection.classList.add('active');
    }
    
    // Load home content
    if (typeof loadHomeContent === 'function') {
        loadHomeContent();
    }
    
    // Create language switch after navigation bar is created
    if (typeof createLanguageSwitch === 'function') {
        createLanguageSwitch();
    }
    
    // Handle window resize to reposition language switch
    let resizeTimeout;
    window.addEventListener('resize', function() {
        // Clear any existing timeout to prevent multiple rapid executions
        clearTimeout(resizeTimeout);
        
        // Set a new timeout to execute after resizing stops
        resizeTimeout = setTimeout(function() {
            // Get current orientation
            const isPortrait = window.innerWidth <= 768 && window.matchMedia('(orientation: portrait)').matches;
            const isLandscape = window.innerWidth <= 768 && window.matchMedia('(orientation: landscape)').matches;
            
            // Get existing elements
            const existingLangSwitch = document.querySelector('.language-switch');
            const existingLangContainer = document.querySelector('.language-switch-container');
            const navbar = document.querySelector('.navbar');
            
            if (!navbar || !existingLangSwitch) return;
            
            // For portrait mode, ensure language switch is in its own container between logo and nav links
            if (isPortrait) {
                // If container doesn't exist, create it
                if (!existingLangContainer) {
                    const langSwitchContainer = document.createElement('div');
                    langSwitchContainer.className = 'language-switch-container';
                    
                    // Get logo and nav links
                    const logo = navbar.querySelector('.logo');
                    const navLinks = navbar.querySelector('.nav-links');
                    
                    if (logo && navLinks) {
                        // Insert container between logo and nav links
                        navbar.insertBefore(langSwitchContainer, navLinks);
                        // Move language switch to container
                        langSwitchContainer.appendChild(existingLangSwitch);
                    }
                } else if (!existingLangContainer.contains(existingLangSwitch)) {
                    // If container exists but doesn't contain the switch, move it
                    existingLangContainer.appendChild(existingLangSwitch);
                }
            } 
            // For landscape mode or desktop, ensure language switch is part of nav links
            else {
                // Remove container if it exists
                if (existingLangContainer) {
                    existingLangContainer.remove();
                }
                
                // Get nav links
                const navLinks = navbar.querySelector('.nav-links');
                if (navLinks && !navLinks.contains(existingLangSwitch)) {
                    // Add language switch to nav links
                    navLinks.appendChild(existingLangSwitch);
                }
            }
        }, 300); // Wait 300ms after resize stops before executing
    });
}

// Create navigation bar when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createNavbar);
} else {
    createNavbar();
}