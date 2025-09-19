// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-19

// Page layout distribution.js
// Divide the page into three parts: nav main-content and footer with 1/10 margin on each side
// Chinese text inherits English structure, only differs in nouns and data introduction

// Page layout initialization
document.addEventListener('DOMContentLoaded', function() {
  // Apply layout styles
  applyLayoutStyles();
  
  // Create page structure
  createPageStructure();
  
  // Update footer text after language is initialized
  setTimeout(() => {
    const footer = document.getElementById('footer');
    if (footer) {
      const footerText = footer.querySelector('p');
      if (footerText) {
        footerText.innerHTML = getText('copyright');
      }
    }
  }, 100);
});

// Create page structure
function createPageStructure() {
  // Create main content area
  const mainContent = document.createElement('div');
  mainContent.id = 'main-content';
  
  // Create content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'content-wrapper';
  
  // Create initial home section
  const homeSection = document.createElement('section');
  homeSection.id = 'home';
  homeSection.className = 'content-section active';
  homeSection.innerHTML = loadHomeContent();
  contentWrapper.appendChild(homeSection);
  
  mainContent.appendChild(contentWrapper);
  document.body.appendChild(mainContent);
  
  // Create footer
  const footer = document.createElement('footer');
  footer.id = 'footer';
  footer.innerHTML = `<p>${getText('copyright')}</p>`;
  document.body.appendChild(footer);
}

// Apply layout styles
function applyLayoutStyles() {
  // Add CSS styles to the page
  const style = document.createElement('style');
  style.textContent = `
    /* Reset default styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    /* Overall page layout */
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding-top: 80px; /* Space for fixed navigation bar */
      padding-left: 10%; /* 1/10 margin on left side */
      padding-right: 10%; /* 1/10 margin on right side */
    }
    
    /* Main content area styles */
    #main-content {
      flex: 1; /* Occupies all available space */
      background-color: transparent;
      padding: 20px 0; /* Remove horizontal padding to maintain 1/10 margin */
      overflow-y: auto;
      width: 100%;
    }
    
    .content-wrapper {
      min-height: 100%;
      max-width: 100%;
      margin: 0 auto;
    }
    
    /* Footer styles */
    #footer {
      height: 50px;
      background-color: #0a1429;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      padding: 0 10%;
      z-index: 999;
    }
    
    /* Language switch button styles */
    .language-switch {
      background-color: #0a1429;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 15px;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    
    .language-switch:hover {
      background-color: #1a2439;
    }
    
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      background-color: #0a1429;
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      z-index: 1000;
    }
    
    .logo {
      display: flex;
      align-items: center;
      font-weight: bold;
    }
    
    .nav-links {
      display: flex;
      align-items: center;
    }
    
    .nav-links a {
      color: white;
      text-decoration: none;
      margin: 0 15px;
      padding: 5px 0;
      position: relative;
    }
    
    .nav-links a.active {
      font-weight: bold;
    }
    
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: white;
    }
  `;
  
  document.head.appendChild(style);
}