// Written by Constantine Heinrich CHEN (ConsHein CHEN)
// Last Updated: 2025-10-29

// Main content loader | 主内容加载器
// Global variables | 全局变量
let config = {}; // Configuration | 配置
let allContentData = {}; // All language content data | 所有语言内容数据

// Clear cache function | 清除缓存函数
function clearContentCache() {
    console.log('Clearing content cache...');
    config = {};
    allContentData = {};
    
    // Clear any localStorage or sessionStorage related to content
    // 清除与内容相关的任何localStorage或sessionStorage
    Object.keys(localStorage).forEach(key => {
        if (key.includes('content') || key.includes('lang') || key.includes('config')) {
            localStorage.removeItem(key);
        }
    });
    
    Object.keys(sessionStorage).forEach(key => {
        if (key.includes('content') || key.includes('lang') || key.includes('config')) {
            sessionStorage.removeItem(key);
        }
    });
    
    console.log('Content cache cleared');
}

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM content loaded, initializing page...');
    
    try {
        // Clear cache on each page refresh | 每次页面刷新时清除缓存
        clearContentCache();
        
        // Load configuration | 加载配置
        console.log('Loading configuration...');
        await loadConfig();
        console.log('Configuration loaded successfully');
        
        // Load all language content data | 加载所有语言内容数据
        console.log('Loading all language content data...');
        await loadAllLanguageContent();
        console.log('All language content data loaded successfully');
        
        // Initialize language manager first | 首先初始化语言管理器
        console.log('Initializing language manager...');
        if (window.languageManager) {
            const initResult = await window.languageManager.init(config, allContentData);
            if (!initResult) {
                throw new Error('Failed to initialize language manager');
            }
            console.log('Language manager initialized successfully');
        } else {
            throw new Error('Language manager not found');
        }
        
        // Create main container | 创建主容器
        console.log('Creating main container...');
        createMainContainer();
        console.log('Main container created successfully');
        
        // Initialize sections | 初始化部分
        console.log('Initializing sections...');
        initializeSections();
        console.log('Sections initialized successfully');
        
        // Initialize navigation after sections are created | 在创建部分后初始化导航
        console.log('Initializing navigation...');
        
        // Initialize navigation from nav.js
        if (typeof window.initializeNavigation === 'function') {
            window.initializeNavigation();
            console.log('Navigation from nav.js initialized successfully');
            
            // After navigation is initialized, update navigation links based on current language
            // 在导航初始化后，根据当前语言更新导航链接
            if (window.languageManager && window.languageManager.updateNavigationLinks) {
                const currentLang = window.languageManager.getCurrentLanguage();
                console.log(`Updating navigation links to language: ${currentLang}`);
                window.languageManager.updateNavigationLinks(currentLang);
                console.log(`Navigation links updated for language: ${currentLang}`);
            }
        } else {
            console.warn('Navigation from nav.js not available');
        }
        
        // Show home section by default and set home link as active | 默认显示主页部分并设置home链接为活动状态
        console.log('Showing home section...');
        showSection('home-section');
        
        // Ensure home navigation link is set as active after a short delay | 确保在短暂延迟后设置home导航链接为活动状态
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            if (navLinks[0]) {
                navLinks[0].classList.add('active');
                console.log('Home navigation link set as active');
            } else {
                console.warn('Navigation links not found, retrying in 100ms...');
                // Retry if navigation links are not ready | 如果导航链接未准备好，重试
                setTimeout(() => {
                    const retryNavLinks = document.querySelectorAll('.nav-links a');
                    retryNavLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    if (retryNavLinks[0]) {
                        retryNavLinks[0].classList.add('active');
                        console.log('Home navigation link set as active on retry');
                    }
                }, 100);
            }
        }, 100);
        
        console.log('Home section shown successfully');
        
        // Expose showSection function globally | 全局暴露showSection函数
        window.showSection = showSection;
        
        // Listen for language change events | 监听语言更改事件
        document.addEventListener('languageChange', (event) => {
            console.log(`Language changed to: ${event.detail.language}`);
            
            // Update navigation name | 更新导航栏名称
            if (window.languageManager && window.languageManager.updateNavigationName) {
                window.languageManager.updateNavigationName(event.detail.language);
            }
            
            // Update home content if home section is visible | 如果主页部分可见，则更新主页内容
            const homeSection = document.getElementById('home-section');
            if (homeSection && homeSection.style.display !== 'none') {
                if (window.languageManager) {
                    window.languageManager.updateHomeContent(event.detail.language);
                }
            }
            
            // Update experiences content if experiences section is visible | 如果经历部分可见，则更新经历内容
            const experiencesSection = document.getElementById('experiences-section');
            if (experiencesSection && experiencesSection.style.display !== 'none') {
                if (window.languageManager) {
                    window.languageManager.updateExperiencesContent(event.detail.language);
                }
            } else if (window.languageManager) {
                // Even if experiences section is not visible, update its static text for future display
                // 即使经历部分不可见，也更新其静态文本以备将来显示
                window.languageManager.updateExperiencesContent(event.detail.language);
            }
            
            // Update publications content if publications section is visible | 如果出版物部分可见，则更新出版物内容
            const publicationsSection = document.getElementById('publications-section');
            if (publicationsSection && publicationsSection.style.display !== 'none') {
                if (window.languageManager && window.languageManager.updatePublicationsContent) {
                    window.languageManager.updatePublicationsContent(event.detail.language);
                }
            } else if (window.languageManager && window.languageManager.updatePublicationsContent) {
                // Even if publications section is not visible, update its static text for future display
                // 即使出版物部分不可见，也更新其静态文本以备将来显示
                window.languageManager.updatePublicationsContent(event.detail.language);
            }
        });
        
        console.log('Page initialization completed successfully');
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});

// Load configuration from config.json | 从config.json加载配置
async function loadConfig() {
    try {
        // Add timestamp to prevent browser caching | 添加时间戳以防止浏览器缓存
        const timestamp = new Date().getTime();
        const response = await fetch(`configs/config.json?t=${timestamp}`);
        config = await response.json();
        console.log('Configuration loaded:', config);
    } catch (error) {
        console.error('Error loading configuration:', error);
        throw error;
    }
}

// Load all language content data | 加载所有语言内容数据
async function loadAllLanguageContent() {
    try {
        if (!config.availableLanguages || !Array.isArray(config.availableLanguages)) {
            throw new Error('Available languages configuration not found or invalid');
        }
        
        allContentData = {};
        
        for (const lang of config.availableLanguages) {
            allContentData[lang] = {};
            console.log(`Loading content for language: ${lang}`);
            
            // Add timestamp to prevent browser caching | 添加时间戳以防止浏览器缓存
            const timestamp = new Date().getTime();
            
            // Load info data | 加载信息数据
            try {
                const infoResponse = await fetch(`configs/${lang}/info_${lang}.json?t=${timestamp}`);
                if (!infoResponse.ok) {
                    throw new Error(`HTTP error! status: ${infoResponse.status}`);
                }
                const infoData = await infoResponse.json();
                allContentData[lang].info = infoData;
                console.log(`Loaded info data for ${lang}:`, infoData);
            } catch (error) {
                console.warn(`Could not load info data for language ${lang}:`, error);
            }
            
            // Load intro data | 加载介绍数据
            try {
                const introResponse = await fetch(`configs/${lang}/intro_${lang}.txt?t=${timestamp}`);
                if (!introResponse.ok) {
                    throw new Error(`HTTP error! status: ${introResponse.status}`);
                }
                const introData = await introResponse.text();
                allContentData[lang].intro = introData;
                console.log(`Loaded intro data for ${lang}:`, introData.substring(0, 50) + '...');
            } catch (error) {
                console.warn(`Could not load intro data for language ${lang}:`, error);
            }
            
            // Load news data | 加载新闻数据
            try {
                const newsResponse = await fetch(`configs/${lang}/news_${lang}.json?t=${timestamp}`);
                if (!newsResponse.ok) {
                    throw new Error(`HTTP error! status: ${newsResponse.status}`);
                }
                const newsData = await newsResponse.json();
                allContentData[lang].news = newsData;
                console.log(`Loaded news data for ${lang}:`, newsData);
            } catch (error) {
                console.warn(`Could not load news data for language ${lang}:`, error);
            }

            // Load education data | 加载教育数据
            try {
                const educationResponse = await fetch(`configs/${lang}/education_${lang}.json?t=${timestamp}`);
                if (!educationResponse.ok) {
                    throw new Error(`HTTP error! status: ${educationResponse.status}`);
                }
                const educationData = await educationResponse.json();
                allContentData[lang].education = educationData;
                console.log(`Loaded education data for ${lang}:`, educationData);
            } catch (error) {
                console.warn(`Could not load education data for language ${lang}:`, error);
            }
            
            // Load employment data | 加载就业数据
            try {
                const employmentResponse = await fetch(`configs/${lang}/employment_${lang}.json?t=${timestamp}`);
                if (!employmentResponse.ok) {
                    throw new Error(`HTTP error! status: ${employmentResponse.status}`);
                }
                const employmentData = await employmentResponse.json();
                allContentData[lang].employment = employmentData;
                console.log(`Loaded employment data for ${lang}:`, employmentData);
            } catch (error) {
                console.warn(`Could not load employment data for language ${lang}:`, error);
            }

            // Load honors data | 加载荣誉数据
            try {
                const honorsResponse = await fetch(`configs/${lang}/honors_${lang}.json?t=${timestamp}`);
                if (!honorsResponse.ok) {
                    throw new Error(`HTTP error! status: ${honorsResponse.status}`);
                }
                const honorsData = await honorsResponse.json();
                allContentData[lang].honors = honorsData;
                console.log(`Loaded honors data for ${lang}:`, honorsData);
            } catch (error) {
                console.warn(`Could not load honors data for language ${lang}:`, error);
            }

            // Load teaching data | 加载教学数据
            try {
                const teachingResponse = await fetch(`configs/${lang}/teaching_${lang}.json?t=${timestamp}`);
                if (!teachingResponse.ok) {
                    throw new Error(`HTTP error! status: ${teachingResponse.status}`);
                }
                const teachingData = await teachingResponse.json();
                allContentData[lang].teaching = teachingData;
                console.log(`Loaded teaching data for ${lang}:`, teachingData);
            } catch (error) {
                console.warn(`Could not load teaching data for language ${lang}:`, error);
            }
            
            // Load reviewer data | 加载审稿人数据
            try {
                const reviewerResponse = await fetch(`configs/${lang}/reviewer_${lang}.json?t=${timestamp}`);
                if (!reviewerResponse.ok) {
                    throw new Error(`HTTP error! status: ${reviewerResponse.status}`);
                }
                const reviewerData = await reviewerResponse.json();
                allContentData[lang].reviewer = reviewerData;
                console.log(`Loaded reviewer data for ${lang}:`, reviewerData);
            } catch (error) {
                console.warn(`Could not load reviewer data for language ${lang}:`, error);
            }

            // Load paper data | 加载论文数据
            try {
                const paperResponse = await fetch(`configs/${lang}/papers_${lang}.json?t=${timestamp}`);
                if (!paperResponse.ok) {
                    throw new Error(`HTTP error! status: ${paperResponse.status}`);
                }
                const paperData = await paperResponse.json();
                allContentData[lang].paper = paperData;
                console.log(`Loaded paper data for ${lang}:`, paperData);
            } catch (error) {
                console.warn(`Could not load paper data for language ${lang}:`, error);
            }

            // Load patent data | 加载专利数据
            try {
                const patentResponse = await fetch(`configs/${lang}/patents_${lang}.json?t=${timestamp}`);
                if (!patentResponse.ok) {
                    throw new Error(`HTTP error! status: ${patentResponse.status}`);
                }
                const patentData = await patentResponse.json();
                allContentData[lang].patent = patentData;
                console.log(`Loaded patent data for ${lang}:`, patentData);
            } catch (error) {
                console.warn(`Could not load patent data for language ${lang}:`, error);
            }
        }
        
        console.log('All language content loaded:', Object.keys(allContentData));
        console.log('Content data structure:', allContentData);
    } catch (error) {
        console.error('Error loading language content:', error);
        throw error;
    }
}

// Create main container | 创建主容器
function createMainContainer() {
    // Create main container element | 创建主容器元素
    const mainContainer = document.createElement('main');
    mainContainer.className = 'main-container';
    mainContainer.id = 'main-container';
    
    // Append main container to body | 将主容器添加到主体
    document.body.appendChild(mainContainer);
    
    // Store reference for later use | 存储引用供后续使用
    window.mainContainer = mainContainer;
}

// Initialize sections | 初始化部分
function initializeSections() {
    // Create home section | 创建主页部分
    const homeSection = document.createElement('section');
    homeSection.className = 'content-section';
    homeSection.id = 'home-section';
    homeSection.style.display = 'none';
    
    // Create experiences section | 创建经历部分
    const experiencesSection = document.createElement('section');
    experiencesSection.className = 'content-section';
    experiencesSection.id = 'experiences-section';
    experiencesSection.style.display = 'none';
    
    // Create publications section | 创建出版物部分
    const publicationsSection = document.createElement('section');
    publicationsSection.className = 'content-section';
    publicationsSection.id = 'publications-section';
    publicationsSection.style.display = 'none';
    
    // Append sections to main container | 将部分添加到主容器
    window.mainContainer.appendChild(homeSection);
    window.mainContainer.appendChild(experiencesSection);
    window.mainContainer.appendChild(publicationsSection);
    
    // Initialize tab states for experiences and publications sections | 初始化经历和出版物部分的选项卡状态
    if (typeof window.activeTabStates === 'undefined') {
        window.activeTabStates = {};
    }
    
    // Set default active tabs if not set | 如果未设置默认活动选项卡，则设置
    if (!window.activeTabStates.experiences) {
        window.activeTabStates.experiences = 'education';
    }
    
    if (!window.activeTabStates.publications) {
        window.activeTabStates.publications = 'paper';
    }
    
    // Don't load content here - content will be loaded when sections are shown
    // 不要在这里加载内容 - 内容将在显示部分时加载
}

// Show specific section | 显示特定部分
function showSection(sectionId) {
    // Hide all sections | 隐藏所有部分
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the requested section | 显示请求的部分
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // Add fade-in effect | 添加淡入效果
        targetSection.style.opacity = '0';
        setTimeout(() => {
            targetSection.style.transition = 'opacity 0.3s ease-in-out';
            targetSection.style.opacity = '1';
        }, 10);
        
        // Update navigation active state | 更新导航活动状态
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Set active link based on sectionId | 根据sectionId设置活动链接
        let linkIndex = 0; // Default to home | 默认为home
        if (sectionId === 'experiences-section') {
            linkIndex = 1;
        } else if (sectionId === 'publications-section') {
            linkIndex = 2;
        }
        
        if (navLinks[linkIndex]) {
            navLinks[linkIndex].classList.add('active');
        }
        
        // Load content for the section | 加载部分内容
        if (sectionId === 'home-section') {
            // Only load the home content structure if it hasn't been loaded yet
            if (window.loadHomeContent && !targetSection.querySelector('.home-content-wrapper')) {
                window.loadHomeContent();
            }
            
            // Then update the content with language manager | 然后使用语言管理器更新内容
            if (window.languageManager) {
                // Use a longer delay to ensure the section is visible and DOM is ready before updating content | 使用更长的延迟确保在更新内容前部分可见且DOM已准备就绪
                setTimeout(() => {
                    // Check if language manager is initialized before updating content | 在更新内容前检查语言管理器是否已初始化
                    if (window.languageManager && window.languageManager.isInitialized) {
                        // Check if required DOM elements exist before updating content | 在更新内容前检查所需的DOM元素是否存在
                        const infoElement = document.getElementById('personal-info');
                        const introElement = document.getElementById('intro-content');
                        const newsElement = document.getElementById('news-content');
                        
                        if (infoElement && introElement && newsElement) {
                            window.languageManager.updateHomeContent(window.languageManager.getCurrentLanguage());
                        } else {
                            console.warn('Required DOM elements not found, retrying in 200ms...');
                            // Retry after another 200ms if DOM elements are not ready | 如果DOM元素未准备好，200毫秒后重试
                            setTimeout(() => {
                                const infoElement = document.getElementById('personal-info');
                                const introElement = document.getElementById('intro-content');
                                const newsElement = document.getElementById('news-content');
                                
                                if (infoElement && introElement && newsElement) {
                                    window.languageManager.updateHomeContent(window.languageManager.getCurrentLanguage());
                                } else {
                                    console.warn('Required DOM elements still not found after retry');
                                    // Load home content structure if elements are missing | 如果元素缺失，加载主页内容结构
                                    if (window.loadHomeContent) {
                                        window.loadHomeContent();
                                        // Try updating content again after loading structure | 加载结构后再次尝试更新内容
                                        setTimeout(() => {
                                            if (window.languageManager && window.languageManager.isInitialized) {
                                                window.languageManager.updateHomeContent(window.languageManager.getCurrentLanguage());
                                            }
                                        }, 200);
                                    }
                                }
                            }, 200);
                        }
                    } else {
                        console.warn('Language manager not initialized, retrying in 200ms...');
                        // Retry after another 200ms if language manager is not ready | 如果语言管理器未准备好，200毫秒后重试
                        setTimeout(() => {
                            if (window.languageManager && window.languageManager.isInitialized) {
                                // Check if required DOM elements exist before updating content | 在更新内容前检查所需的DOM元素是否存在
                                const infoElement = document.getElementById('personal-info');
                                const introElement = document.getElementById('intro-content');
                                const newsElement = document.getElementById('news-content');
                                
                                if (infoElement && introElement && newsElement) {
                                    window.languageManager.updateHomeContent(window.languageManager.getCurrentLanguage());
                                } else {
                                    console.warn('Required DOM elements not found after language manager init');
                                    // Load home content structure if elements are missing | 如果元素缺失，加载主页内容结构
                                    if (window.loadHomeContent) {
                                        window.loadHomeContent();
                                        // Try updating content again after loading structure | 加载结构后再次尝试更新内容
                                        setTimeout(() => {
                                            if (window.languageManager && window.languageManager.isInitialized) {
                                                window.languageManager.updateHomeContent(window.languageManager.getCurrentLanguage());
                                            }
                                        }, 200);
                                    }
                                }
                            } else {
                                console.error('Language manager still not initialized after retry');
                            }
                        }, 200);
                    }
                }, 500); // Increased delay from 300ms to 500ms | 将延迟从300ms增加到500ms
            }
        } else if (sectionId === 'experiences-section' && window.loadExperiencesContent) {
            // Load experiences content | 加载经历内容
            setTimeout(() => {
                const experiencesSection = document.getElementById('experiences-section');
                if (experiencesSection) {
                    experiencesSection.innerHTML = window.loadExperiencesContent();
                    
                    // Initialize tab functionality using dedicated function | 使用专用函数初始化选项卡功能
                    if (window.initializeExperiencesSection) {
                        window.initializeExperiencesSection();
                    }
                }
            }, 100);
        } else if (sectionId === 'publications-section' && window.loadPublicationsContent) {
            // Load publications content | 加载出版物内容
            setTimeout(() => {
                const publicationsSection = document.getElementById('publications-section');
                if (publicationsSection) {
                    publicationsSection.innerHTML = window.loadPublicationsContent();
                    
                    // Initialize tab functionality using dedicated function | 使用专用函数初始化选项卡功能
                    if (window.initializePublicationsSection) {
                        window.initializePublicationsSection();
                    }
                }
            }, 100);
        }
    }
}

// Initialize navigation - this function is no longer needed as nav.js handles navigation
// 初始化导航 - 此函数不再需要，因为nav.js处理导航
// This function is kept for backward compatibility but does nothing
// 此函数保留是为了向后兼容，但不执行任何操作
function initializeNavigation() {
    // Navigation is now handled by nav.js
    // 导航现在由nav.js处理
    console.log('Navigation initialization skipped - handled by nav.js');
}
