// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-29

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

// Function to update language content
function updateLanguageContent() {
    updateUILanguage();
    reloadContent();
}

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
            fetch('configs/en/info.json').then(res => res.json()).then(data => { preloadedContent.en.info = data; }).catch(() => {}),
            fetch('configs/zh/info_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.info = data; }).catch(() => {})
        ]);
        
        // Preload intro content
        await Promise.all([
            fetch('configs/en/intro.txt').then(res => res.text()).then(data => { preloadedContent.en.intro = data; }).catch(() => {}),
            fetch('configs/zh/intro_zh.txt').then(res => res.text()).then(data => { preloadedContent.zh.intro = data; }).catch(() => {})
        ]);
        
        // Preload news content
        await Promise.all([
            fetch('configs/en/news.json').then(res => res.json()).then(data => { preloadedContent.en.news = data; }).catch(() => {}),
            fetch('configs/zh/news_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.news = data; }).catch(() => {})
        ]);
        
        // Preload education content
        await Promise.all([
            fetch('configs/en/education.json').then(res => res.json()).then(data => { preloadedContent.en.education = data; }).catch(() => {}),
            fetch('configs/zh/education_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.education = data; }).catch(() => {})
        ]);
        
        // Preload employment content
        await Promise.all([
            fetch('configs/en/employment.json').then(res => res.json()).then(data => { preloadedContent.en.employment = data; }).catch(() => {}),
            fetch('configs/zh/employment_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.employment = data; }).catch(() => {})
        ]);

      // Preload honors content
      await Promise.all([
          fetch('configs/en/honors.json').then(res => res.json()).then(data => { preloadedContent.en.honors = data; }).catch(() => {}),
          fetch('configs/zh/honors_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.honors = data; }).catch(() => {})
      ]);
        
        // Preload teaching content
        await Promise.all([
            fetch('configs/en/teaching.json').then(res => res.json()).then(data => { preloadedContent.en.teaching = data; }).catch(() => {}),
            fetch('configs/zh/teaching_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.teaching = data; }).catch(() => {})
        ]);
        
        // Preload reviewer content
        await Promise.all([
            fetch('configs/en/reviewer.json').then(res => res.json()).then(data => { preloadedContent.en.reviewer = data; }).catch(() => {}),
            fetch('configs/zh/reviewer_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.reviewer = data; }).catch(() => {})
        ]);
        
        // Preload papers content
        await Promise.all([
            fetch('configs/en/papers.json').then(res => res.json()).then(data => { preloadedContent.en.papers = data; }).catch(() => {}),
            fetch('configs/zh/papers_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.papers = data; }).catch(() => {})
        ]);
        
        // Preload patents content
        await Promise.all([
            fetch('configs/en/patents.json').then(res => res.json()).then(data => { preloadedContent.en.patents = data; }).catch(() => {}),
            fetch('configs/zh/patents_zh.json').then(res => res.json()).then(data => { preloadedContent.zh.patents = data; }).catch(() => {})
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
    // First, load the main configuration
    loadConfig().then(() => {
        // After config is loaded, preload all content before initializing the page
        console.log('Config loaded, preloading content...');
        return preloadAllContent();
    }).then(() => {
        console.log('Content preloaded, initializing page...');
        // After content is preloaded, initialize the page
        // Dispatch a custom event to signal that content is ready
        const contentReadyEvent = new CustomEvent('contentReady', { detail: { isPreloaded: isContentPreloaded } });
        document.dispatchEvent(contentReadyEvent);
    }).catch(error => {
        console.error('Error during initialization:', error);
        // Even if there's an error, we still need to initialize the page
        const contentReadyEvent = new CustomEvent('contentReady', { detail: { isPreloaded: false } });
        document.dispatchEvent(contentReadyEvent);
    });
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
        institutionExperiences: 'Education',
        academicPapers: 'Academic Papers',
        otherPublications: 'Other Publications',
        honorsAndAwards: 'Honors and Awards',
        teaching: 'Teaching',
        reviewer: 'Reviewer',
        curriculumVitae: 'Curriculum Vitae',
        education: 'Education',
        employment: 'Employment',
        skills: 'Skills',
        aboutMe: 'About Me',
        
        // Personal Info
        googleScholar: 'Google Scholar',
        github: 'GitHub',
        
        // Common
        downloadFullCV: 'Generate and Download Full CV',
        cvButtonText: 'Click the button above to generate and download your full CV',
        welcome: 'Welcome to ',
        homepage: 'homepage!',
        researchContentComingSoon: 'Research content coming soon...',
        paper: 'Paper',
        code: 'Code',
        video: 'Video',
        site: 'Site',
        copyright: '&copy; 2025 <a href="https://github.com/Excursion-Studio/Personal-Homepage-Template", target="_blank">Excursion Studio Personal Homepage (ESPH)</a>.',
        abstract: 'Abstract:',
        company: 'Company:',
        organization: 'Organization:',
        latest: 'Latest',
        tutor: 'Tutor:',
        dissertation: 'Dissertation:',
        project: 'Project:',
        
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
        institutionExperiences: '教育经历',
        academicPapers: '学术论文',
        otherPublications: '其他出版物',
        honorsAndAwards: '荣誉奖项',
        teaching: '教学经历',
        reviewer: '审稿经历',
        curriculumVitae: '个人简历',
        education: '教育背景',
        professionalExperience: '工作经历',
        employment: '工作经历',
        skills: '技能',
        aboutMe: '个人简介',
        
        // Personal Info - Inherits English structure, only translates labels
        googleScholar: 'Google Scholar',
        github: 'GitHub',
        
        // Common - Inherits English structure, only translates some common words
        downloadFullCV: '生成并下载完整简历',
        cvButtonText: '点击上方按钮生成并下载您的完整简历',
        welcome: '欢迎来到',
        homepage: '的主页！',
        researchContentComingSoon: '研究内容即将推出...',
        paper: '论文',
        code: '代码',
        video: '视频',
        site: '网站',
        copyright: '&copy; 2025 <a href="https://github.com/Excursion-Studio/Personal-Homepage-Template", target="_blank">远行工作室-个人主页模板 (ESPH)</a>。',
        abstract: '摘要：',
        company: '公司：',
        organization: '组织：',
        latest: '最新',
        tutor: '导师：',
        dissertation: '学位论文：',
        project: '项目：',
        
        // Language - Inherits English structure, only translates some key nouns
        language: 'English'
    }
};

// Global variables to store active tab states
let activeTabStates = {
  experiences: 'education',
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

    // Update UI language elements first to maintain UI consistency
                updateUILanguage();
                
                // Then reload content for the active section
                reloadContent();
                
                // Wait a bit longer for content to load, then fade in
                setTimeout(() => {
                    // Use requestAnimationFrame for smoother transition
                    requestAnimationFrame(() => {
                        activeSection.style.transition = 'opacity 0.4s ease';
                        activeSection.style.opacity = '1';
                    });
                }, 400); // Increased delay to ensure content is loaded before fade in
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

// Function to check and hide empty tabs
function checkAndHideEmptyTabs() {
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
    
    // Check if patents tab should be hidden
    const patentsContainer = document.getElementById('patents-modules-container');
    if (patentsContainer && patentsContainer.children.length === 0) {
        const patentsTab = document.querySelector('.tab-button[data-tab="patents"]');
        if (patentsTab) {
            patentsTab.style.display = 'none';
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
                if (activeTabStates.experiences) {
                    activeTabStates.experiences = tabId;
                } else if (activeTabStates.publications) {
                    activeTabStates.publications = tabId;
                }
            }
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
    }, 1200); // Increased wait time to ensure content is fully loaded before restoring button
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

/**
 * Get the configuration file path based on the current language
 * @param {string} configType - The type of configuration file
 * @param {string} extension - The file extension (optional, defaults to .json)
 * @returns {string} The path to the configuration file
 */
function getConfigPath(configType, extension = '.json') {
    const currentLang = getCurrentLanguage();
    const langPrefix = currentLang === 'zh' ? 'zh' : 'en';
    
    // Special handling for intro.txt files
    if (configType === 'intro') {
        return `configs/${langPrefix}/intro${currentLang === 'zh' ? '_zh' : ''}.txt`;
    }
    
    // Map configuration types to file paths
    const configPaths = {
        'education': `configs/${langPrefix}/education${currentLang === 'zh' ? '_zh' : ''}.json`,
        'employment': `configs/${langPrefix}/employment${currentLang === 'zh' ? '_zh' : ''}.json`,
        'honors': `configs/${langPrefix}/honors${currentLang === 'zh' ? '_zh' : ''}.json`,
        'teaching': `configs/${langPrefix}/teaching${currentLang === 'zh' ? '_zh' : ''}.json`,
        'reviewer': `configs/${langPrefix}/reviewer${currentLang === 'zh' ? '_zh' : ''}.json`,
        'papers': `configs/${langPrefix}/papers.json`,
        'patents': `configs/${langPrefix}/patents.json`,
        'projects': `configs/${langPrefix}/projects.json`,
        'skills': `configs/${langPrefix}/skills.json`
    };
    
    return configPaths[configType] || `configs/${langPrefix}/${configType}${extension}`;
}

// Function to update UI language elements
function updateUILanguage() {
    // Cache DOM elements to reduce queries
    const elements = {
        title: document.title,
        navLinks: document.querySelectorAll('.nav-links a'),
        langSwitch: document.querySelector('.language-switch'),
        aboutTitle: document.querySelector('.intro-section h3'),
        newsTitle: document.querySelector('.news-section h3'),
        logo: document.querySelector('.logo')
    };
    
    // Update page title with name from info config
    const lang = getCurrentLanguage();
    const infoPath = lang === 'zh' ? 'info_zh.json' : 'info.json';
    fetch(`configs/${lang}/${infoPath}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.name) {
          document.title = data.name;
          
          // Update logo content with the same name data
          if (elements.logo) {
            elements.logo.innerHTML = `<img src="images/homepage/favicon/favicon.ico" alt="Logo" style="height: 32px; margin-right: 10px;"><span>${data.name}</span>`;
          }
        } else {
          document.title = getText('pageTitle'); // fallback
          
          // Update logo with fallback text
          if (elements.logo) {
            const fallbackText = lang === 'zh' ? '主页' : 'Home';
            elements.logo.innerHTML = `<img src="images/homepage/favicon/favicon.ico" alt="Logo" style="height: 32px; margin-right: 10px;"><span>${fallbackText}</span>`;
          }
        }
      })
      .catch(() => {
        document.title = getText('pageTitle'); // fallback
        
        // Update logo with fallback text in case of error
        if (elements.logo) {
          const fallbackText = lang === 'zh' ? '主页' : 'Home';
          elements.logo.innerHTML = `<img src="images/homepage/favicon/favicon.ico" alt="Logo" style="height: 32px; margin-right: 10px;"><span>${fallbackText}</span>`;
        }
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
      if (expTabButtons.length >= 5) {
        expTabButtons[0].textContent = getText('institutionExperiences');
        expTabButtons[1].textContent = getText('employment');
        expTabButtons[2].textContent = getText('honorsAndAwards');
        expTabButtons[3].textContent = getText('teaching');
        expTabButtons[4].textContent = getText('reviewer');
      }
      
      // Reload modules with current language
      const expEducationContainer = document.getElementById('education-modules-container');
      if (expEducationContainer && typeof loadInstitutionExperiencesModules === 'function') {
        // Reset tab button visibility before reloading
        const educationTab = document.querySelector('.tab-button[data-tab="education"]');
        if (educationTab) {
          educationTab.style.display = '';
        }
        loadInstitutionExperiencesModules('education-modules-container', lang);
      }
      
      const expEmploymentContainer = document.getElementById('employment-modules-container');
      if (expEmploymentContainer && typeof loadEmploymentModules === 'function') {
        // Reset tab button visibility before reloading
        const employmentTab = document.querySelector('.tab-button[data-tab="employment"]');
        if (employmentTab) {
          employmentTab.style.display = '';
        }
        loadEmploymentModules('employment-modules-container', lang);
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
      
      // After reloading all modules, check if we need to hide any tabs
      // Only call checkAndHideEmptyTabs if the section is currently active
      const experiencesSection = document.getElementById('experiences');
      if (experiencesSection && experiencesSection.classList.contains('active')) {
        setTimeout(checkAndHideEmptyTabs, 500); // Wait for modules to load
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
      
      // After reloading modules, check if we need to hide the patents tab
      // Only call checkAndHideEmptyTabs if the section is currently active
      const publicationsSection = document.getElementById('publications');
      if (publicationsSection && publicationsSection.classList.contains('active')) {
        setTimeout(checkAndHideEmptyTabs, 500); // Wait for modules to load
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
        
        // Ensure the button has the correct ID for the event listener
        cvDownloadBtn.setAttribute('id', 'generate-cv-btn');
        
        // Remove any existing event listeners to avoid duplicates
        const newButton = cvDownloadBtn.cloneNode(true);
        cvDownloadBtn.parentNode.replaceChild(newButton, cvDownloadBtn);
        
        // Re-initialize the button event
        if (typeof initCVGenerator === 'function') {
          initCVGenerator();
        }
      }
      
      // Update CV info text
      const cvInfoText = section.querySelector('.cv-info p');
      if (cvInfoText) {
        cvInfoText.textContent = getText('cvButtonText');
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
  // Only update the active section, not all sections
  const activeSection = document.querySelector('.content-section.active');
  
  if (activeSection) {
    const sectionId = activeSection.id;
    if (sectionId) {
      // Update the section content
      updateSectionContentLanguage(sectionId);
    }
  }
  
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
        const activeTabId = activeTabStates?.experiences || 'education';
        
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
      
      // After setting active tab, check if we need to hide any tabs due to cache overload
      const lang = getCurrentLanguage();
      
      // Check employment content
      const employmentData = getPreloadedContent('employment', lang);
      if (!employmentData || (Array.isArray(employmentData) && employmentData.length === 0)) {
        const employmentTab = experiencesSection.querySelector('.tab-button[data-tab="employment"]');
        if (employmentTab && employmentTab.style.display !== 'none') {
          employmentTab.style.display = 'none';
        }
      }
      
      // Check honors content
      const honorsData = getPreloadedContent('honors', lang);
      if (!honorsData || (Array.isArray(honorsData) && honorsData.length === 0)) {
        const honorsTab = experiencesSection.querySelector('.tab-button[data-tab="honors-awards"]');
        if (honorsTab && honorsTab.style.display !== 'none') {
          honorsTab.style.display = 'none';
        }
      }
      
      // Check teaching content
      const teachingData = getPreloadedContent('teaching', lang);
      if (!teachingData || (Array.isArray(teachingData) && teachingData.length === 0)) {
        const teachingTab = experiencesSection.querySelector('.tab-button[data-tab="teaching"]');
        if (teachingTab && teachingTab.style.display !== 'none') {
          teachingTab.style.display = 'none';
        }
      }
      
      // Check reviewer content
      const reviewerData = getPreloadedContent('reviewer', lang);
      if (!reviewerData || (Array.isArray(reviewerData) && reviewerData.length === 0)) {
        const reviewerTab = experiencesSection.querySelector('.tab-button[data-tab="reviewer"]');
        if (reviewerTab && reviewerTab.style.display !== 'none') {
          reviewerTab.style.display = 'none';
        }
      }
      
      // Ensure the active tab is still visible after hiding empty tabs
      const activeTab = experiencesSection.querySelector('.tab-button.active');
      if (activeTab && activeTab.style.display === 'none') {
        // Find the first visible tab
        const visibleTabs = Array.from(experiencesSection.querySelectorAll('.tab-button')).filter(tab => 
          tab.style.display !== 'none'
        );
        
        if (visibleTabs.length > 0) {
          activeTab.classList.remove('active');
          const firstVisibleTab = visibleTabs[0];
          firstVisibleTab.classList.add('active');
          
          // Also activate the corresponding pane
          const tabId = firstVisibleTab.getAttribute('data-tab');
          experiencesSection.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
          });
          const targetPane = experiencesSection.querySelector(`.tab-pane#${tabId}`);
          if (targetPane) {
            targetPane.classList.add('active');
          }
          
          // Update the stored state
          if (typeof activeTabStates !== 'undefined') {
            activeTabStates.experiences = tabId;
          }
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
        const activeTabId = activeTabStates?.publications || 'academic-papers';
        
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
      
      // After setting active tab, check if we need to hide patents tab due to cache overload
      const lang = getCurrentLanguage();
      const patentsData = getPreloadedContent('patents', lang);
      if (!patentsData || (Array.isArray(patentsData) && patentsData.length === 0) || 
          (patentsData && patentsData.patents && Array.isArray(patentsData.patents) && patentsData.patents.length === 0)) {
        const patentsTab = publicationsSection.querySelector('.tab-button[data-tab="patents"]');
        if (patentsTab && patentsTab.style.display !== 'none') {
          patentsTab.style.display = 'none';
        }
      }
      
      // Ensure the active tab is still visible after hiding empty tabs
      const activeTab = publicationsSection.querySelector('.tab-button.active');
      if (activeTab && activeTab.style.display === 'none') {
        // Find the first visible tab
        const visibleTabs = Array.from(publicationsSection.querySelectorAll('.tab-button')).filter(tab => 
          tab.style.display !== 'none'
        );
        
        if (visibleTabs.length > 0) {
          activeTab.classList.remove('active');
          const firstVisibleTab = visibleTabs[0];
          firstVisibleTab.classList.add('active');
          
          // Also activate the corresponding pane
          const tabId = firstVisibleTab.getAttribute('data-tab');
          publicationsSection.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
          });
          const targetPane = publicationsSection.querySelector(`.tab-pane#${tabId}`);
          if (targetPane) {
            targetPane.classList.add('active');
          }
          
          // Update the stored state
          if (typeof activeTabStates !== 'undefined') {
            activeTabStates.publications = tabId;
          }
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
    updateUILanguage();
    
    // Wait for content to be ready before creating language switch
    document.addEventListener('contentReady', function(event) {
        console.log('Content is ready, creating language switch...');
        createLanguageSwitch();
    });
});

// Export functions for use in other modules
window.getCurrentLanguage = getCurrentLanguage;
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;
window.getText = getText;
window.getConfigPath = getConfigPath;