// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-19

// Theme management module
// Chinese text inherits English structure, only differs in nouns and data introduction

// Initialize theme variable
let currentTheme = 'dark';

// Function to get current theme
function getCurrentTheme() {
    return currentTheme;
}

// Function to set current theme
function setTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
        currentTheme = theme;
        localStorage.setItem('preferredTheme', theme);
        
        // Apply theme to the document
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        }
        
        // Update theme switch button text
        updateThemeSwitchButton();
    }
}

// Function to toggle theme
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition effect to theme switch button
    const themeSwitch = document.querySelector('.theme-switch');
    if (themeSwitch) {
        themeSwitch.style.transition = 'opacity 0.3s ease';
        themeSwitch.style.opacity = '0.5';
        themeSwitch.disabled = true; // Disable button during transition
    }
    
    setTheme(newTheme);
    
    // Restore button after transition
    setTimeout(() => {
        if (themeSwitch) {
            themeSwitch.style.opacity = '1';
            themeSwitch.disabled = false;
        }
    }, 300);
}

// Function to update theme switch button text
function updateThemeSwitchButton() {
    const themeSwitch = document.querySelector('.theme-switch');
    if (themeSwitch) {
        if (currentTheme === 'dark') {
            // Show sun icon for light theme (white sun)
            themeSwitch.innerHTML = '<i class="fas fa-sun" style="color: white;"></i>';
        } else {
            // Show moon icon for dark theme (black moon)
            themeSwitch.innerHTML = '<i class="fas fa-moon" style="color: black;"></i>';
        }
    }
}

// Function to create theme switch button
function createThemeSwitch() {
    // Check if theme switch already exists
    if (document.querySelector('.theme-switch')) {
        return;
    }

    // Create theme switch button
    const themeSwitch = document.createElement('button');
    themeSwitch.className = 'theme-switch';
    
    // Set initial icon based on current theme
    if (currentTheme === 'dark') {
        // Show sun icon for light theme (white sun)
        themeSwitch.innerHTML = '<i class="fas fa-sun" style="color: white;"></i>';
    } else {
        // Show moon icon for dark theme (black moon)
        themeSwitch.innerHTML = '<i class="fas fa-moon" style="color: black;"></i>';
    }
    
    // Add click event to toggle theme
    themeSwitch.addEventListener('click', toggleTheme);
    
    // Add to navigation bar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Check if switch buttons container already exists
        let switchContainer = document.querySelector('.switch-buttons-container');
        
        if (!switchContainer) {
            // Create a container for both switches
            switchContainer = document.createElement('div');
            switchContainer.className = 'switch-buttons-container';
            
            // For mobile view, place container between logo and nav links
            if (window.innerWidth <= 768) {
                const logo = navbar.querySelector('.logo');
                const navLinks = navbar.querySelector('.nav-links');
                
                if (logo && navLinks) {
                    // Insert container between logo and nav links
                    navbar.insertBefore(switchContainer, navLinks);
                } else {
                    // Fallback: append to navbar
                    navbar.appendChild(switchContainer);
                }
            } else {
                // For desktop view, add container to nav links
                const navLinks = navbar.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.appendChild(switchContainer);
                } else {
                    // Fallback: append to navbar
                    navbar.appendChild(switchContainer);
                }
            }
        }
        
        // Add theme switch to the container
        switchContainer.appendChild(themeSwitch);
    }
}

// Initialize theme from localStorage or default to dark
function initializeTheme() {
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        currentTheme = savedTheme;
    } else {
        // Default to dark theme
        currentTheme = 'dark';
        localStorage.setItem('preferredTheme', 'dark');
    }
    
    // Apply the initial theme
    setTheme(currentTheme);
}

// Initialize theme system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    createThemeSwitch();
});

// Export functions for use in other modules
window.getCurrentTheme = getCurrentTheme;
window.setTheme = setTheme;
window.toggleTheme = toggleTheme;