// Written by Constantine Heinrich CHEN (ConsHein CHEN)
// Last Updated: 2025-10-29

// Language Manager | 语言管理器
// Take Responsibility: Manage multi-language content, language switching, and static text translation, supporting hot switching | 负责管理多语言内容、语言切换和静态文本转换，支持热切换功能

/**
 * Language Manager Class | 语言管理器类
 */
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en'; // Default language | 默认语言
        this.availableLanguages = ['en', 'zh']; // Available languages | 可用语言
        this.contentData = {}; // Store all language content | 存储所有语言内容
        this.staticTexts = {}; // Store static texts for UI elements | 存储UI元素的静态文本
        this.isInitialized = false; // Initialization flag | 初始化标志
        
        // Initialize static texts | 初始化静态文本
        this.initializeStaticTexts();
    }
    
    /**
     * Initialize static texts for different languages | 初始化不同语言的静态文本
     */
    initializeStaticTexts() {
        this.staticTexts = {
            en: {
                // Navigation | 导航
                navHome: 'Home',
                navExperiences: 'Experiences',
                navPublications: 'Publications',
                
                // Home page | 主页
                aboutMe: 'About Me',
                news: 'News',
                latest: 'Latest',
                googleScholar: 'Google Scholar',
                
                // Experiences | 经历
                experiences: 'Experiences',
                education: 'Education',
                employment: 'Employment',
                project: 'Project',
                honorsAndAwards: 'Honors and Awards',
                teaching: 'Teaching',
                reviewer: 'Reviewer',
                major: 'Major',
                college: 'College',
                time: 'Time',
                tutor: 'Tutor',
                dissertation: 'Dissertation',
                schoolWebsite: 'School Website',
                
                // Publications | 出版物
                publications: 'Publications',
                academicPapers: 'Academic Papers',
                patents: 'Patents',
                journal: 'Journal',
                conference: 'Conference',
                authors: 'Authors',
                abstract: 'Abstract',
                doi: 'DOI',
                patentNumber: 'Patent Number',
                inventor: 'Inventor',
                assignee: 'Assignee',
                filingDate: 'Filing Date',
                publicationDate: 'Publication Date',
                type: 'Type',
                
                // Paper links | 论文链接
                paper: 'Paper',
                code: 'Code',
                video: 'Video',
                site: 'Site',
                
                // Footer | 页脚
                copyright: '© {year} <a href="https://github.com/excursion-studio/personal-homepage-template" target="_blank">Excursion Studio Personal Homepage (ESPH)</a>.',
                
                // Language switch | 语言切换
                langSwitchTo: '中', // Text to show when current language is English
                
                // No content message | 无内容消息
                noContentAvailable: 'No content available',
            },
            zh: {
                // Navigation | 导航
                navHome: '主页',
                navExperiences: '经历',
                navPublications: '出版物',
                
                // Home page | 主页
                aboutMe: '关于我',
                news: '新闻',
                latest: '最新',
                googleScholar: '谷歌学术',
                
                // Experiences | 经历
                experiences: '经历',
                education: '教育',
                employment: '工作',
                project: '项目',
                honorsAndAwards: '荣誉奖项',
                teaching: '教学',
                reviewer: '审稿',
                major: '专业',
                college: '学院',
                time: '时间',
                tutor: '导师',
                dissertation: '学位论文',
                schoolWebsite: '学校网站',
                
                // Publications | 出版物
                publications: '出版物',
                academicPapers: '学术论文',
                patents: '专利',
                journal: '期刊',
                conference: '会议',
                authors: '作者',
                abstract: '摘要',
                doi: 'DOI',
                patentNumber: '专利号',
                inventor: '发明人',
                assignee: '受让人',
                filingDate: '申请日期',
                publicationDate: '公布日期',
                type: '类型',
                
                // Paper links | 论文链接
                paper: '论文',
                code: '代码',
                video: '视频',
                site: '网站',
                
                // Footer | 页脚
                copyright: '© {year} <a href="https://github.com/excursion-studio/personal-homepage-template" target="_blank">远行工作室-个人主页</a>。',
                
                // Language switch | 语言切换
                langSwitchTo: 'EN', // Text to show when current language is Chinese
                
                // No content message | 无内容消息
                noContentAvailable: '暂无内容',
            }
        };
    }
    
    /**
     * Initialize the language manager | 初始化语言管理器
     * @param {Object} config - Configuration object | 配置对象
     * @param {Object} contentData - All language content data | 所有语言内容数据
     */
    async init(config, contentData) {
        try {
            console.log('Initializing language manager with config:', config);
            console.log('Content data received:', contentData);
            
            // Set available languages and default language | 设置可用语言和默认语言
            this.availableLanguages = config.availableLanguages || ['en', 'zh'];
            this.currentLanguage = config.defaultLanguage || 'en';
            
            // Store content data | 存储内容数据
            this.contentData = contentData || {};
            
            // Get saved language from localStorage or use default | 从localStorage获取保存的语言或使用默认语言
            const savedLanguage = localStorage.getItem('language');
            if (savedLanguage && this.availableLanguages.includes(savedLanguage)) {
                this.currentLanguage = savedLanguage;
            }
            
            this.isInitialized = true;
            console.log(`Language manager initialized with language: ${this.currentLanguage}`);
            console.log('Available languages:', this.availableLanguages);
            console.log('Content data structure in language manager:', this.contentData);
            
            // Trigger language change event | 触发语言更改事件
            this.triggerLanguageChange();
            
            return true;
        } catch (error) {
            console.error('Error initializing language manager:', error);
            return false;
        }
    }
    
    /**
     * Get current language | 获取当前语言
     * @returns {string} Current language code | 当前语言代码
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    /**
     * Get available languages | 获取可用语言
     * @returns {Array} Array of available language codes | 可用语言代码数组
     */
    getAvailableLanguages() {
        return [...this.availableLanguages];
    }
    
    /**
     * Switch to a different language | 切换到不同的语言
     * @param {string} languageCode - Language code to switch to | 要切换到的语言代码
     * @returns {boolean} Success status | 成功状态
     */
    async switchLanguage(languageCode) {
        if (!this.availableLanguages.includes(languageCode)) {
            console.error(`Language ${languageCode} is not available`);
            return false;
        }
        
        if (this.currentLanguage === languageCode) {
            console.log(`Already using language ${languageCode}`);
            return true;
        }
        
        this.currentLanguage = languageCode;
        localStorage.setItem('language', languageCode);
        
        console.log(`Switched to language: ${languageCode}`);
        
        // Trigger language change event | 触发语言更改事件
        await this.triggerLanguageChange(languageCode);
        
        return true;
    }
    
    /**
     * Get content for a specific file in the current language | 获取当前语言中特定文件的内容
     * @param {string} fileName - Name of the content file | 内容文件名
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     * @returns {Object|null} Content data or null if not found | 内容数据，如果未找到则为null
     */
    getContent(fileName, language = null) {
        const lang = language || this.currentLanguage;
        console.log(`Getting content for ${fileName} in language ${lang}`);
        console.log('Available content keys:', Object.keys(this.contentData[lang] || {}));
        
        if (!this.contentData[lang]) {
            console.warn(`No content data available for language: ${lang}`);
            return null;
        }
        
        if (!this.contentData[lang][fileName]) {
            console.warn(`Content not found for ${fileName} in language ${lang}`);
            return null;
        }
        
        console.log(`Successfully retrieved content for ${fileName} in language ${lang}`);
        return this.contentData[lang][fileName];
    }
    
    /**
     * Get static text for UI elements | 获取UI元素的静态文本
     * @param {string} key - Text key | 文本键
     * @param {Object} params - Parameters for text interpolation | 文本插值的参数
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     * @returns {string} Static text | 静态文本
     */
    getText(key, params = {}, language = null) {
        const lang = language || this.currentLanguage;
        
        if (!this.staticTexts[lang] || !this.staticTexts[lang][key]) {
            console.warn(`Static text not found for key: ${key} in language: ${lang}`);
            return key; // Return key as fallback | 返回键作为回退
        }
        
        let text = this.staticTexts[lang][key];
        
        // Replace parameters in text | 替换文本中的参数
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp(`{${param}}`, 'g'), params[param]);
        });
        
        return text;
    }
    
    /**
     * Update home page content with hot switching | 使用热切换更新主页内容
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     */
    updateHomeContent(language = null) {
        const lang = language || this.currentLanguage;
        console.log(`Updating home content for language: ${lang}`);
        
        // Check if home content structure exists, if not, load it | 检查主页内容结构是否存在，如果不存在，则加载它
        const homeSection = document.getElementById('home-section');
        if (homeSection && !homeSection.querySelector('.home-content-wrapper')) {
            console.log('Home content structure not found, loading it...');
            if (window.loadHomeContent) {
                window.loadHomeContent();
            }
        }
        
        // Update personal info | 更新个人信息
        this.updatePersonalInfo(lang);
        
        // Update intro content | 更新介绍内容
        this.updateIntroContent(lang);
        
        // Update news content | 更新新闻内容
        this.updateNewsContent(lang);
        
        // Update section titles | 更新部分标题
        const introTitle = document.getElementById('intro-title');
        const newsTitle = document.getElementById('news-title');
        
        if (introTitle) {
            introTitle.textContent = this.getText('aboutMe', {}, lang);
        }
        
        if (newsTitle) {
            newsTitle.textContent = this.getText('news', {}, lang);
        }
        
        console.log('Home content updated successfully');
    }
    
    /**
     * Update experiences page content with hot switching | 使用热切换更新经历页面内容
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     */
    updateExperiencesContent(language = null) {
        const lang = language || this.currentLanguage;
        console.log(`Updating experiences content for language: ${lang}`);
        
        // Get data for each tab to check if they should be hidden | 获取每个标签页的数据以检查是否应该隐藏
        const employmentData = this.getContent('employment', lang);
        const honorsData = this.getContent('honors', lang);
        const teachingData = this.getContent('teaching', lang);
        const reviewerData = this.getContent('reviewer', lang);
        
        // Update section title
        const sectionTitle = document.querySelector('#experiences-section .section-title h2');
        if (sectionTitle) {
            sectionTitle.textContent = this.getText('experiences', {}, lang);
        }
        
        // Update tab buttons visibility and text
        const employmentTab = document.querySelector('#experiences-section .tab-button[data-tab="employment"]');
        const honorsTab = document.querySelector('#experiences-section .tab-button[data-tab="honors-awards"]');
        const teachingTab = document.querySelector('#experiences-section .tab-button[data-tab="teaching"]');
        const reviewerTab = document.querySelector('#experiences-section .tab-button[data-tab="reviewer"]');
        
        // Handle employment tab | 处理就业标签页
        if (employmentTab) {
            if (employmentData && employmentData.length > 0) {
                employmentTab.style.display = '';
                employmentTab.textContent = this.getText('employment', {}, lang);
            } else {
                employmentTab.style.display = 'none';
            }
        }
        
        // Handle honors tab | 处理荣誉标签页
        if (honorsTab) {
            if (honorsData && honorsData.length > 0) {
                honorsTab.style.display = '';
                honorsTab.textContent = this.getText('honorsAndAwards', {}, lang);
            } else {
                honorsTab.style.display = 'none';
            }
        }
        
        // Handle teaching tab | 处理教学标签页
        if (teachingTab) {
            if (teachingData && teachingData.length > 0) {
                teachingTab.style.display = '';
                teachingTab.textContent = this.getText('teaching', {}, lang);
            } else {
                teachingTab.style.display = 'none';
            }
        }
        
        // Handle reviewer tab | 处理审稿人标签页
        if (reviewerTab) {
            if (reviewerData && reviewerData.length > 0) {
                reviewerTab.style.display = '';
                reviewerTab.textContent = this.getText('reviewer', {}, lang);
            } else {
                reviewerTab.style.display = 'none';
            }
        }
        
        // Update education content if education tab is active | 如果教育标签页处于活动状态，则更新教育内容
        const educationPane = document.getElementById('education');
        
        if (educationPane && educationPane.classList.contains('active')) {
            this.updateEducationContent(lang);
        }
        
        // Update employment content if employment tab is active | 如果就业标签页处于活动状态，则更新就业内容
        const employmentPane = document.getElementById('employment');
        
        if (employmentPane && employmentPane.classList.contains('active')) {
            this.updateEmploymentContent(lang);
        }

        // Update honors and awards content if honors tab is active | 如果荣誉标签页处于活动状态，则更新荣誉和奖励内容
        const honorsPane = document.getElementById('honors-awards');
        
        if (honorsPane && honorsPane.classList.contains('active')) {
            this.updateHonorsContent(lang);
        }

        // Update teaching content if teaching tab is active | 如果教学标签页处于活动状态，则更新教学内容
        const teachingPane = document.getElementById('teaching');
        
        if (teachingPane && teachingPane.classList.contains('active')) {
            this.updateTeachingContent(lang);
        }
        
        // Update reviewer content if reviewer tab is active | 如果审稿人标签页处于活动状态，则更新审稿人内容
        const reviewerPane = document.getElementById('reviewer');
        
        if (reviewerPane && reviewerPane.classList.contains('active')) {
            this.updateReviewerContent(lang);
        }
        
        console.log('Experiences content updated successfully');
    }
    
    /**
     * Update education content with hot switching | 使用热切换更新教育内容
     * @param {string} language - Language code | 语言代码
     */
    updateEducationContent(language) {
        console.log(`Updating education content for language: ${language}`);
        const educationData = this.getContent('education', language);
        console.log('Education data retrieved:', educationData);
        
        if (!educationData) {
            console.error(`No education data found for language: ${language}`);
            return;
        }
        
        const container = document.getElementById('education-modules-container');
        if (!container) {
            console.warn('Education modules container not found');
            return;
        }
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create modules using the function from experiences.js
        if (window.createEducationModule) {
            educationData.forEach(edu => {
                const module = window.createEducationModule(edu);
                container.appendChild(module);
            });
        } else {
            console.error('createEducationModule function not available');
        }
        
        console.log('Education content updated successfully');
    }

    /**
     * Update employment content with hot switching | 使用热切换更新就业内容
     * @param {string} language - Language code | 语言代码
     */
    updateEmploymentContent(language) {
        console.log(`Updating employment content for language: ${language}`);
        const employmentData = this.getContent('employment', language);
        console.log('Employment data retrieved:', employmentData);
        
        if (!employmentData) {
            console.error(`No employment data found for language: ${language}`);
            return;
        }
        
        const container = document.getElementById('employment-modules-container');
        if (!container) {
            console.warn('Employment modules container not found');
            return;
        }
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create modules using the function from experiences.js
        if (window.createEmploymentModule) {
            employmentData.forEach(job => {
                const module = window.createEmploymentModule(job);
                container.appendChild(module);
            });
        } else {
            console.error('createEmploymentModule function not available');
        }
        
        console.log('Employment content updated successfully');
    }

    /**
     * Update honors and awards content with hot switching | 使用热切换更新荣誉和奖励内容
     * @param {string} language - Language code | 语言代码
     */
    updateHonorsContent(language) {
        console.log(`Updating honors and awards content for language: ${language}`);
        const honorsData = this.getContent('honors', language);
        console.log('Honors and awards data retrieved:', honorsData);
        
        if (!honorsData) {
            console.error(`No honors and awards data found for language: ${language}`);
            return;
        }
        
        const container = document.getElementById('honors-awards-modules-container');
        if (!container) {
            console.warn('Honors and awards container not found');
            return;
        }
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create modules using the function from experiences.js
        if (window.createHonorModule) {
            honorsData.forEach(honor => {
                const module = window.createHonorModule(honor);
                container.appendChild(module);
            });
        } else {
            console.error('createHonorModule function not available');
        }
        
        console.log('Honors and awards content updated successfully');
    }
    
    /**
     * Update teaching content with hot switching | 使用热切换更新教学内容
     * @param {string} language - Language code | 语言代码
     */
    updateTeachingContent(language) {
        console.log(`Updating teaching content for language: ${language}`);
        const teachingData = this.getContent('teaching', language);
        console.log('Teaching data retrieved:', teachingData);
        
        if (!teachingData) {
            console.error(`No teaching data found for language: ${language}`);
            return;
        }
        
        const container = document.getElementById('teaching-modules-container');
        if (!container) {
            console.warn('Teaching modules container not found');
            return;
        }
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create modules using the function from experiences.js
        if (window.createTeachingModule) {
            teachingData.forEach(teaching => {
                const module = window.createTeachingModule(teaching);
                container.appendChild(module);
            });
        } else {
            console.error('createTeachingModule function not available');
        }
        
        console.log('Teaching content updated successfully');
    }
    
    /**
     * Update reviewer content with hot switching | 使用热切换更新审稿人内容
     * @param {string} language - Language code | 语言代码
     */
    updateReviewerContent(language) {
        console.log(`Updating reviewer content for language: ${language}`);
        const reviewerData = this.getContent('reviewer', language);
        console.log('Reviewer data retrieved:', reviewerData);
        
        if (!reviewerData) {
        console.warn(`No reviewer data found for language: ${language}`);
        return;
    }
    
    const container = document.getElementById('reviewer-modules-container');
    if (!container) {
        console.warn('Reviewer modules container not found');
        return;
    }
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create modules using the function from experiences.js
        if (window.createReviewerModule) {
            const module = window.createReviewerModule(reviewerData);
            container.appendChild(module);
        } else {
            console.error('createReviewerModule function not available');
        }
        
        console.log('Reviewer content updated successfully');
    }

    /**
     * Update publications page content with hot switching | 使用热切换更新出版物页面内容
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     */
    updatePublicationsContent(language = null) {
        const lang = language || this.currentLanguage;
        console.log(`Updating publications content for language: ${lang}`);
        
        // Get data for each tab to check if they should be hidden | 获取每个标签页的数据以检查是否应该隐藏
        const patentData = this.getContent('patent', lang);
        
        // Update section title
        const sectionTitle = document.querySelector('#publications-section .section-title h2');
        if (sectionTitle) {
            sectionTitle.textContent = this.getText('publications', {}, lang);
        }
        
        // Update tab buttons visibility and text
        const paperTab = document.querySelector('#publications-section .tab-button[data-tab="paper"]');
        const patentTab = document.querySelector('#publications-section .tab-button[data-tab="patent"]');
        
        if (paperTab) paperTab.textContent = this.getText('academicPapers', {}, lang);
        
        // Handle patent tab | 处理专利标签页
        if (patentTab) {
            if (patentData && patentData.length > 0) {
                patentTab.style.display = '';
                patentTab.textContent = this.getText('patents', {}, lang);
            } else {
                patentTab.style.display = 'none';
            }
        }
        
        // Update publications content if publications tab is active | 如果出版物标签页处于活动状态，则更新出版物内容
        const paperPane = document.getElementById('paper');
        
        if (paperPane && paperPane.classList.contains('active')) {
            this.updatePaperContent(lang);
        }
        
        // Update patents content if patents tab is active | 如果专利标签页处于活动状态，则更新专利内容
        const patentPane = document.getElementById('patent');
        
        if (patentPane && patentPane.classList.contains('active')) {
            this.updatePatentContent(lang);
        }
        
        console.log('Publications content updated successfully');
    }
    
    /**
     * Update paper content with hot switching | 使用热切换更新论文内容
     * @param {string} language - Language code | 语言代码
     */
    updatePaperContent(language) {
        console.log(`Updating paper content for language: ${language}`);
        const papersData = this.getContent('paper', language); // Changed from 'papers' to 'paper' to match load.js
        console.log('Papers data retrieved:', papersData);
        
        if (!papersData) {
            console.error(`No papers data found for language: ${language}`);
            return;
        }
        
        const paperModulesContainer = document.getElementById('paper-modules-container');
        if (!paperModulesContainer) {
            console.warn('Paper modules container not found');
            return;
        }
        
        // Clear existing content | 清除现有内容
        paperModulesContainer.innerHTML = '';
        
        // Create paper module using the createPaperModule function from publications.js | 使用publications.js中的createPaperModule函数创建论文模块
        if (window.createPaperModule) {
            const paperModule = window.createPaperModule(papersData);
            paperModulesContainer.appendChild(paperModule);
            console.log('Paper module added to container');
        } else {
            console.warn('createPaperModule function not found');
        }
        
        console.log('Paper content updated successfully');
    }

    /**
     * Update patent content with hot switching | 使用热切换更新专利内容
     * @param {string} language - Language code | 语言代码
     */
    updatePatentContent(language) {
        console.log(`Updating patent content for language: ${language}`);
        const patentData = this.getContent('patent', language); // Changed from 'patents' to 'patent' to match load.js
        console.log('Patents data retrieved:', patentData);
        
        if (!patentData) {
            console.error(`No patents data found for language: ${language}`);
            return;
        }
        
        const container = document.getElementById('patent-modules-container');
        if (!container) {
            console.warn('Patent modules container not found');
            return;
        }
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create modules using the function from publications.js
        if (window.createPatentModule) {
            console.log(patentData)
            patentData.forEach(patent => {
                const module = window.createPatentModule(patent);
                container.appendChild(module);
            });
        } else {
            console.error('createPatentModule function not available');
        }
        
        console.log('Patent content updated successfully');
    }
    
    /**
     * Update personal info with hot switching | 使用热切换更新个人信息
     * @param {string} language - Language code | 语言代码
     */
    updatePersonalInfo(language) {
        console.log(`Updating personal info for language: ${language}`);
        const infoData = this.getContent('info', language);
        console.log('Info data retrieved:', infoData);
        
        if (!infoData) {
            console.warn(`No info data found for language: ${language}`);
            return;
        }
        
        let infoContent = document.getElementById('info-content');
        if (!infoContent) {
            console.warn('Info content element not found, attempting to load home content structure');
            // Try to load home content structure if element is missing | 如果元素缺失，尝试加载主页内容结构
            if (window.loadHomeContent) {
                window.loadHomeContent();
                // Get the element again after loading structure | 加载结构后再次获取元素
                infoContent = document.getElementById('info-content');
            }
            
            // If still not found, return | 如果仍然找不到，则返回
            if (!infoContent) {
                console.warn('Info content element still not found after loading home structure');
                return;
            }
        }
        
        const timezoneOffset = infoData.UTC ? parseInt(infoData.UTC) : 8;
        
        infoContent.innerHTML = `
            <h2>${infoData.name}</h2>
            <div class="info-item">
                <img src="images/homepage/info icon/location.png" alt="Location" class="info-icon">
                <span>${infoData.address}</span>
            </div>
            <div class="info-item">
                <img src="images/homepage/info icon/school.png" alt="School" class="info-icon">
                <span>${infoData.institution}</span>
            </div>
            <div class="info-item">
                <img src="images/homepage/info icon/google scholar.png" alt="Google Scholar" class="info-icon">
                <a href="${infoData.googlescholar}" target="_blank">${this.getText('googleScholar', {}, language)}</a>
            </div>
            <div class="info-item">
                <img src="images/homepage/info icon/github.png" alt="GitHub" class="info-icon">
                <a href="${infoData.github}" target="_blank">GitHub</a>
            </div>
            <div class="info-item">
                <img src="images/homepage/info icon/email.png" alt="Email" class="info-icon">
                <a href="mailto:${infoData.email}">${infoData.email}</a>
            </div>
            <div class="info-item">
                <img src="images/homepage/info icon/time.png" alt="Current Time" class="info-icon">
                <span id="current-time"></span>
            </div>
        `;
        
        // Update time | 更新时间
        this.updateTime(timezoneOffset);
        console.log('Personal info updated successfully');
    }
    
    /**
     * Update intro content with hot switching | 使用热切换更新介绍内容
     * @param {string} language - Language code | 语言代码
     */
    updateIntroContent(language) {
        console.log(`Updating intro content for language: ${language}`);
        const introData = this.getContent('intro', language);
        console.log('Intro data retrieved:', introData);
        
        if (!introData) {
            console.warn(`No intro data found for language: ${language}`);
            return;
        }
        
        let introContent = document.getElementById('intro-content');
        if (!introContent) {
            console.warn('Intro content element not found, attempting to load home content structure');
            // Try to load home content structure if element is missing | 如果元素缺失，尝试加载主页内容结构
            if (window.loadHomeContent) {
                window.loadHomeContent();
                // Get the element again after loading structure | 加载结构后再次获取元素
                introContent = document.getElementById('intro-content');
            }
            
            // If still not found, return | 如果仍然找不到，则返回
            if (!introContent) {
                console.warn('Intro content element still not found after loading home structure');
                return;
            }
        }
        
        // Convert line breaks to paragraphs | 将换行符转换为段落
        const paragraphs = introData.split('\n').filter(p => p.trim() !== '');
        introContent.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
        console.log('Intro content updated successfully');
    }
    
    /**
     * Update news content with hot switching | 使用热切换更新新闻内容
     * @param {string} language - Language code | 语言代码
     */
    updateNewsContent(language) {
        console.log(`Updating news content for language: ${language}`);
        const newsData = this.getContent('news', language);
        console.log('News data retrieved:', newsData);
        
        if (!newsData) {
            console.warn(`No news data found for language: ${language}`);
            return;
        }
        
        let newsContent = document.getElementById('news-content');
        if (!newsContent) {
            console.warn('News content element not found, attempting to load home content structure');
            // Try to load home content structure if element is missing | 如果元素缺失，尝试加载主页内容结构
            if (window.loadHomeContent) {
                window.loadHomeContent();
                // Get the element again after loading structure | 加载结构后再次获取元素
                newsContent = document.getElementById('news-content');
            }
            
            // If still not found, return | 如果仍然找不到，则返回
            if (!newsContent) {
                console.warn('News content element still not found after loading home structure');
                return;
            }
        }
        
        // Sort news by date (newest first) | 按日期排序新闻（最新的在前）
        newsData.sort((a, b) => new Date(b.time) - new Date(a.time));
        
        let newsHTML = '<ul class="news-list">';
        newsData.forEach((item, index) => {
            // Format date from YYYY-MM-DD to locale-specific format | 将日期从YYYY-MM-DD格式化为特定于地区的格式
            const dateObj = new Date(item.time);
            const formattedDate = this.formatDate(dateObj, language);
            
            // Add "Latest" label to the first (most recent) news item | 为第一个（最近的）新闻项添加"最新"标签
            const latestLabel = index === 0 ? 
                `<span class="latest-label">${this.getText('latest', {}, language)}</span>` : '';
            
            newsHTML += `
                <li class="news-item">
                    <div class="news-date">${formattedDate}${latestLabel}</div>
                    <div class="news-content">${item.content}</div>
                </li>
            `;
        });
        newsHTML += '</ul>';
        
        newsContent.innerHTML = newsHTML;
        console.log('News content updated successfully');
    }
    
    /**
     * Update time dynamically | 动态更新时间
     * @param {number} timezoneOffset - Timezone offset in hours | 时区偏移量（小时）
     */
    updateTime(timezoneOffset) {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const currentTime = new Date(utc + (3600000 * timezoneOffset));
        
        // Format time as HH:MM (UTC+08:00) - same format for both languages | 格式化时间为HH:MM (UTC+08:00) - 两种语言使用相同格式
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const timezoneString = (timezoneOffset >= 0 ? '+' : '') + timezoneOffset.toString().padStart(2, '0');
        const timeString = `${hours}:${minutes} (UTC${timezoneString}:00)`;
        
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }
    
    /**
     * Format date based on language | 根据语言格式化日期
     * @param {Date} date - Date object | 日期对象
     * @param {string} language - Language code | 语言代码
     * @returns {string} Formatted date string | 格式化的日期字符串
     */
    formatDate(date, language) {
        const locale = language === 'zh' ? 'zh-CN' : 'en-US';
        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    
    /**
     * Update navigation links with hot switching | 使用热切换更新导航链接
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     */
    updateNavigationLinks(language = null) {
        const lang = language || this.currentLanguage;
        
        if (!window.navElements || !window.navElements.navLinks) return;
        
        const navLinks = window.navElements.navLinks.querySelectorAll('a');
        
        // Update link texts | 更新链接文本
        if (navLinks[0]) navLinks[0].textContent = this.getText('navHome', {}, lang);
        if (navLinks[1]) navLinks[1].textContent = this.getText('navExperiences', {}, lang);
        if (navLinks[2]) navLinks[2].textContent = this.getText('navPublications', {}, lang);
    }
    
    /**
     * Update footer text with hot switching | 使用热切换更新页脚文本
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     */
    updateFooterText(language = null) {
        const lang = language || this.currentLanguage;
        
        if (window.footerElement && window.footerElement.copyrightText) {
            const currentYear = window.footerElement.currentYear;
            const copyrightText = this.getText('copyright', { year: currentYear }, lang);
            window.footerElement.copyrightText.innerHTML = copyrightText;
        }
    }
    
    /**
     * Update language switch button text with hot switching | 使用热切换更新语言切换按钮文本
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     */
    updateLanguageSwitchText(language = null) {
        // Check if language switch button exists | 检查语言切换按钮是否存在
        if (!window.navElements || !window.navElements.langSwitch) {
            console.log('Language switch button not found, likely in single language mode');
            return;
        }
        
        const lang = language || this.currentLanguage;
        
        // Show the language to switch to | 显示要切换到的语言
        const switchToLangText = this.staticTexts[lang] ? 
            this.staticTexts[lang].langSwitchTo : 
            (lang === 'en' ? '中' : 'EN');
        
        window.navElements.langSwitch.textContent = switchToLangText;
        console.log(`Language switch button updated to show language to switch to: ${switchToLangText}`);
    }
    
    /**
     * Update navigation name with hot switching | 使用热切换更新导航栏名称
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     */
    async updateNavigationName(language = null) {
        const lang = language || this.currentLanguage;
        
        try {
            // Use appropriate config file based on language | 根据语言使用适当的配置文件
            const infoFile = lang === 'zh' ? 'info_zh.json' : 'info_en.json';
            const infoPath = `configs/${lang}/${infoFile}`;
            console.log(`Loading navigation name from: ${infoPath}`);
            
            const response = await fetch(infoPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const userInfo = await response.json();
            console.log('User info loaded successfully for navigation:', userInfo);
            
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
            console.error('Error updating navigation name:', error);
        }
    }
    
    /**
     * Update mobile tab labels with hot switching | 使用热切换更新移动端标签页标签
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     */
    updateMobileTabLabels(language = null) {
        const lang = language || this.currentLanguage;
        console.log(`Updating mobile tab labels for language: ${lang}`);
        
        // Update experiences section tabs | 更新经历部分标签页
        const experiencesSection = document.getElementById('experiences-section');
        if (experiencesSection) {
            // Get the currently active tab | 获取当前活动标签页
            const activeTabPane = experiencesSection.querySelector('.tab-pane.active');
            let activeTabId = 'education'; // Default to education | 默认为教育
            
            if (activeTabPane) {
                activeTabId = activeTabPane.id;
            }
            
            // Update compact tab trigger button | 更新紧凑型标签页触发按钮
            const compactTabTrigger = experiencesSection.querySelector('.compact-tab-button');
            if (compactTabTrigger) {
                // Get the appropriate text based on the active tab | 根据活动标签页获取适当的文本
                let labelText = '';
                switch (activeTabId) {
                    case 'employment':
                        labelText = this.getText('employment', {}, lang);
                        break;
                    case 'education':
                        labelText = this.getText('education', {}, lang);
                        break;
                    case 'honors-awards':
                        labelText = this.getText('honorsAndAwards', {}, lang);
                        break;
                    case 'teaching':
                        labelText = this.getText('teaching', {}, lang);
                        break;
                    case 'reviewer':
                        labelText = this.getText('reviewer', {}, lang);
                        break;
                    default:
                        labelText = this.getText('education', {}, lang);
                }
                compactTabTrigger.textContent = labelText;
            }
            
            // Update compact tab options | 更新紧凑型标签页选项
            const compactTabOptions = experiencesSection.querySelectorAll('.compact-tab-option');
            compactTabOptions.forEach(option => {
                const tabId = option.getAttribute('data-tab');
                let optionText = '';
                switch (tabId) {
                    case 'employment':
                        optionText = this.getText('employment', {}, lang);
                        break;
                    case 'education':
                        optionText = this.getText('education', {}, lang);
                        break;
                    case 'honors-awards':
                        optionText = this.getText('honorsAndAwards', {}, lang);
                        break;
                    case 'teaching':
                        optionText = this.getText('teaching', {}, lang);
                        break;
                    case 'reviewer':
                        optionText = this.getText('reviewer', {}, lang);
                        break;
                    default:
                        optionText = this.getText('education', {}, lang);
                }
                option.textContent = optionText;
            });
        }
        
        // Update publications section tabs | 更新发表物部分标签页
        const publicationsSection = document.getElementById('publications-section');
        if (publicationsSection) {
            // Get the currently active tab | 获取当前活动标签页
            const activeTabPane = publicationsSection.querySelector('.tab-pane.active');
            let activeTabId = 'paper'; // Default to paper | 默认为论文
            
            if (activeTabPane) {
                activeTabId = activeTabPane.id;
            }
            
            // Update compact tab trigger button | 更新紧凑型标签页触发按钮
            const compactTabTrigger = publicationsSection.querySelector('.compact-tab-button');
            if (compactTabTrigger) {
                // Get the appropriate text based on the active tab | 根据活动标签页获取适当的文本
                let labelText = '';
                switch (activeTabId) {
                    case 'paper':
                        labelText = this.getText('academicPapers', {}, lang);
                        break;
                    case 'patent':
                        labelText = this.getText('patents', {}, lang);
                        break;
                    default:
                        labelText = this.getText('academicPapers', {}, lang);
                }
                compactTabTrigger.textContent = labelText;
            }
            
            // Update compact tab options | 更新紧凑型标签页选项
            const compactTabOptions = publicationsSection.querySelectorAll('.compact-tab-option');
            compactTabOptions.forEach(option => {
                const tabId = option.getAttribute('data-tab');
                let optionText = '';
                switch (tabId) {
                    case 'paper':
                        optionText = this.getText('academicPapers', {}, lang);
                        break;
                    case 'patent':
                        optionText = this.getText('patents', {}, lang);
                        break;
                    default:
                        optionText = this.getText('academicPapers', {}, lang);
                }
                option.textContent = optionText;
            });
        }
        
        console.log('Mobile tab labels updated successfully');
    }

    /**
     * Trigger language change event with hot switching | 触发热切换语言更改事件
     * @param {string} language - Language code (optional, defaults to current) | 语言代码（可选，默认为当前语言）
     */
    async triggerLanguageChange(language = null) {
        const lang = language || this.currentLanguage;
        
        // Update all UI elements | 更新所有UI元素
        this.updateHomeContent(lang);
        this.updateExperiencesContent(lang);
        this.updatePublicationsContent(lang);
        this.updateReviewerContent(lang);
        this.updateNavigationLinks(lang);
        this.updateFooterText(lang);
        this.updateLanguageSwitchText(lang);
        this.updateMobileTabLabels(lang);
        
        // Update navigation name | 更新导航栏名称
        await this.updateNavigationName(lang);
        
        // Trigger custom event | 触发自定义事件
        const event = new CustomEvent('languageChange', {
            detail: { language: this.currentLanguage }
        });
        document.dispatchEvent(event);
    }
}

// Create and export language manager instance | 创建并导出语言管理器实例
window.languageManager = new LanguageManager();

// Export for use in other modules | 导出供其他模块使用
window.LanguageManager = LanguageManager;

// Global functions for backward compatibility | 向后兼容的全局函数
window.getText = function(key, params = {}) {
    return window.languageManager.getText(key, params);
};

window.getCurrentLanguage = function() {
    return window.languageManager.getCurrentLanguage();
};