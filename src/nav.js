// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-29

// Navigation functionality
// English text structure is used across all languages
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
    
    // 添加默认内容，确保导航栏始终可见
    if (getCurrentLanguage() === 'en') {
        logo.innerHTML = `<img src="images/homepage/favicon/favicon.ico" alt="Logo" style="height: 32px; margin-right: 10px;"><span>Home</span>`;
        
        fetch('configs/en/info.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                logo.innerHTML = `<img src="images/homepage/favicon/favicon.ico" alt="Logo" style="height: 32px; margin-right: 10px;"><span>${data.name}</span>`;
            })
            .catch(error => {
                console.error('Error loading name:', error);
                // 保持默认内容不变
            });  
    } else {
        logo.innerHTML = `<img src="images/homepage/favicon/favicon.ico" alt="Logo" style="height: 32px; margin-right: 10px;"><span>主页</span>`;
        
        fetch('configs/zh/info.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                logo.innerHTML = `<img src="images/homepage/favicon/favicon.ico" alt="Logo" style="height: 32px; margin-right: 10px;"><span>${data.name}</span>`;
            })
            .catch(error => {
                console.error('Error loading name:', error);
                // 保持默认内容不变
            });  
    }

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
            // Prevent default action
            e.preventDefault();
            
            // Update active link immediately
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
            
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
            
            // Get all sections and the target section
            const sections = document.querySelectorAll('.content-section');
            let targetSection = document.getElementById(targetId);
            
            // If target section doesn't exist, create it
            if (!targetSection) {
                targetSection = document.createElement('section');
                targetSection.id = targetId;
                targetSection.className = 'content-section';
                
                // Add specific content based on section using the new functions
                switch(targetId) {
                    case 'home':
                        targetSection.innerHTML = '';
                        targetSection.appendChild(document.createElement('div')).id = 'home-content';
                        break;
                    case 'experiences':
                        targetSection.innerHTML = loadExperiencesContent();
                        break;
                    case 'publications':
                        targetSection.innerHTML = loadPublicationsContent();
                        break;
                    case 'cv':
                        targetSection.innerHTML = loadCVContent();
                        // Initialize CV generator button after a short delay to ensure DOM is updated
                        setTimeout(() => {
                            if (typeof initCVGenerator === 'function') {
                                initCVGenerator();
                            }
                        }, 100);
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
            }
            
            // Hide all sections with a fade out effect
            sections.forEach(section => {
                if (section !== targetSection) {
                    section.style.opacity = '0';
                    setTimeout(() => {
                        section.classList.remove('active');
                    }, 300);
                }
            });
            
            // Show the target section with a fade in effect
            setTimeout(() => {
                // Only update section content language if the section already exists and has content
                // This prevents reloading content when switching to a newly created section
                if (targetSection && targetSection.children.length > 0 && targetId !== 'home') {
                    updateSectionContentLanguage(targetId);
                }
                
                // Load specific content based on section
                if (targetId === 'home' && typeof loadHomeContent === 'function') {
                    targetSection.innerHTML = loadHomeContent();
                }
                
                // Add active class and set opacity for fade in effect
                targetSection.classList.add('active');
                targetSection.style.opacity = '0';
                
                // Reset to default tab for experiences and publications sections
                if (targetId === 'experiences' || targetId === 'publications') {
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
                            activeTabStates[targetId] = tabId;
                        }
                    }
                }
                
                // Fade in the target section
    requestAnimationFrame(() => {
        targetSection.style.opacity = '1';
        
        // Don't trigger a reflow to avoid page reload
        // setTimeout(() => {
        //     // Force a reflow on the entire section to ensure all floating elements are properly rendered
        //     targetSection.style.display = 'none';
        //     targetSection.offsetHeight; // Trigger reflow
        //     targetSection.style.display = '';
        // }, 300);
    });
            }, 300);
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
        
        // Create main content wrapper if it doesn't exist
        let mainContent = document.getElementById('main-content');
        if (!mainContent) {
            mainContent = document.createElement('main');
            mainContent.id = 'main-content';
            document.body.appendChild(mainContent);
        }
        
        // Add home section to main content
        mainContent.appendChild(homeSection);
    } else {
        homeSection.classList.add('active');
    }
    
    // Load home content
    if (typeof loadHomeContent === 'function') {
        homeSection.innerHTML = loadHomeContent();
    }
    
    // Create theme switch after navigation bar is created
    if (typeof createThemeSwitch === 'function') {
        createThemeSwitch();
    }
    
    // Handle window resize to reposition language switch
let resizeTimeout;
window.addEventListener('resize', function() {
    // Clear any existing timeout to prevent multiple rapid executions
    clearTimeout(resizeTimeout);
    
    // Set a new timeout to execute after resizing stops
    resizeTimeout = setTimeout(function() {
        // Get current viewport width and determine layout mode
        const isMobile = window.innerWidth <= 768;
        const isPortrait = window.innerHeight > window.innerWidth;
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) return;
        
        // Get existing elements
        const existingLangSwitch = document.querySelector('.language-switch');
        const existingLangContainer = document.querySelector('.language-switch-container');
        const existingThemeSwitch = document.querySelector('.theme-switch');
        const existingThemeContainer = document.querySelector('.theme-switch-container');
        const existingSwitchContainer = document.querySelector('.switch-buttons-container');
        
        // Clean up old containers
        if (existingLangContainer) {
            existingLangContainer.remove();
        }
        if (existingThemeContainer) {
            existingThemeContainer.remove();
        }
        
        // For mobile mode
        if (isMobile) {
            // Get logo and nav links
            const logo = navbar.querySelector('.logo');
            const navLinks = navbar.querySelector('.nav-links');
            
            // Remove switch container from nav links if it exists there
            if (existingSwitchContainer && navLinks && navLinks.contains(existingSwitchContainer)) {
                navLinks.removeChild(existingSwitchContainer);
            }
            
            // Create or get switch container
            let switchContainer = existingSwitchContainer;
            if (!switchContainer) {
                switchContainer = document.createElement('div');
                switchContainer.className = 'switch-buttons-container';
                // Ensure the container has the correct styles for mobile
                switchContainer.style.width = '100vw';
                switchContainer.style.maxWidth = '100vw';
                switchContainer.style.display = 'flex';
                switchContainer.style.justifyContent = 'center';
                switchContainer.style.boxSizing = 'border-box';
                switchContainer.style.margin = '0';
                switchContainer.style.left = '0';
                switchContainer.style.right = '0';
            }
            
            // Ensure container is positioned correctly for mobile
            if (logo && navLinks && !navbar.contains(switchContainer)) {
                navbar.insertBefore(switchContainer, navLinks);
            } else if (!navbar.contains(switchContainer)) {
                // Fallback: append to navbar
                navbar.appendChild(switchContainer);
            } else {
                // If container already exists but might be in wrong position, ensure it's between logo and navLinks
                if (logo && navLinks && (switchContainer.previousElementSibling !== logo || switchContainer.nextElementSibling !== navLinks)) {
                    navbar.removeChild(switchContainer);
                    navbar.insertBefore(switchContainer, navLinks);
                }
            }
            
            // Move language switch to the container if it's not already there
            if (existingLangSwitch && !switchContainer.contains(existingLangSwitch)) {
                // Remove from nav links if it's there
                if (navLinks && navLinks.contains(existingLangSwitch)) {
                    navLinks.removeChild(existingLangSwitch);
                }
                switchContainer.appendChild(existingLangSwitch);
            }
            
            // Move theme switch to the container if it exists and not already there
            if (existingThemeSwitch && !switchContainer.contains(existingThemeSwitch)) {
                // Remove from nav links if it's there
                if (navLinks && navLinks.contains(existingThemeSwitch)) {
                    navLinks.removeChild(existingThemeSwitch);
                }
                switchContainer.appendChild(existingThemeSwitch);
            }
            
            // Don't force reflow to ensure styles are applied correctly
            // navbar.offsetHeight;
        } 
        // For desktop mode
        else {
            // Remove switch container from navbar if it exists there
            if (existingSwitchContainer && navbar.contains(existingSwitchContainer)) {
                navbar.removeChild(existingSwitchContainer);
            }
            
            // Get nav links
            const navLinks = navbar.querySelector('.nav-links');
            if (navLinks) {
                // Create or get switch container
                let switchContainer = existingSwitchContainer;
                if (!switchContainer) {
                    switchContainer = document.createElement('div');
                    switchContainer.className = 'switch-buttons-container';
                }
                
                // Ensure container is positioned correctly for desktop
                if (!navLinks.contains(switchContainer)) {
                    navLinks.appendChild(switchContainer);
                }
                
                // Move language switch to the container if it's not already there
                if (existingLangSwitch && !switchContainer.contains(existingLangSwitch)) {
                    // Remove from navbar if it's there
                    if (navbar.contains(existingLangSwitch)) {
                        navbar.removeChild(existingLangSwitch);
                    }
                    switchContainer.appendChild(existingLangSwitch);
                }
                
                // Move theme switch to the container if it exists and not already there
                if (existingThemeSwitch && !switchContainer.contains(existingThemeSwitch)) {
                    // Remove from navbar if it's there
                    if (navbar.contains(existingThemeSwitch)) {
                        navbar.removeChild(existingThemeSwitch);
                    }
                    switchContainer.appendChild(existingThemeSwitch);
                }
                
                // Don't force reflow to ensure styles are applied correctly
                // navLinks.offsetHeight;
            }
        }
    }, 300); // Wait 300ms after resize stops before executing
});
}

// Create navigation bar when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Wait for content to be ready before creating the navigation bar
        document.addEventListener('contentReady', function(event) {
            console.log('Content is ready, creating navigation bar...');
            createNavbar();
        });
    });
} else {
    // Wait for content to be ready before creating the navigation bar
    document.addEventListener('contentReady', function(event) {
        console.log('Content is ready, creating navigation bar...');
        createNavbar();
    });
}