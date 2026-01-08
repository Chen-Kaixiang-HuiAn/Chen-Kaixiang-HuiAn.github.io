// Written by Constantine Heinrich CHEN (ConsHein CHEN)
// Last Updated: 2025-10-29

// Navigation functionality | 导航功能
document.addEventListener('DOMContentLoaded', function() {
    // Note: Navigation will be initialized after app.js creates the sections | 注意：导航将在app.js创建部分后初始化
});

// Initialize navigation after app.js is ready | 在app.js准备好后初始化导航
function initializeNavigation() {
    // Create navigation structure | 创建导航结构
    createNavigation();
    
    // Create footer | 创建页脚
    createFooter();
    
    // Load user info from JSON | 从JSON加载用户信息
    loadUserInfo();
}

// Update navigation links based on language | 根据语言更新导航链接
// This function is now enabled as language switching is enabled | 此函数现在已启用，因为语言切换已启用
function updateNavigationLinks(lang) {
    if (!window.navElements || !window.navElements.navLinks) return;
    
    const navLinks = window.navElements.navLinks.querySelectorAll('a');
    
    // Define link texts for each language | 定义每种语言的链接文本
    const linkTexts = {
        en: ['Home', 'Experiences', 'Publications'],
        zh: ['主页', '经历', '出版物']
    };
    
    // Update link texts | 更新链接文本
    navLinks.forEach((link, index) => {
        if (linkTexts[lang] && linkTexts[lang][index]) {
            link.textContent = linkTexts[lang][index];
        }
    });
}

// Create navigation structure | 创建导航结构
function createNavigation() {
    // Load configuration | 加载配置
    fetch('configs/config.json')
        .then(response => response.json())
        .then(config => {
            // Create header element | 创建头部元素
            const header = document.createElement('header');
            
            // Create navigation bar container | 创建导航栏容器
            const navbar = document.createElement('div');
            navbar.className = 'navbar';
            
            // Create logo section | 创建标志部分
            const logo = document.createElement('div');
            logo.className = 'logo';
            
            // Create logo element | 创建标志元素
            const logoElement = document.createElement('img');
            logoElement.src = 'https://api.iconify.design/material-symbols/school.svg?color=%23000000';
            logoElement.alt = 'Logo';
            logoElement.style.height = '32px';
            logoElement.style.marginRight = '10px';
            
            // Create name element | 创建名称元素
            const nameElement = document.createElement('span');
            nameElement.textContent = ''; // Initially empty, will be set by loadUserInfo | 初始为空，将由loadUserInfo设置
            
            // Append logo and name to logo section | 将标志和名称添加到标志部分
            logo.appendChild(logoElement);
            logo.appendChild(nameElement);
            
            // Create navigation links | 创建导航链接
            const navLinks = document.createElement('div');
            navLinks.className = 'nav-links';
            
            // Create navigation links | 创建导航链接
            const homeLink = document.createElement('a');
            homeLink.href = 'javascript:void(0)';
            homeLink.textContent = 'Home';
            // Don't set active class by default, let it be set by showSection function
            // 不要默认设置活动类，让showSection函数来设置
            
            const experiencesLink = document.createElement('a');
            experiencesLink.href = 'javascript:void(0)';
            experiencesLink.textContent = 'Experiences';
            
            const publicationsLink = document.createElement('a');
            publicationsLink.href = 'javascript:void(0)';
            publicationsLink.textContent = 'Publications';
            
            // Append navigation links | 添加导航链接
            navLinks.appendChild(homeLink);
            navLinks.appendChild(experiencesLink);
            navLinks.appendChild(publicationsLink);
            
            // Create controls container | 创建控件容器
            const controls = document.createElement('div');
            controls.className = 'controls';
            
            // Create theme switch button | 创建主题切换按钮
            const themeSwitch = document.createElement('button');
            themeSwitch.className = 'theme-switch';
            themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
            
            // Append theme switch to controls | 将主题切换按钮添加到控件
            controls.appendChild(themeSwitch);
            
            // Create language switch button only if not in single language mode | 仅在非单语言模式下创建语言切换按钮
            let langSwitch = null;
            if (!config.singleLanguageMode) {
                langSwitch = document.createElement('button');
                langSwitch.className = 'language-switch';
                langSwitch.textContent = '中';
                // Button is now enabled | 按钮现已启用
                controls.appendChild(langSwitch);
            }
            
            // Append logo, nav links and controls to navbar | 将标志、导航链接和控件添加到导航栏
            navbar.appendChild(logo);
            navbar.appendChild(navLinks);
            navbar.appendChild(controls);
            
            // Append navbar to header | 将导航栏添加到头部
            header.appendChild(navbar);
            
            // Append header to body | 将头部添加到主体
            document.body.appendChild(header);
            
            // Store references for later use | 存储引用供后续使用
            window.navElements = {
                logo: logo,
                navLinks: navLinks,
                themeSwitch: themeSwitch,
                langSwitch: langSwitch // Will be null in single language mode | 在单语言模式下将为null
            };
            
            // Initialize navigation after creating elements | 创建元素后初始化导航
            initNavigation();
            
            // Initialize theme toggle | 初始化主题切换
            initThemeToggle();
            
            // Initialize language toggle only if language switch exists | 仅当语言切换按钮存在时初始化语言切换
            if (langSwitch) {
                initLanguageToggle();
                
                // Update language switch button text based on current language from localStorage
                // 根据localStorage中的当前语言更新语言切换按钮文本
                const savedLanguage = localStorage.getItem('language') || 'en';
                // 按钮显示要切换到的语言，不是当前语言
                langSwitch.textContent = savedLanguage === 'zh' ? 'EN' : '中';
                console.log(`Language switch button text set to: ${langSwitch.textContent} based on saved language: ${savedLanguage}`);
            }
        })
        .catch(error => {
            console.error('Error loading configuration:', error);
            // Fallback to default behavior | 回退到默认行为
            createNavigationFallback();
        });
}

// Fallback navigation creation if config loading fails | 如果配置加载失败，回退导航创建
function createNavigationFallback() {
    console.log('Using fallback navigation creation');
    
    // Create header element | 创建头部元素
    const header = document.createElement('header');
    
    // Create navigation bar container | 创建导航栏容器
    const navbar = document.createElement('div');
    navbar.className = 'navbar';
    
    // Create logo section | 创建标志部分
    const logo = document.createElement('div');
    logo.className = 'logo';
    
    // Create logo element | 创建标志元素
    const logoElement = document.createElement('img');
    logoElement.src = 'https://api.iconify.design/material-symbols/school.svg?color=%23000000';
    logoElement.alt = 'Logo';
    logoElement.style.height = '32px';
    logoElement.style.marginRight = '10px';
    
    // Create name element | 创建名称元素
    const nameElement = document.createElement('span');
    nameElement.textContent = ''; // Initially empty, will be set by loadUserInfo | 初始为空，将由loadUserInfo设置
    
    // Append logo and name to logo section | 将标志和名称添加到标志部分
    logo.appendChild(logoElement);
    logo.appendChild(nameElement);
    
    // Create navigation links | 创建导航链接
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    
    // Create navigation links | 创建导航链接
    const homeLink = document.createElement('a');
    homeLink.href = 'javascript:void(0)';
    homeLink.textContent = 'Home';
    // Don't set active class by default, let it be set by showSection function
    // 不要默认设置活动类，让showSection函数来设置
    
    const experiencesLink = document.createElement('a');
    experiencesLink.href = 'javascript:void(0)';
    experiencesLink.textContent = 'Experiences';
    
    const publicationsLink = document.createElement('a');
    publicationsLink.href = 'javascript:void(0)';
    publicationsLink.textContent = 'Publications';
    
    // Append navigation links | 添加导航链接
    navLinks.appendChild(homeLink);
    navLinks.appendChild(experiencesLink);
    navLinks.appendChild(publicationsLink);
    
    // Create controls container | 创建控件容器
    const controls = document.createElement('div');
    controls.className = 'controls';
    
    // Create theme switch button | 创建主题切换按钮
    const themeSwitch = document.createElement('button');
    themeSwitch.className = 'theme-switch';
    themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
    
    // Create language switch button (default to showing it) | 创建语言切换按钮（默认显示）
    const langSwitch = document.createElement('button');
    langSwitch.className = 'language-switch';
    langSwitch.textContent = '中';
    // Button is now enabled | 按钮现已启用
    
    // Append controls to controls container | 将控件添加到控件容器
    controls.appendChild(themeSwitch);
    controls.appendChild(langSwitch);
    
    // Append logo, nav links and controls to navbar | 将标志、导航链接和控件添加到导航栏
    navbar.appendChild(logo);
    navbar.appendChild(navLinks);
    navbar.appendChild(controls);
    
    // Append navbar to header | 将导航栏添加到头部
    header.appendChild(navbar);
    
    // Append header to body | 将头部添加到主体
    document.body.appendChild(header);
    
    // Store references for later use | 存储引用供后续使用
    window.navElements = {
        logo: logo,
        navLinks: navLinks,
        themeSwitch: themeSwitch,
        langSwitch: langSwitch // Language switch button is now enabled | 语言切换按钮现已启用
    };
    
    // Initialize navigation after creating elements | 创建元素后初始化导航
    initNavigation();
    
    // Initialize theme toggle | 初始化主题切换
    initThemeToggle();
    
    // Initialize language toggle | 初始化语言切换
    initLanguageToggle();
    
    // Update language switch button text based on current language from localStorage
    // 根据localStorage中的当前语言更新语言切换按钮文本
    const savedLanguage = localStorage.getItem('language') || 'en';
    // 按钮显示要切换到的语言，不是当前语言
    langSwitch.textContent = savedLanguage === 'zh' ? 'EN' : '中';
    console.log(`Language switch button text set to: ${langSwitch.textContent} based on saved language: ${savedLanguage}`);
}

// Create footer | 创建页脚
function createFooter() {
    // Create footer element | 创建页脚元素
    const footer = document.createElement('footer');
    footer.className = 'footer';
    
    // Create copyright container | 创建版权容器
    const copyrightContainer = document.createElement('div');
    copyrightContainer.className = 'copyright-container';
    
    // Get current year | 获取当前年份
    const currentYear = new Date().getFullYear();
    
    // Create copyright text | 创建版权文本
    const copyrightText = document.createElement('p');
    copyrightText.className = 'copyright-text';
    
    // Store reference for later language updates | 存储引用供后续语言更新使用
    window.footerElement = {
        footer: footer,
        copyrightText: copyrightText,
        currentYear: currentYear
    };
    
    // Update footer text based on current language | 根据当前语言更新页脚文本
    updateFooterText();
    
    // Append copyright text to container | 将版权文本添加到容器
    copyrightContainer.appendChild(copyrightText);
    
    // Append container to footer | 将容器添加到页脚
    footer.appendChild(copyrightContainer);
    
    // Append footer to body | 将页脚添加到主体
    document.body.appendChild(footer);
}

// Update footer text based on language | 根据语言更新页脚文本
function updateFooterText() {
    // Get current language from language manager or default to English | 从语言管理器获取当前语言或默认为英语
    const currentLang = (window.languageManager && window.languageManager.currentLanguage) || 'en';
    
    if (window.footerElement && window.footerElement.copyrightText) {
        const currentYear = window.footerElement.currentYear;
        
        // Define copyright text for each language | 定义每种语言的版权文本
        const copyrightTexts = {
            en: `© ${currentYear} <a href="https://github.com/excursion-studio/personal-homepage-template" target="_blank">Excursion Studio Personal Homepage (ESPH)</a>.`,
            zh: `© ${currentYear} <a href="https://github.com/excursion-studio/personal-homepage-template" target="_blank">远行工作室-个人主页 (ESPH)</a>.`
        };
        
        // Use appropriate text based on language | 根据语言使用适当的文本
        const copyrightText = copyrightTexts[currentLang] || copyrightTexts.en;
        window.footerElement.copyrightText.innerHTML = copyrightText;
    }
}

// Load user info from JSON | 从JSON加载用户信息
async function loadUserInfo() {
    try {
        console.log('Loading user info...');
        
        // Get current language from language manager or default to English | 从语言管理器获取当前语言或默认为英语
        const currentLang = (window.languageManager && window.languageManager.currentLanguage) || 'en';
        console.log(`Current language for user info: ${currentLang}`);
        
        // Use appropriate config file based on language | 根据语言使用适当的配置文件
        const infoFile = currentLang === 'zh' ? 'info_zh.json' : 'info_en.json';
        const infoPath = `configs/${currentLang}/${infoFile}`;
        console.log(`Loading user info from: ${infoPath}`);
        
        const response = await fetch(infoPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userInfo = await response.json();
        console.log('User info loaded successfully:', userInfo);
        
        // Update logo section with user info | 使用用户信息更新标志部分
        if (window.navElements && window.navElements.logo) {
            const nameElement = window.navElements.logo.querySelector('span');
            if (nameElement) {
                nameElement.textContent = userInfo.name;
                console.log(`Updated name in navigation to: ${userInfo.name}`);
            } else {
                console.warn('Name element not found in navigation');
            }
        } else {
            console.warn('Navigation elements not found');
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
}

// Initialize navigation | 初始化导航
function initNavigation() {
    if (!window.navElements || !window.navElements.navLinks) return;
    
    const navLinks = window.navElements.navLinks.querySelectorAll('a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links | 从所有链接中移除活动类
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link | 将活动类添加到点击的链接
            this.classList.add('active');
            
            // Get current language from language manager or default to English | 从语言管理器获取当前语言或默认为英语
            const currentLang = (window.languageManager && window.languageManager.currentLanguage) || 'en';
            
            // Define link texts for each language | 定义每种语言的链接文本
            const linkTexts = {
                en: ['Home', 'Experiences', 'Publications'],
                zh: ['主页', '经历', '出版物']
            };
            
            // Handle navigation based on link text and language | 根据链接文本和语言处理导航
            const linkText = this.textContent;
            let sectionId;
            
            // Find the index of the clicked link | 找到点击的链接的索引
            let linkIndex = -1;
            
            // Check each language's link texts | 检查每种语言的链接文本
            for (const lang in linkTexts) {
                linkIndex = linkTexts[lang].indexOf(linkText);
                if (linkIndex !== -1) break;
            }
            
            // Determine section ID based on index | 根据索引确定部分ID
            switch(linkIndex) {
                case 0: // Home | 主页
                    sectionId = 'home-section';
                    break;
                case 1: // Experiences | 经历
                    sectionId = 'experiences-section';
                    break;
                case 2: // Publications | 出版物
                    sectionId = 'publications-section';
                    break;
                default:
                    sectionId = 'home-section';
            }
            
            // Show the corresponding section if it exists | 如果存在，显示相应的部分
            if (sectionId && window.showSection) {
                window.showSection(sectionId);
            }
        });
    });
}

// Update logo color based on theme | 根据主题更新logo颜色
function updateLogoColor() {
    if (!window.navElements || !window.navElements.logo) return;
    
    const logoImg = window.navElements.logo.querySelector('img');
    if (!logoImg) return;
    
    if (document.body.classList.contains('dark-theme')) {
        // Dark theme - use black logo | 深色主题 - 使用黑色logo
        logoImg.src = 'https://api.iconify.design/material-symbols/school.svg?color=%23000000';
    } else {
        // Light theme - use white logo | 浅色主题 - 使用白色logo
        logoImg.src = 'https://api.iconify.design/material-symbols/school.svg?color=%23ffffff';
    }
}

// Initialize theme toggle | 初始化主题切换
function initThemeToggle() {
    if (!window.navElements || !window.navElements.themeSwitch) return;
    
    const themeToggle = window.navElements.themeSwitch;
    
    // Check for saved theme preference or default to dark | 检查保存的主题偏好或默认为深色
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme | 应用保存的主题
    if (currentTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Show moon to switch to dark theme | 显示月亮图标以切换到深色主题
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Show sun to switch to light theme | 显示太阳图标以切换到浅色主题
    }
    
    // Update logo color based on initial theme | 根据初始主题更新logo颜色
    updateLogoColor();
    
    // Add click event to theme toggle button | 向主题切换按钮添加点击事件
    themeToggle.addEventListener('click', function() {
        // Toggle the theme classes | 切换主题类
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
        
        // Update logo color after theme change | 主题更改后更新logo颜色
        updateLogoColor();
    });
}

// Initialize language toggle | 初始化语言切换
function initLanguageToggle() {
    console.log('Initializing language toggle...');
    
    if (!window.navElements || !window.navElements.langSwitch) {
        console.warn('Language switch element not found');
        return;
    }
    
    const langToggle = window.navElements.langSwitch;
    
    // Get current language from language manager or default to English | 从语言管理器获取当前语言或默认为英语
    const currentLang = (window.languageManager && window.languageManager.currentLanguage) || 'en';
    console.log(`Current language detected: ${currentLang}`);
    
    // Update button text to show language to switch to | 更新按钮文本以显示要切换到的语言
    langToggle.textContent = currentLang === 'zh' ? 'EN' : '中';
    console.log(`Language switch button text set to show language to switch to: ${langToggle.textContent}`);
    
    // Update navigation links text based on current language | 根据当前语言更新导航链接文本
    if (window.languageManager && window.languageManager.updateNavigationLinks) {
        window.languageManager.updateNavigationLinks(currentLang);
    } else {
        // Fallback to direct update if language manager is not available | 如果语言管理器不可用，回退到直接更新
        updateNavigationLinks(currentLang);
    }
    
    // Add click event to language toggle button | 向语言切换按钮添加点击事件
    langToggle.addEventListener('click', async function() {
        console.log('Language switch button clicked');
        
        // Get current language from language manager | 从语言管理器获取当前语言
        const currentLang = (window.languageManager && window.languageManager.currentLanguage) || 'en';
        console.log(`Current language before switch: ${currentLang}`);
        
        // Toggle the language using language manager | 使用语言管理器切换语言
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        console.log(`Switching to language: ${newLang}`);
        
        // Use language manager to switch language | 使用语言管理器切换语言
        if (window.languageManager && window.languageManager.switchLanguage) {
            console.log('Calling languageManager.switchLanguage...');
            const result = await window.languageManager.switchLanguage(newLang);
            console.log(`Language switch result: ${result}`);
        } else {
            console.error('Language manager not available, falling back to localStorage');
            // Fallback to localStorage if language manager is not available | 如果语言管理器不可用，回退到localStorage
            localStorage.setItem('language', newLang);
            
            // Update button text to show language to switch to | 更新按钮文本以显示要切换到的语言
            langToggle.textContent = newLang === 'zh' ? 'EN' : '中';
            
            // Update navigation links text | 更新导航链接文本
            updateNavigationLinks(newLang);
            
            // Update footer text | 更新页脚文本
            updateFooterText();
            
            // Reload user info with new language | 使用新语言重新加载用户信息
            loadUserInfo();
            
            // Reload the page to apply language changes | 重新加载页面以应用语言更改
            window.location.reload();
        }
    });
    
    console.log('Language toggle initialized successfully');
}