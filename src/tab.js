// Written by Constantine Heinrich CHEN (ConsHein CHEN)
// Last Updated: 2025-10-29

// 通用标签页组件 | Universal Tab Component
// 可被experiences和publications页面调用 | Can be called by experiences and publications pages

/*
使用示例 | Usage Example:

// 示例1：experiences.js中使用 - 自动内容检测 | Usage in experiences.js - Automatic content detection
/*
const experiencesTabOptions = {
    containerId: 'experiences-container',
    sectionTitle: window.languageManager ? window.languageManager.getText('experiences') : 'Experiences',
    tabs: [
        {
            id: 'education',
            label: 'Education',
            containerId: 'education-content',
            contentLoader: loadEducationModules
            // 系统会自动检查education-content元素是否有内容 | System will auto-check if education-content element has content
        },
        {
            id: 'employment',
            label: 'Employment',
            containerId: 'employment-content',
            contentLoader: loadEmploymentModules
            // 自动检测内容 | Automatic content detection
        },
        {
            id: 'honors',
            label: 'Honors and Awards',
            containerId: 'honors-content',
            contentLoader: loadHonorsModules
        },
        {
            id: 'teaching',
            label: 'Teaching',
            containerId: 'teaching-content',
            contentLoader: loadTeachingModules
        },
        {
            id: 'reviewer',
            label: 'Reviewer',
            containerId: 'reviewer-content',
            contentLoader: loadReviewerModules
        }
    ],
    activeTab: 'education',
    sectionName: 'experiences'
};

const experiencesHtml = window.createTabComponent(experiencesTabOptions);
*/

// 示例2：publications.js中使用 - 自动内容检测 | Usage in publications.js - Automatic content detection
/*
const publicationsTabOptions = {
    containerId: 'publications-container',
    sectionTitle: window.languageManager ? window.languageManager.getText('publications') : 'Publications',
    tabs: [
        {
            id: 'papers',
            label: 'Academic Papers',
            containerId: 'papers-content',
            contentLoader: loadPapersModules
            // 如果papers-content为空，此标签页将自动隐藏 | If papers-content is empty, this tab will be auto-hidden
        },
        {
            id: 'patents',
            label: 'Patents',
            containerId: 'patents-content',
            contentLoader: loadPatentsModules
        }
    ],
    activeTab: 'papers',
    sectionName: 'publications'
};

const publicationsHtml = window.createTabComponent(publicationsTabOptions);
*/

// 示例3：简化示例 - 纯自动内容检测 | Simplified example - Pure automatic content detection
/*
const simpleTabOptions = {
    containerId: 'simple-container',
    sectionTitle: 'Simple Tabs',
    tabs: [
        {
            id: 'tab1',
            label: 'Tab 1',
            containerId: 'tab1-content',
            contentLoader: loadTab1Content
            // 系统自动检查tab1-content是否有内容 | System auto-checks if tab1-content has content
        },
        {
            id: 'tab2',
            label: 'Tab 2',
            containerId: 'tab2-content',
            contentLoader: loadTab2Content
            // 如果tab2-content为空或不存在，此标签页将被自动隐藏 | If tab2-content is empty or doesn't exist, this tab will be auto-hidden
        }
    ],
    activeTab: 'tab1',
    sectionName: 'simple'
};

const simpleHtml = window.createTabComponent(simpleTabOptions);
*/

// 示例4：混合使用 - 部分使用自定义检测，部分使用自动检测 | Example 4: Mixed usage - Some use custom detection, some use automatic detection
/*
const mixedTabOptions = {
    containerId: 'mixed-container',
    sectionTitle: 'Mixed Tabs',
    tabs: [
        {
            id: 'tab1',
            label: 'Tab 1',
            containerId: 'tab1-content',
            contentLoader: loadTab1Content
            // 使用自动检测 | Using automatic detection
        },
        {
            id: 'tab2',
            label: 'Tab 2',
            containerId: 'tab2-content',
            contentLoader: loadTab2Content,
            // 使用自定义检测 | Using custom detection
            hasContent: function() {
                // 自定义检测逻辑 | Custom detection logic
                return window.customCondition && document.getElementById('tab2-content').children.length > 0;
            }
        },
        {
            id: 'tab3',
            label: 'Tab 3',
            contentLoader: loadTab3Content
            // 没有containerId，默认显示 | No containerId, shown by default
        }
    ],
    activeTab: 'tab1',
    sectionName: 'mixed'
};

const mixedHtml = window.createTabComponent(mixedTabOptions);
*/

// 示例5：最简示例 - 仅使用自动检测 | Example 5: Minimal example - Only using automatic detection
/*
const minimalTabOptions = {
    containerId: 'minimal-container',
    sectionTitle: 'Minimal Tabs',
    tabs: [
        {
            id: 'tab1',
            label: 'Tab 1',
            containerId: 'tab1-content'
            // 仅指定containerId，系统自动处理内容检测 | Only specify containerId, system handles content detection automatically
        },
        {
            id: 'tab2',
            label: 'Tab 2',
            containerId: 'tab2-content'
        }
    ],
    activeTab: 'tab1',
    sectionName: 'minimal'
};

const minimalHtml = window.createTabComponent(minimalTabOptions);
*/

/**
 * 通用标签页组件 | Universal Tab Component
 * 支持多主题、多语言、动态内容加载和自动内容检测 | Supports multi-theme, multi-language, dynamic content loading and automatic content detection
 */

/**
 * 检查标签页内容是否存在 | Check if tab content exists
 * @param {string} contentId - 内容容器的ID | Content container ID
 * @returns {boolean} - 内容是否存在 | Whether content exists
 */
function checkContentExists(contentId) {
    // 如果没有提供contentId，默认返回true（显示标签页）| If no contentId provided, default to true (show tab)
    if (!contentId) return true;
    
    // 尝试获取内容容器 | Try to get content container
    const contentElement = document.getElementById(contentId);
    if (!contentElement) return true; // 如果容器不存在，默认显示 | If container doesn't exist, show by default
    
    // 检查容器是否有内容 | Check if container has content
    const content = contentElement.innerHTML.trim();
    return content.length > 0;
}

/**
 * 创建标签页容器 | Create tab container
 * @param {Object} options - 标签页配置选项 | Tab configuration options
 * @param {string} options.containerId - 容器ID | Container ID
 * @param {string} options.sectionTitle - 章节标题 | Section title
 * @param {Array} options.tabs - 标签页数组 | Array of tabs
 * @param {string} options.tabs[].id - 标签页ID | Tab ID
 * @param {string} options.tabs[].label - 标签页标签 | Tab label
 * @param {string} options.tabs[].containerId - 内容容器ID | Content Container ID
 * @param {Function} options.tabs[].contentLoader - 内容加载函数 | Content loader function
 * @param {Function} [options.tabs[].hasContent] - 检查内容是否存在的函数 | Function to check if content exists
 * @param {string} options.activeTab - 默认激活的标签页ID | Default active tab ID
 * @param {string} options.sectionName - 章节名称，用于存储活动标签状态 | Section name for storing active tab state
 * @returns {string} HTML字符串 | HTML string
 */
function createTabContainer(options) {
    // 设置默认值 | Set default values
    const config = {
        containerId: options.containerId || 'tab-container',
        sectionTitle: options.sectionTitle || 'Section',
        tabs: options.tabs || [],
        activeTab: options.activeTab || (options.tabs && options.tabs.length > 0 ? options.tabs[0].id : ''),
        sectionName: options.sectionName || 'section'
    };
    
    // 过滤掉没有内容的标签页 | Filter out tabs without content
    const visibleTabs = config.tabs.filter(tab => {
        // 如果标签页有自定义的hasContent函数，使用它 | If tab has custom hasContent function, use it
        if (tab.hasContent && typeof tab.hasContent === 'function') {
            return tab.hasContent();
        }
        // 否则使用自动检测 | Otherwise use automatic detection
        return checkContentExists(tab.containerId);
    });
    
    // 如果所有标签页都没有内容，返回空字符串 | If all tabs have no content, return empty string
    if (visibleTabs.length === 0) {
        return '';
    }
    
    // 如果当前激活的标签页被隐藏了，选择第一个可见的标签页作为激活状态 | If the current active tab is hidden, select the first visible tab as active
    let activeTabId = config.activeTab;
    if (!visibleTabs.find(tab => tab.id === activeTabId)) {
        activeTabId = visibleTabs[0].id;
    }
    
    // 获取当前语言 | Get current language
    const currentLang = window.languageManager ? window.languageManager.getCurrentLanguage() : 'en';
    
    // 检查是否是移动设备 | Check if it's a mobile device
    const isMobile = window.innerWidth <= 768;
    
    // 返回完整的HTML | Return complete HTML
    if (isMobile) {
        // 移动端紧凑布局 | Mobile compact layout
        const activeTab = visibleTabs.find(tab => tab.id === activeTabId);
        const activeTabLabel = activeTab ? activeTab.label : '';
        
        // 构建选项列表HTML | Build options list HTML
        let optionsHtml = '';
        visibleTabs.forEach(tab => {
            const isActive = tab.id === activeTabId ? 'active' : '';
            optionsHtml += `<button class="compact-tab-option ${isActive}" data-tab="${tab.id}">${tab.label}</button>`;
        });
        
        return `
            <div class="section-title">
                <h2>${config.sectionTitle}</h2>
            </div>
            <div class="tabs-container">
                <div class="compact-tab-list">
                    <button class="compact-tab-button" id="compact-tab-trigger">${activeTabLabel}</button>
                    <div class="compact-tab-options" id="compact-tab-options">
                        ${optionsHtml}
                    </div>
                </div>
                <div class="tab-content">
                    ${visibleTabs.map(tab => `
                        <div id="${tab.id}" class="tab-pane ${tab.id === activeTabId ? 'active' : ''}">
                            <div id="${tab.containerId}"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        // 桌面端传统布局 | Desktop traditional layout
        // 构建标签页HTML | Build tab HTML
        let tabsHtml = '';
        visibleTabs.forEach(tab => {
            const isActive = tab.id === activeTabId ? 'active' : '';
            tabsHtml += `<button class="tab-button ${isActive}" data-tab="${tab.id}">${tab.label}</button>`;
        });
        
        // 构建内容面板HTML | Build content panel HTML
        let contentHtml = '';
        visibleTabs.forEach(tab => {
            const isActive = tab.id === activeTabId ? 'active' : '';
            contentHtml += `
                <div id="${tab.id}" class="tab-pane ${isActive}">
                    <div id="${tab.containerId}"></div>
                </div>
            `;
        });
        
        return `
            <div class="section-title">
                <h2>${config.sectionTitle}</h2>
            </div>
            <div class="tabs-container">
                <div class="tabs">
                    ${tabsHtml}
                </div>
                <div class="tab-content">
                    ${contentHtml}
                </div>
            </div>
        `;
    }
}

/**
 * 初始化标签页功能 | Initialize tab functionality
 * @param {Object} options - 标签页配置选项 | Tab configuration options
 * @param {Array} options.tabs - 标签页数组 | Array of tabs
 * @param {string} options.activeTab - 默认激活的标签页ID | Default active tab ID
 * @param {string} options.sectionName - 章节名称，用于存储活动标签状态 | Section name for storing active tab state
 */
function initializeTabFunctionality(options) {
    const config = {
        tabs: options.tabs || [],
        activeTab: options.activeTab || (options.tabs && options.tabs.length > 0 ? options.tabs[0].id : ''),
        sectionName: options.sectionName || 'section'
    };
    
    // 过滤掉没有内容的标签页 | Filter out tabs without content
    const visibleTabs = config.tabs.filter(tab => {
        // 如果没有提供hasContent函数，默认显示标签页 | If hasContent function is not provided, show tab by default
        if (!tab.hasContent) return true;
        
        // 调用hasContent函数检查内容是否存在 | Call hasContent function to check if content exists
        return tab.hasContent();
    });
    
    // 如果当前激活的标签页被隐藏了，选择第一个可见的标签页作为激活状态 | If the current active tab is hidden, select the first visible tab as active
    let activeTabId = config.activeTab;
    if (!visibleTabs.find(tab => tab.id === activeTabId)) {
        activeTabId = visibleTabs.length > 0 ? visibleTabs[0].id : '';
    }
    
    // 获取当前语言 | Get current language
    const currentLang = window.languageManager ? window.languageManager.getCurrentLanguage() : 'en';
    
    // 检查是否是移动设备 | Check if it's a mobile device
    const isMobile = window.innerWidth <= 768;
    
    // 延迟执行以确保DOM已更新 | Delay execution to ensure DOM is updated
    setTimeout(() => {
        if (isMobile) {
            // 移动端：初始化紧凑型标签页 | Mobile: Initialize compact-style tabs
            initMobileCompactTabs(visibleTabs, activeTabId, currentLang, config.sectionName);
        } else {
            // 桌面端：初始化传统标签页 | Desktop: Initialize traditional tabs
            initDesktopTabs(visibleTabs, activeTabId, currentLang, config.sectionName);
        }
    }, 100);
}

/**
 * 初始化移动端紧凑型标签页 | Initialize mobile compact-style tabs
 * @param {Array} visibleTabs - 可见的标签页数组 | Array of visible tabs
 * @param {string} activeTabId - 激活的标签页ID | Active tab ID
 * @param {string} currentLang - 当前语言 | Current language
 * @param {string} sectionName - 章节名称 | Section name
 */
function initMobileCompactTabs(visibleTabs, activeTabId, currentLang, sectionName) {
    // 加载初始标签页内容 | Load initial tab content
    if (activeTabId) {
        const activeTabData = visibleTabs.find(tab => tab.id === activeTabId);
        if (activeTabData && activeTabData.contentLoader) {
            activeTabData.contentLoader(activeTabData.containerId, currentLang);
        }
    }
    
    // 获取紧凑型tab按钮和选项列表 | Get compact tab button and options list
    const compactTabTrigger = document.getElementById('compact-tab-trigger');
    const compactTabOptions = document.getElementById('compact-tab-options');
    
    // 添加点击事件处理 | Add click event handler
    if (compactTabTrigger && compactTabOptions) {
        compactTabTrigger.addEventListener('click', () => {
            // 切换选项列表的显示状态 | Toggle options list visibility
            const isExpanded = compactTabTrigger.classList.contains('expanded');
            
            if (isExpanded) {
                // 如果已展开，则折叠 | If expanded, collapse it
                compactTabTrigger.classList.remove('expanded');
                compactTabOptions.classList.remove('show');
            } else {
                // 如果未展开，则展开 | If not expanded, expand it
                compactTabTrigger.classList.add('expanded');
                compactTabOptions.classList.add('show');
            }
        });
        
        // 为每个选项添加点击事件 | Add click event to each option
        const tabOptions = compactTabOptions.querySelectorAll('.compact-tab-option');
        tabOptions.forEach(option => {
            option.addEventListener('click', () => {
                const tabId = option.getAttribute('data-tab');
                const tabPane = document.getElementById(tabId);
                
                // 更新触发按钮的文本 | Update trigger button text
                const tabData = visibleTabs.find(tab => tab.id === tabId);
                if (tabData) {
                    // Update compact tab button text | 更新紧凑型标签页按钮文本
                    const tabId = button.getAttribute('data-tab');
                    
                    // 获取当前语言的文本 | Get text in current language
                    let labelText = '';
                    if (window.languageManager) {
                        // 根据标签ID获取对应语言的文本 | Get text in corresponding language based on tab ID
                        switch (tabId) {
                            case 'employment':
                                labelText = window.languageManager.getText('employment', {}, window.languageManager.currentLanguage);
                                break;
                            case 'education':
                                labelText = window.languageManager.getText('education', {}, window.languageManager.currentLanguage);
                                break;
                            case 'honors-awards':
                                labelText = window.languageManager.getText('honorsAndAwards', {}, window.languageManager.currentLanguage);
                                break;
                            case 'teaching':
                                labelText = window.languageManager.getText('teaching', {}, window.languageManager.currentLanguage);
                                break;
                            case 'reviewer':
                                labelText = window.languageManager.getText('reviewer', {}, window.languageManager.currentLanguage);
                                break;
                            case 'paper':
                                labelText = window.languageManager.getText('academicPapers', {}, window.languageManager.currentLanguage);
                                break;
                            case 'patent':
                                labelText = window.languageManager.getText('patents', {}, window.languageManager.currentLanguage);
                                break;
                            default:
                                labelText = button.textContent;
                        }
                    } else {
                        // 如果语言管理器不可用，使用原始标签 | If language manager is not available, use original label
                        labelText = button.textContent;
                    }
                    
                    compactTabButton.textContent = labelText;
                    compactTabButton.setAttribute('data-active-tab', tabId);
                }
                
                // 更新选项的活动状态 | Update option active state
                tabOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // 更新内容面板的活动状态 | Update content pane active state
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                
                if (tabPane) {
                    tabPane.classList.add('active');
                }
                
                // 折叠选项列表 | Collapse options list
                compactTabTrigger.classList.remove('expanded');
                compactTabOptions.classList.remove('show');
                
                // 加载标签页内容 | Load tab content
                if (tabData && tabData.contentLoader) {
                    tabData.contentLoader(tabData.containerId, currentLang);
                }
                
                // 存储活动标签状态 | Store active tab state
                if (typeof activeTabStates !== 'undefined') {
                    activeTabStates[sectionName] = tabId;
                }
            });
        });
    }
    
    // 点击外部区域关闭选项列表 | Close options list when clicking outside
    document.addEventListener('click', (event) => {
        if (compactTabTrigger && compactTabOptions) {
            const isClickInside = compactTabTrigger.contains(event.target) || 
                                 compactTabOptions.contains(event.target);
            
            if (!isClickInside && compactTabOptions.classList.contains('show')) {
                compactTabTrigger.classList.remove('expanded');
                compactTabOptions.classList.remove('show');
            }
        }
    });
}

/**
 * 初始化桌面端传统标签页 | Initialize desktop traditional tabs
 * @param {Array} visibleTabs - 可见的标签页数组 | Array of visible tabs
 * @param {string} activeTabId - 激活的标签页ID | Active tab ID
 * @param {string} currentLang - 当前语言 | Current language
 * @param {string} sectionName - 章节名称 | Section name
 */
function initDesktopTabs(visibleTabs, activeTabId, currentLang, sectionName) {
    // 加载初始标签页内容 | Load initial tab content
    if (activeTabId) {
        const activeTabData = visibleTabs.find(tab => tab.id === activeTabId);
        if (activeTabData && activeTabData.contentLoader) {
            activeTabData.contentLoader(activeTabData.containerId, currentLang);
        }
    }
    
    // 添加标签页切换功能 | Add tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮和面板的活动类 | Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // 为点击的按钮和对应的面板添加活动类 | Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId);
            if (tabPane) {
                tabPane.classList.add('active');
            }
            
            // 加载标签页内容 | Load tab content
            const tabData = visibleTabs.find(tab => tab.id === tabId);
            if (tabData && tabData.contentLoader) {
                tabData.contentLoader(tabData.containerId, currentLang);
            }
            
            // 存储活动标签状态 | Store active tab state
            if (typeof activeTabStates !== 'undefined') {
                activeTabStates[sectionName] = tabId;
            }
        });
    });
}

/**
 * 创建完整的标签页组件 | Create complete tab component
 * @param {Object} options - 标签页配置选项 | Tab configuration options
 * @returns {string} HTML字符串 | HTML string
 */
function createTabComponent(options) {
    // 创建标签页容器 | Create tab container
    const html = createTabContainer(options);
    
    // 初始化标签页功能 | Initialize tab functionality
    initializeTabFunctionality(options);
    
    return html;
}

// Initialize responsive tabs for a specific section | 为特定部分初始化响应式标签页
function initializeResponsiveTabs(sectionId) {
    // Get the section element | 获取部分元素
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Check if it's mobile device | 检查是否是移动设备
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // For mobile devices, convert existing tabs to compact tabs | 对于移动设备，将现有标签页转换为紧凑型标签页
        convertToMobileCompactTabs(sectionId);
    } else {
        // For desktop devices, ensure traditional tabs are visible | 对于桌面设备，确保传统标签页可见
        const tabsContainer = section.querySelector('.tabs-container');
        if (tabsContainer) {
            const tabs = tabsContainer.querySelector('.tabs');
            const compactTabList = tabsContainer.querySelector('.compact-tab-list');
            
            if (tabs) {
                tabs.style.display = 'flex';
            }
            
            if (compactTabList) {
                compactTabList.style.display = 'none';
            }
        }
    }
}

// Convert existing tabs to mobile compact tabs | 将现有标签页转换为移动端紧凑型标签页
function convertToMobileCompactTabs(sectionId) {
    // Get the section element | 获取部分元素
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Find the tabs container | 查找标签页容器
    const tabsContainer = section.querySelector('.tabs-container');
    if (!tabsContainer) return;
    
    // Check if compact tabs already exist | 检查紧凑型标签页是否已存在
    const existingCompactTabList = tabsContainer.querySelector('.compact-tab-list');
    if (existingCompactTabList) return;
    
    // Find the traditional tabs | 查找传统标签页
    const traditionalTabs = tabsContainer.querySelector('.tabs');
    if (!traditionalTabs) return;
    
    // Get all tab buttons | 获取所有标签页按钮
    const tabButtons = traditionalTabs.querySelectorAll('.tab-button');
    if (tabButtons.length === 0) return;
    
    // Create compact tab list | 创建紧凑型标签页列表
    const compactTabList = document.createElement('div');
    compactTabList.className = 'compact-tab-list';
    
    // Create compact tab button | 创建紧凑型标签页按钮
    const compactTabButton = document.createElement('button');
    compactTabButton.className = 'compact-tab-button';
    
    // Get the active tab button | 获取活动标签页按钮
    const activeTabButton = traditionalTabs.querySelector('.tab-button.active');
    const activeTabId = activeTabButton ? activeTabButton.getAttribute('data-tab') : tabButtons[0].getAttribute('data-tab');
    
    // 获取当前语言的文本 | Get text in current language
    let activeTabText = '';
    if (window.languageManager) {
        // 根据标签ID获取对应语言的文本 | Get text in corresponding language based on tab ID
        switch (activeTabId) {
            case 'employment':
                activeTabText = window.languageManager.getText('employment', {}, window.languageManager.currentLanguage);
                break;
            case 'education':
                activeTabText = window.languageManager.getText('education', {}, window.languageManager.currentLanguage);
                break;
            case 'honors-awards':
                activeTabText = window.languageManager.getText('honorsAndAwards', {}, window.languageManager.currentLanguage);
                break;
            case 'teaching':
                activeTabText = window.languageManager.getText('teaching', {}, window.languageManager.currentLanguage);
                break;
            case 'reviewer':
                activeTabText = window.languageManager.getText('reviewer', {}, window.languageManager.currentLanguage);
                break;
            case 'paper':
                activeTabText = window.languageManager.getText('academicPapers', {}, window.languageManager.currentLanguage);
                break;
            case 'patent':
                activeTabText = window.languageManager.getText('patents', {}, window.languageManager.currentLanguage);
                break;
            default:
                activeTabText = activeTabButton ? activeTabButton.textContent : tabButtons[0].textContent;
        }
    } else {
        // 如果语言管理器不可用，使用原始标签 | If language manager is not available, use original label
        activeTabText = activeTabButton ? activeTabButton.textContent : tabButtons[0].textContent;
    }
    
    // Set compact tab button text | 设置紧凑型标签页按钮文本
    compactTabButton.textContent = activeTabText;
    compactTabButton.setAttribute('data-active-tab', activeTabId);
    
    // Create tab options list | 创建标签页选项列表
    const tabOptions = document.createElement('div');
    tabOptions.className = 'compact-tab-options';
    
    // Add tab options | 添加标签页选项
    tabButtons.forEach(button => {
        const option = document.createElement('div');
        option.className = 'compact-tab-option';
        
        // 获取当前语言的文本 | Get text in current language
        const tabId = button.getAttribute('data-tab');
        let optionText = '';
        if (window.languageManager) {
            // 根据标签ID获取对应语言的文本 | Get text in corresponding language based on tab ID
            switch (tabId) {
                case 'employment':
                    optionText = window.languageManager.getText('employment', {}, window.languageManager.currentLanguage);
                    break;
                case 'education':
                    optionText = window.languageManager.getText('education', {}, window.languageManager.currentLanguage);
                    break;
                case 'honors-awards':
                    optionText = window.languageManager.getText('honorsAndAwards', {}, window.languageManager.currentLanguage);
                    break;
                case 'teaching':
                    optionText = window.languageManager.getText('teaching', {}, window.languageManager.currentLanguage);
                    break;
                case 'reviewer':
                    optionText = window.languageManager.getText('reviewer', {}, window.languageManager.currentLanguage);
                    break;
                case 'paper':
                    optionText = window.languageManager.getText('academicPapers', {}, window.languageManager.currentLanguage);
                    break;
                case 'patent':
                    optionText = window.languageManager.getText('patents', {}, window.languageManager.currentLanguage);
                    break;
                default:
                    optionText = button.textContent;
            }
        } else {
            // 如果语言管理器不可用，使用原始标签 | If language manager is not available, use original label
            optionText = button.textContent;
        }
        
        option.textContent = optionText;
        option.setAttribute('data-tab', tabId);
        
        // Mark active option | 标记活动选项
        if (button.classList.contains('active')) {
            option.classList.add('active');
        }
        
        // Add click event | 添加点击事件
        option.addEventListener('click', () => {
            // Update active state | 更新活动状态
            document.querySelectorAll('.compact-tab-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update compact tab button text | 更新紧凑型标签页按钮文本
            // 获取当前语言的文本 | Get text in current language
            let labelText = '';
            if (window.languageManager) {
                // 根据标签ID获取对应语言的文本 | Get text in corresponding language based on tab ID
                switch (tabId) {
                    case 'employment':
                        labelText = window.languageManager.getText('employment', {}, window.languageManager.currentLanguage);
                        break;
                    case 'education':
                        labelText = window.languageManager.getText('education', {}, window.languageManager.currentLanguage);
                        break;
                    case 'honors-awards':
                        labelText = window.languageManager.getText('honorsAndAwards', {}, window.languageManager.currentLanguage);
                        break;
                    case 'teaching':
                        labelText = window.languageManager.getText('teaching', {}, window.languageManager.currentLanguage);
                        break;
                    case 'reviewer':
                        labelText = window.languageManager.getText('reviewer', {}, window.languageManager.currentLanguage);
                        break;
                    case 'paper':
                        labelText = window.languageManager.getText('academicPapers', {}, window.languageManager.currentLanguage);
                        break;
                    case 'patent':
                        labelText = window.languageManager.getText('patents', {}, window.languageManager.currentLanguage);
                        break;
                    default:
                        labelText = button.textContent;
                }
            } else {
                // 如果语言管理器不可用，使用原始标签 | If language manager is not available, use original label
                labelText = button.textContent;
            }
            
            compactTabButton.textContent = labelText;
            compactTabButton.setAttribute('data-active-tab', tabId);
            
            // Hide all tab panes | 隐藏所有标签页面板
            const tabPanes = tabsContainer.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the selected tab pane | 显示选中的标签页面板
            const selectedPane = tabsContainer.querySelector(`#${tabId}`);
            if (selectedPane) {
                selectedPane.classList.add('active');
            }
            
            // Update active state on traditional tab buttons | 更新传统标签页按钮的活动状态
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Load content for the active tab | 为活动标签页加载内容
            if (window.languageManager) {
                // 根据部分ID加载相应内容 | Load content based on section ID
                if (sectionId === 'experiences-section') {
                    window.languageManager.updateExperiencesContent();
                } else if (sectionId === 'publications-section') {
                    window.languageManager.updatePublicationsContent();
                }
            }
            
            // Store the active tab state | 存储活动标签页状态
            if (typeof window.activeTabStates === 'undefined') {
                window.activeTabStates = {};
            }
            window.activeTabStates[sectionId.replace('-section', '')] = tabId;
            
            // Trigger custom event for tab change | 为标签页更改触发自定义事件
            const event = new CustomEvent('tabChange', {
                detail: {
                    section: sectionId.replace('-section', ''),
                    activeTab: tabId
                }
            });
            document.dispatchEvent(event);
            
            // Close options | 关闭选项
            tabOptions.classList.remove('show');
            compactTabList.classList.remove('expanded');
        });
        
        tabOptions.appendChild(option);
    });
    
    // Add click event to compact tab button | 为紧凑型标签页按钮添加点击事件
    compactTabButton.addEventListener('click', () => {
        // Toggle expanded state | 切换展开状态
        compactTabList.classList.toggle('expanded');
        tabOptions.classList.toggle('show');
        
        // 不再需要自动滚动，因为选项栏现在会占据实际空间并将内容向下推
        // No longer need auto-scroll, as options now take up actual space and push content down
    });
    
    // Add elements to compact tab list | 将元素添加到紧凑型标签页列表
    compactTabList.appendChild(compactTabButton);
    compactTabList.appendChild(tabOptions);
    
    // Hide traditional tabs | 隐藏传统标签页
    traditionalTabs.style.display = 'none';
    
    // Add compact tab list to container | 将紧凑型标签页列表添加到容器
    tabsContainer.appendChild(compactTabList);
    
    // Ensure the correct tab content is visible initially | 确保初始时显示正确的标签页内容
    const tabPanes = tabsContainer.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => {
        if (pane.id === activeTabId) {
            pane.classList.add('active');
        } else {
            pane.classList.remove('active');
        }
    });
    
    // Add click outside to close | 添加外部点击关闭功能
    document.addEventListener('click', function handleClickOutside(event) {
        if (!compactTabList.contains(event.target)) {
            compactTabList.classList.remove('expanded');
            tabOptions.classList.remove('show');
        }
    });
}

// 初始化响应式标签页转换 | Initialize responsive tab conversion
function initializeResponsiveTabConversion() {
    // 检查是否是移动设备 | Check if it's a mobile device
    const isMobile = window.innerWidth <= 768;
    
    // 处理经历部分 | Process experiences section
    const experiencesSection = document.getElementById('experiences-section');
    if (experiencesSection) {
        if (isMobile) {
            convertToMobileCompactTabs('experiences-section');
        } else {
            revertToTraditionalTabs('experiences-section');
        }
    }
    
    // 处理发表物部分 | Process publications section
    const publicationsSection = document.getElementById('publications-section');
    if (publicationsSection) {
        if (isMobile) {
            convertToMobileCompactTabs('publications-section');
        } else {
            revertToTraditionalTabs('publications-section');
        }
    }
}

// 恢复桌面端传统标签页 | Revert to traditional tabs for desktop
function revertToTraditionalTabs(sectionId) {
    // 获取部分元素 | Get the section element
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // 查找标签页容器 | Find the tabs container
    const tabsContainer = section.querySelector('.tabs-container');
    if (!tabsContainer) return;
    
    // 查找并移除紧凑型标签页列表 | Find and remove compact tab list
    const compactTabList = tabsContainer.querySelector('.compact-tab-list');
    if (compactTabList) {
        compactTabList.remove();
    }
    
    // 显示传统标签页 | Show traditional tabs
    const traditionalTabs = tabsContainer.querySelector('.tabs');
    if (traditionalTabs) {
        traditionalTabs.style.display = 'flex';
    }
}

// 监听窗口大小变化 | Listen for window resize
window.addEventListener('resize', () => {
    // 重新初始化响应式标签页转换 | Re-initialize responsive tab conversion
    initializeResponsiveTabConversion();
});

// Export functions for external use | 导出函数供外部使用
window.createTabComponent = createTabComponent;
window.createTabContainer = createTabContainer;
window.initializeTabFunctionality = initializeTabFunctionality;
window.initializeResponsiveTabs = initializeResponsiveTabs;
window.convertToMobileCompactTabs = convertToMobileCompactTabs;
window.initializeResponsiveTabConversion = initializeResponsiveTabConversion;
window.revertToTraditionalTabs = revertToTraditionalTabs;