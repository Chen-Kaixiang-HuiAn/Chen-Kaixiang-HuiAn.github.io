// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-19

// Language management module

// Initialize language variable
let currentLanguage = 'en';

// Global object to store preloaded content
let preloadedContent = {
    en: {},
    zh: {}
};

// Flag to track if content is preloaded
let isContentPreloaded = false;

// Load configuration from config.json
async function loadConfig() {
    try {
        const response = await fetch('configs/config.json');
        const config = await response.json();
        
        // Remove language switch button in single language mode
        if (config.singleLanguageMode) {
            const langBtn = document.querySelector('.language-switch');
            if (langBtn) {
                langBtn.remove();
            }
        }
        
        // Set language from config
        if (config.defaultLanguage) {
            currentLanguage = config.defaultLanguage;
            updateLanguageContent();
        }
    } catch (error) {
        console.warn('Could not load config.json, using default language settings');
    }
}

// Function to preload all content for both languages
async function preloadAllContent() {
    if (isContentPreloaded) return;
    
    try {
        // Preload info content
        await Promise.all([
            fetch('configs/en/info.json').then(res => res.json()).then(data => { preloadedContent.en.info = data; }),
            fetch('configs/zh/info_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.info = data; })
        ]);
        
        // Preload intro content
        await Promise.all([
            fetch('configs/en/intro.txt').then(res => res.text()).then(data => { preloadedContent.en.intro = data; }),
            fetch('configs/zh/intro_zh.txt').then(res => res.text()).then(data => { preloadedContent.zh.intro = data; })
        ]);
        
        // Preload news content
        await Promise.all([
            fetch('configs/en/news.json').then(res => res.json()).then(data => { preloadedContent.en.news = data; }),
            fetch('configs/zh/news_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.news = data; })
        ]);
        
        // Preload experiences content
        await Promise.all([
            fetch('configs/en/experiences.json').then(res => res.json()).then(data => { preloadedContent.en.experiences = data; }),
            fetch('configs/zh/experiences_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.experiences = data; })
        ]);
        
        // Preload honors content
        await Promise.all([
            fetch('configs/en/honors.json').then(res => res.json()).then(data => { preloadedContent.en.honors = data; }),
            fetch('configs/zh/honors_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.honors = data; })
        ]);
        
        // Preload teaching content
        await Promise.all([
            fetch('configs/en/teaching.json').then(res => res.json()).then(data => { preloadedContent.en.teaching = data; }),
            fetch('configs/zh/teaching_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.teaching = data; })
        ]);
        
        // Preload reviewer content
        await Promise.all([
            fetch('configs/en/reviewer.json').then(res => res.json()).then(data => { preloadedContent.en.reviewer = data; }),
            fetch('configs/zh/reviewer_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.reviewer = data; })
        ]);
        
        // Preload papers content
        await Promise.all([
            fetch('configs/en/papers.json').then(res => res.json()).then(data => { preloadedContent.en.papers = data; }),
            fetch('configs/zh/papers_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.papers = data; })
        ]);
        
        // Preload patents content
        await Promise.all([
            fetch('configs/en/patents.json').then(res => res.json()).then(data => { preloadedContent.en.patents = data; }),
            fetch('configs/zh/patents_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.patents = data; })
        ]);
        
        // Preload CV content (PDF URLs)
        preloadedContent.cv = {
            en: {
                pdfUrl: 'configs/en/cv.pdf',
                downloadUrl: 'configs/en/cv.pdf'
            },
            zh: {
                pdfUrl: 'configs/zh/cv_zh.pdf',
                downloadUrl: 'configs/zh/cv_zh.pdf'
            }
        };
        
        isContentPreloaded = true;
        console.log('All content preloaded successfully');
    } catch (error) {
        console.error('Error preloading content:', error);
        // If preloading fails, we'll fall back to the original behavior
        isContentPreloaded = false;
    }
}

// Initialize configuration when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadConfig();
    // Start preloading content after a short delay to not block initial page load
    setTimeout(preloadAllContent, 500);
});

// Language Texts - Chinese text inherits English structure, only differs in nouns and data introduction
const languageTexts = {
    en: {
        // Navigation
        home: 'Home',
        experiences: 'Experiences',
        publications: 'Publications',
        patents: 'Patents',
        news: 'News',
        cv: 'CV',
        
        // Sections
        institutionExperiences: 'Institution Experiences',
        academicPapers: 'Academic Papers',
        otherPublications: 'Other Publications',
        honorsAndAwards: 'Honors and Awards',
        teaching: 'Teaching',
        reviewer: 'Reviewer',
        curriculumVitae: 'Curriculum Vitae',
        education: 'Education',
        professionalExperience: 'Professional Experience',
        skills: 'Skills',
        aboutMe: 'About Me',
        
        // Personal Info
        googleScholar: 'Google Scholar',
        github: 'GitHub',
        
        // Common
        downloadFullCV: 'Download Full CV',
        welcome: 'Welcome to ',
        homepage: 'homepage!',
        researchContentComingSoon: 'Research content coming soon...',
        paper: 'Paper',
        code: 'Code',
        video: 'Video',
        site: 'Site',
        copyright: '&copy; 2025 Excursion ConsHein. Powered by <a href="https://www.jekyll.com/" target="_blank">Jekyll</a>.',
        abstract: 'Abstract:',
        company: 'Company:',
        organization: 'Organization:',
        latest: 'Latest',
        
        // Language
        language: '中文'
    },
    zh: {
        // Navigation - Inherits English structure, only translates navigation items
        home: '主页',
        experiences: '经历',
        publications: '出版物',
        patents: '专利',
        news: '新闻动态',
        cv: '简历',
        
        // Sections - Inherits English structure, only translates some key nouns
        institutionExperiences: '院校经历',
        academicPapers: '学术论文',
        otherPublications: '其他出版物',
        honorsAndAwards: '荣誉奖项',
        teaching: '教学经历',
        reviewer: '审稿经历',
        curriculumVitae: '个人简历',
        education: '教育背景',
        professionalExperience: '工作经历',
        skills: '技能',
        aboutMe: '个人简介',
        
        // Personal Info - Inherits English structure, only translates labels
        googleScholar: 'Google Scholar',
        github: 'GitHub',
        
        // Common - Inherits English structure, only translates some common words
        downloadFullCV: '下载完整简历',
        welcome: '欢迎来到',
        homepage: '的主页！',
        researchContentComingSoon: '研究内容即将推出...',
        paper: '论文',
        code: '代码',
        video: '视频',
        site: '网站',
        copyright: '&copy; 2025 Excursion ConsHein. 由 <a href="https://www.jekyll.com.cn/" target="_blank">Jekyll</a> 提供支持。',
        abstract: '摘要：',
        company: '公司：',
        organization: '组织：',
        latest: '最新',
        
        // Language - Inherits English structure, only translates some key nouns
        language: 'English'
    }
};

// Global variables to store active tab states
let activeTabStates = {
  experiences: 'institution-experiences',
  publications: 'academic-papers'
};

// Function to get current language
function getCurrentLanguage() {
    return currentLanguage;
}

// Function to set current language
function setLanguage(lang) {
    if (lang === 'en' || lang === 'zh') {
        // Store the previous language for comparison
        const previousLanguage = currentLanguage;
        
        // Only proceed if language actually changed
        if (previousLanguage === lang) {
            return;
        }
        
        // Get the active section
        const activeSection = document.querySelector('.content-section.active');
        
        // If there's an active section, apply fade out effect
        if (activeSection) {
            // Add fade out effect to the active section
            activeSection.style.transition = 'opacity 0.4s ease';
            activeSection.style.opacity = '0';
            
            // After fade out, change language and prepare content
            setTimeout(() => {
                // Set the new language
                currentLanguage = lang;
                localStorage.setItem('preferredLanguage', lang);
                
                // Set html lang attribute for CSS selectors
                document.documentElement.lang = lang;
                
                // Update UI language elements
                updateUILanguage();
                
                // Reload content for the active section
                reloadContent();
                
                // Wait a bit longer for translation to complete, then fade in
                setTimeout(() => {
                    // Use requestAnimationFrame for smoother transition
                    requestAnimationFrame(() => {
                        activeSection.style.transition = 'opacity 0.4s ease';
                        activeSection.style.opacity = '1';
                    });
                }, 300); // Increased delay for translation to complete
            }, 400); // Wait for fade out to complete
        } else {
            // No active section, just change language directly
            currentLanguage = lang;
            localStorage.setItem('preferredLanguage', lang);
            
            // Set html lang attribute for CSS selectors
            document.documentElement.lang = lang;
            
            updateUILanguage();
            reloadContent();
        }
    }
}

// Variable to track if language switch is in progress
let isLanguageSwitchInProgress = false;

// Function to toggle language
function toggleLanguage() {
    // Prevent multiple rapid clicks
    if (isLanguageSwitchInProgress) {
        return;
    }
    
    // Set flag to indicate language switch is in progress
    isLanguageSwitchInProgress = true;
    
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    
    // Add transition effect to language switch button
    const langSwitch = document.querySelector('.language-switch');
    if (langSwitch) {
        langSwitch.style.transition = 'opacity 0.3s ease';
        langSwitch.style.opacity = '0.5';
        langSwitch.disabled = true; // Disable button during transition
    }
    
    setLanguage(newLang);
    
    // Restore button after transition and reset flag
    setTimeout(() => {
        if (langSwitch) {
            langSwitch.style.opacity = '1';
            langSwitch.disabled = false;
        }
        // Reset flag to allow language switching again
        isLanguageSwitchInProgress = false;
    }, 800); // Wait for language change to complete (increased to match new timing)
}

// Function to get text in current language
function getText(key, language = null) {
    const lang = language || currentLanguage;
    return languageTexts[lang][key] || key;
}

// Function to get preloaded content
function getPreloadedContent(contentType, language = null) {
    const lang = language || currentLanguage;
    if (isContentPreloaded && preloadedContent[lang] && preloadedContent[lang][contentType]) {
        return preloadedContent[lang][contentType];
    }
    return null;
}

// Function to get config file path based on current language
function getConfigPath(filename, extension) {
    const langPrefix = currentLanguage === 'zh' ? 'zh/' : 'en/';
    const filePrefix = currentLanguage === 'zh' ? '_zh' : '';
    const ext = extension || (filename.includes('.') ? '' : '.json');
    return `configs/${langPrefix}${filename}${filePrefix}${ext}`;
}

// Function to update UI language elements
function updateUILanguage() {
    // Cache DOM elements to reduce queries
    const elements = {
        title: document.title,
        navLinks: document.querySelectorAll('.nav-links a'),
        langSwitch: document.querySelector('.language-switch'),
        aboutTitle: document.querySelector('.intro-section h3'),
        newsTitle: document.querySelector('.news-section h3')
    };
    
    // Update page title with name from info config
    const lang = getCurrentLanguage();
    const infoPath = lang === 'zh' ? 'info_zh.json' : 'info.json';
    fetch(`configs/${lang}/${infoPath}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.name) {
          document.title = data.name;
        } else {
          document.title = getText('pageTitle'); // fallback
        }
      })
      .catch(() => {
        document.title = getText('pageTitle'); // fallback
      });
    
    // Update navigation links
    if (elements.navLinks.length >= 4) {
        elements.navLinks[0].textContent = getText('home');
        elements.navLinks[1].textContent = getText('experiences');
        elements.navLinks[2].textContent = getText('publications');
        elements.navLinks[3].textContent = getText('cv');
    }

    // Update language switch button
    if (elements.langSwitch) {
        elements.langSwitch.textContent = getText('language');
    }

    // Update section titles
    if (elements.aboutTitle) elements.aboutTitle.textContent = getText('aboutMe');
    if (elements.newsTitle) elements.newsTitle.textContent = getText('news');
    
    // Update footer copyright text
    const footer = document.getElementById('footer');
    if (footer) {
        // Try to find the paragraph element first
        const footerText = footer.querySelector('p');
        if (footerText) {
            footerText.innerHTML = getText('copyright');
        } else {
            // If no paragraph element exists, create one
            footer.innerHTML = `<p>${getText('copyright')}</p>`;
        }
    }
}

/**
 * Update the content language for a specific section
 * @param {string} sectionId - The ID of the section to update
 */
function updateSectionContentLanguage(sectionId) {
  // Update if the section exists
  const section = document.getElementById(sectionId);
  if (!section) {
    return;
  }
  
  // Get the current language
  const lang = getCurrentLanguage();
  
  // Update section content based on section ID
  switch(sectionId) {
    case 'experiences':
      // Update section title
      const expTitle = section.querySelector('.section-title h2');
      if (expTitle) {
        expTitle.textContent = getText('experiences');
      }
      
      // Update tab titles
      const expTabButtons = section.querySelectorAll('.tab-button');
      if (expTabButtons.length >= 4) {
        expTabButtons[0].textContent = getText('institutionExperiences');
        expTabButtons[1].textContent = getText('honorsAndAwards');
        expTabButtons[2].textContent = getText('teaching');
        expTabButtons[3].textContent = getText('reviewer');
      }
      
      // Reload modules with current language
      const expInstitutionContainer = document.getElementById('institution-experiences-modules-container');
      if (expInstitutionContainer && typeof loadInstitutionExperiencesModules === 'function') {
        // Reset tab button visibility before reloading
        const institutionTab = document.querySelector('.tab-button[data-tab="institution-experiences"]');
        if (institutionTab) {
          institutionTab.style.display = '';
        }
        loadInstitutionExperiencesModules('institution-experiences-modules-container', lang);
      }
      
      const expHonorsContainer = document.getElementById('honors-awards-modules-container');
      if (expHonorsContainer && typeof loadHonorsAwardsModules === 'function') {
        // Reset tab button visibility before reloading
        const honorsTab = document.querySelector('.tab-button[data-tab="honors-awards"]');
        if (honorsTab) {
          honorsTab.style.display = '';
        }
        loadHonorsAwardsModules('honors-awards-modules-container', lang);
      }
      
      const expTeachingContainer = document.getElementById('teaching-modules-container');
      if (expTeachingContainer && typeof loadTeachingModules === 'function') {
        // Reset tab button visibility before reloading
        const teachingTab = document.querySelector('.tab-button[data-tab="teaching"]');
        if (teachingTab) {
          teachingTab.style.display = '';
        }
        loadTeachingModules('teaching-modules-container', lang);
      }
      
      const expReviewerContainer = document.getElementById('reviewer-modules-container');
      if (expReviewerContainer && typeof loadReviewerModules === 'function') {
        // Reset tab button visibility before reloading
        const reviewerTab = document.querySelector('.tab-button[data-tab="reviewer"]');
        if (reviewerTab) {
          reviewerTab.style.display = '';
        }
        loadReviewerModules('reviewer-modules-container', lang);
      }
      break;
      
    case 'publications':
      // Update section title
      const pubTitle = section.querySelector('.section-title h2');
      if (pubTitle) {
        pubTitle.textContent = getText('publications');
      }
      
      // Update tab titles
      const pubTabButtons = section.querySelectorAll('.tab-button');
      if (pubTabButtons.length >= 2) {
        pubTabButtons[0].textContent = getText('academicPapers');
        pubTabButtons[1].textContent = getText('patents');
      }
      
      // Reload modules with current language
      const pubContainer = document.getElementById('academic-papers-modules-container');
      if (pubContainer && typeof loadAcademicPapersModules === 'function') {
        loadAcademicPapersModules('academic-papers-modules-container', lang);
      }
      
      const patentsContainer = document.getElementById('patents-modules-container');
      if (patentsContainer && typeof window.loadPatentsModules === 'function') {
        window.loadPatentsModules('patents-modules-container', lang);
      }
      break;
      
    case 'cv':
      // Update section title
      const cvTitle = section.querySelector('.section-title h2');
      if (cvTitle) {
        cvTitle.textContent = getText('curriculumVitae');
      }
      
      // Update download button text
      const cvDownloadBtn = section.querySelector('.cv-download-container .btn');
      if (cvDownloadBtn) {
        cvDownloadBtn.textContent = getText('downloadFullCV');
        // Update download link href based on current language
        const timestamp = new Date().getTime(); // Add timestamp to prevent caching
        const newHref = currentLanguage === 'zh' 
          ? `configs/zh/cv_zh.pdf?t=${timestamp}`
          : `configs/en/cv.pdf?t=${timestamp}`;
        cvDownloadBtn.setAttribute('href', newHref);
      }
      
      // Clear PDF viewer before refreshing to prevent caching issues
      const pdfObject = document.getElementById('cv-pdf-object');
      if (pdfObject) {
        // First, completely clear the current PDF
        pdfObject.setAttribute('data', '');
        
        // Refresh PDF viewer after a delay to ensure proper clearing
        if (typeof refreshPDFViewer === 'function') {
          setTimeout(() => {
            refreshPDFViewer();
          }, 200); // Increased delay to ensure proper clearing
        }
      }
      break;
      
    case 'home':
      // Let home.js handle the fade effect to avoid conflicts
      // Just reload the content without fade effects
      if (typeof loadPersonalInfo === 'function') {
          loadPersonalInfo();
      }
      if (typeof loadIntroContent === 'function') {
          loadIntroContent();
      }
      if (typeof loadWelcomeMessage === 'function') {
          loadWelcomeMessage();
      }
      if (typeof loadNewsContent === 'function') {
          loadNewsContent();
      }
      break;
  }
}

/**
 * Reload content based on the current language
 * This function updates all sections content, not just the active one
 */
function reloadContent() {
  // Update all sections, not just the active one
  const allSections = document.querySelectorAll('.content-section');
  
  allSections.forEach(section => {
    const sectionId = section.id;
    if (sectionId) {
      // Use the centralized function to update section content
      // We need to temporarily make the section active for update, then restore its original state
      const wasActive = section.classList.contains('active');
      
      // Temporarily make it active if it's not
      if (!wasActive) {
        section.classList.add('active');
      }
      
      // Update the section content
      updateSectionContentLanguage(sectionId);
      
      // Restore original active state
      if (!wasActive) {
        section.classList.remove('active');
      }
    }
  });
  
  // After reloading content, ensure the active tab is properly displayed
  setTimeout(() => {
    // For experiences section
    const experiencesSection = document.getElementById('experiences');
    if (experiencesSection) {
      // First, reset all tab buttons visibility
      const expTabButtons = experiencesSection.querySelectorAll('.tab-button');
      expTabButtons.forEach(button => {
        button.style.display = '';
      });
      
      // Restore the previously active tab instead of resetting to default
      if (expTabButtons.length > 0) {
        // Remove active class from all tab buttons and panes
        expTabButtons.forEach(btn => btn.classList.remove('active'));
        experiencesSection.querySelectorAll('.tab-pane').forEach(pane => {
          pane.classList.remove('active');
        });
        
        // Get the previously active tab ID from stored state
        const activeTabId = activeTabStates && activeTabStates.experiences ? activeTabStates.experiences : 'institution-experiences';
        
        // Find the tab button with the stored ID
        const activeTabButton = Array.from(expTabButtons).find(btn => 
          btn.getAttribute('data-tab') === activeTabId
        );
        
        // If found, make it active, otherwise make the first tab active
        const tabToActivate = activeTabButton || expTabButtons[0];
        tabToActivate.classList.add('active');
        
        const tabId = tabToActivate.getAttribute('data-tab');
        const tabPane = experiencesSection.querySelector(`.tab-pane#${tabId}`);
        if (tabPane) {
          tabPane.classList.add('active');
        }
        
        // Update the stored state
        if (typeof activeTabStates !== 'undefined') {
          activeTabStates.experiences = tabId;
        }
      }
    }
    
    // For publications section
    const publicationsSection = document.getElementById('publications');
    if (publicationsSection) {
      // First, reset all tab buttons visibility
      const pubTabButtons = publicationsSection.querySelectorAll('.tab-button');
      pubTabButtons.forEach(button => {
        button.style.display = '';
      });
      
      // Restore the previously active tab instead of resetting to default
      if (pubTabButtons.length > 0) {
        // Remove active class from all tab buttons and panes
        pubTabButtons.forEach(btn => btn.classList.remove('active'));
        publicationsSection.querySelectorAll('.tab-pane').forEach(pane => {
          pane.classList.remove('active');
        });
        
        // Get the previously active tab ID from stored state
        const activeTabId = activeTabStates && activeTabStates.publications ? activeTabStates.publications : 'academic-papers';
        
        // Find the tab button with the stored ID
        const activeTabButton = Array.from(pubTabButtons).find(btn => 
          btn.getAttribute('data-tab') === activeTabId
        );
        
        // If found, make it active, otherwise make the first tab active
        const tabToActivate = activeTabButton || pubTabButtons[0];
        tabToActivate.classList.add('active');
        
        const tabId = tabToActivate.getAttribute('data-tab');
        const tabPane = publicationsSection.querySelector(`.tab-pane#${tabId}`);
        if (tabPane) {
          tabPane.classList.add('active');
        }
        
        // Update the stored state
        if (typeof activeTabStates !== 'undefined') {
          activeTabStates.publications = tabId;
        }
      }
    }
  }, 500); // Wait a bit for content to load
}

// Function to create language switch button
async function createLanguageSwitch() {
    // Check if single language mode is enabled
    try {
        const response = await fetch('configs/config.json');
        const config = await response.json();
        
        // Don't create language switch button in single language mode
        if (config.singleLanguageMode) {
            // Remove any existing language switch buttons
            const existingLangSwitches = document.querySelectorAll('.language-switch');
            existingLangSwitches.forEach(btn => btn.remove());
            return;
        }
    } catch (error) {
        console.warn('Could not load config.json, assuming multi-language mode');
    }

    // Remove any existing language switch buttons to prevent duplicates
    const existingLangSwitches = document.querySelectorAll('.language-switch');
    existingLangSwitches.forEach(btn => btn.remove());

    // Create language switch button
    const langSwitch = document.createElement('button');
    langSwitch.className = 'language-switch';
    langSwitch.textContent = getText('language');
    
    // Add click event to toggle language
    langSwitch.addEventListener('click', toggleLanguage);
    
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
        
        // Add language switch to the container
        switchContainer.appendChild(langSwitch);
    }
}

// Initialize language from localStorage or browser preference
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'en' || savedLanguage === 'zh') {
        currentLanguage = savedLanguage;
    } else {
        // Default to English regardless of browser language
        currentLanguage = 'en';
        // Save the default preference to localStorage
        localStorage.setItem('preferredLanguage', 'en');
    }
    
    // Set html lang attribute for CSS selectors
    document.documentElement.lang = currentLanguage;
}

// Initialize language system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    createLanguageSwitch();
    updateUILanguage();
});

// Export functions for use in other modules
window.getCurrentLanguage = getCurrentLanguage;
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;
window.getText = getText;
window.getConfigPath = getConfigPath;