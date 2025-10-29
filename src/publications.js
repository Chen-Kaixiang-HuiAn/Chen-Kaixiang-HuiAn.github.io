// Written by Constantine Heinrich CHEN (ConsHein CHEN)
// Last Updated: 2025-10-29

// Publications section content | 发表物部分内容
// Chinese text inherits English structure, only differs in nouns and data introduction | 中文内容继承英文结构，仅在名词和数据介绍上有所不同

// Load publications section content | 加载发表物部分内容
function loadPublicationsContent() {
    const currentLang = getCurrentLanguage();
    
    // Get data for each tab to check if they should be hidden | 获取每个标签页的数据以检查是否应该隐藏
    const patentData = window.languageManager ? window.languageManager.getContent('patents', currentLang) : [];
    
    // Create a container for the modules with tabs | 为带有标签页的模块创建容器
    let content = `
        <div class="section-title">
            <h2>${window.languageManager ? window.languageManager.getText('publications') : 'Publications'}</h2>
        </div>
        <div class="tabs-container">
            <div class="tabs">
                <button class="tab-button active" data-tab="paper">${window.languageManager ? window.languageManager.getText('academicPapers') : 'Academic Papers'}</button>
                ${patentData && patentData.length > 0 ? `<button class="tab-button" data-tab="patent">${window.languageManager ? window.languageManager.getText('patents') : 'Patents'}</button>` : ''}
            </div>
            <div class="tab-content">
                <div id="paper" class="tab-pane active">
                    <div id="paper-modules-container"></div>
                </div>
                ${patentData && patentData.length > 0 ? `<div id="patent" class="tab-pane">
                    <div id="patent-modules-container"></div>
                </div>` : ''}
            </div>
        </div>
    `;
    
    return content;
}

// Initialize publications section with tab functionality | 初始化带有标签页功能的发表物部分
function initializePublicationsSection() {
    // Initialize active tab states if not exists | 如果不存在，初始化活动标签页状态
    if (typeof window.activeTabStates === 'undefined') {
        window.activeTabStates = {};
    }
    
    // Get all tab buttons and panes | 获取所有标签页按钮和面板
    const tabButtons = document.querySelectorAll('#publications-section .tab-button');
    const tabPanes = document.querySelectorAll('#publications-section .tab-pane');
    
    // Check if any tabs are visible | 检查是否有任何标签页可见
    const visibleTabs = Array.from(tabButtons).filter(button => button.style.display !== 'none');
    
    // If no tabs are visible, show a message | 如果没有标签页可见，显示一条消息
    if (visibleTabs.length === 0) {
        const tabsContainer = document.querySelector('#publications-section .tabs-container');
        if (tabsContainer) {
            tabsContainer.innerHTML = `<div class="no-content-message">${window.languageManager ? window.languageManager.getText('noContentAvailable') : 'No content available'}</div>`;
        }
        return;
    }
    
    // Get the initial active tab | 获取初始活动标签页
    let activeTab = 'paper'; // Default to paper | 默认为论文
    if (window.activeTabStates.publications) {
        activeTab = window.activeTabStates.publications;
    } else {
        // Check if any tab is marked as active in HTML | 检查HTML中是否有标签页被标记为活动
        const activeButton = document.querySelector('#publications-section .tab-button.active');
        if (activeButton) {
            activeTab = activeButton.getAttribute('data-tab');
        }
    }
    
    // If the saved active tab is not visible, switch to the first visible tab | 如果保存的活动标签页不可见，切换到第一个可见的标签页
    if (!visibleTabs.find(button => button.getAttribute('data-tab') === activeTab)) {
        activeTab = visibleTabs[0].getAttribute('data-tab');
    }
    
    // Restore the last active tab if available | 如果可用，恢复上次活动的标签页
    if (window.activeTabStates.publications) {
        // Remove active class from all tabs and panes | 从所有标签页和面板中移除活动类
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Set the last active tab | 设置上次活动的标签页
        const activeButton = document.querySelector(`#publications-section .tab-button[data-tab="${activeTab}"]`);
        const activePane = document.getElementById(activeTab);    
        
        if (activeButton && activePane) {
            activeButton.classList.add('active');
            activePane.classList.add('active');
        }
    }
    
    // Load content for the active tab | 为活动标签页加载内容
    if (window.languageManager) {
        // Use the updatePublicationsContent method instead of calling individual methods
        // 使用updatePublicationsContent方法而不是调用单独的方法
        window.languageManager.updatePublicationsContent();
    }
    
    // Initialize responsive tabs for mobile devices | 为移动设备初始化响应式标签页
    if (window.initializeResponsiveTabs) {
        window.initializeResponsiveTabs('publications-section');
    }
    
    // Add tab switching functionality | 添加标签页切换功能
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes | 从所有按钮和面板中移除活动类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane | 为点击的按钮和对应的面板添加活动类
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
                activeTab = tabId;
            }
            
            // Load content for the active tab | 为活动标签页加载内容
            // Use the updatePublicationsContent method instead of calling individual methods
            // 使用updatePublicationsContent方法而不是调用单独的方法
            if (window.languageManager) {
                window.languageManager.updatePublicationsContent();
            }
            
            // Store the active tab state | 存储活动标签页状态
            window.activeTabStates.publications = tabId;
            
            // Trigger custom event for tab change | 为标签页更改触发自定义事件
            const event = new CustomEvent('tabChange', {
                detail: {
                    section: 'publications',
                    activeTab: tabId
                }
            });
            document.dispatchEvent(event);
        });
    });
}

// Function to create paper module using ModuleContainerFactory | 使用ModuleContainerFactory创建论文模块的函数
function createPaperModule(paperData) {
    // Create a container for all paper modules | 创建所有论文模块的容器
    const allPapersContainer = document.createElement('div');
    allPapersContainer.className = 'all-papers-container';
    
    // Process each paper detail | 处理每个论文详情
    // paperData is organized by year, so we need to iterate through each year and then each paper | 按年份组织，所以需要遍历每个年份，然后每个论文
    // Use Object.keys and sort to ensure descending order by year (latest first) | 使用Object.keys并排序以确保按照年份降序排列（最新的在前）
    const years = Object.keys(paperData).sort((a, b) => parseInt(b) - parseInt(a));
    
    years.forEach(year => {
        // Add year header outside of module container | 在模块容器外部添加年份标题
        const yearHeader = document.createElement('h3');
        yearHeader.textContent = year;
        yearHeader.className = 'paper-year-header';
        yearHeader.style.marginTop = '20px';
        yearHeader.style.marginBottom = '10px';
        yearHeader.style.color = 'var(--primary-color)';
        yearHeader.style.paddingBottom = '5px';
        yearHeader.style.marginLeft = '0'; // Align to the left | 靠左对齐
        // Remove borderBottom style as it's not needed | 移除borderBottom样式，不再添加下划线
        allPapersContainer.appendChild(yearHeader);
        
        paperData[year].forEach(detail => {
            // Create a separate module for each paper | 为每篇论文创建单独的模块
            const paperModule = ModuleContainerFactory.createBasicContainer({
                type: 'paper',
                className: 'paper-module'
            });
            
            // Create header with paper title | 创建带有论文标题的标题
            const header = ModuleContainerFactory.createHeader({
                title: detail.title, // Use paper title instead of "Academic Papers" | 使用论文题目而不是"学术论文"
                iconClass: 'fas fa-file-alt',
                iconColor: 'var(--paper-color)'
            });
            paperModule.contentWrapper.appendChild(header);
        
            // Create columns layout for each paper | 为每个论文创建列布局
            const columns = ModuleContainerFactory.createColumns({
                columnCount: 2,
                columnWidths: [1, 2],
                columnClasses: ['paper-logo-column', 'paper-info-column']
            });
            paperModule.contentWrapper.appendChild(columns.container);
            
            // Add paper image if available | 如果可用，添加论文图片
            if (detail.image) {
                ModuleContainerFactory.insertImage({
                    imagePath: `images/publication/${detail.image}`,
                    altText: `${detail.title} image`,
                    size: { width: '200px', height: 'auto' },
                    position: 'center',
                    container: columns.columns[0],
                    clickable: true
                });
            }
            
            // Add paper information | 添加论文信息 (remove title as it's now in header)
            const paperInfo = ModuleContainerFactory.createContent({
                content: `<p>${detail.authors}</p>` +
                        `<p><em>${detail.conference || detail.journal} (${detail.abbr})${(detail.location || detail.volume) ? `, ${detail.location || detail.volume}` : ''}</em></p>` +
                        (detail.type ? `<p><strong>${window.languageManager ? window.languageManager.getText('type', {}, window.languageManager.getCurrentLanguage()) : 'Type'}:</strong> ${detail.type}</p>` : ''),
                contentType: 'html',
                contentClass: 'education-info',
                style: {
                    lineHeight: '1.6'
                }
            });
            columns.columns[1].appendChild(paperInfo);
            
            // Create paper links container using ModuleContainerFactory
            const paperLinks = document.createElement('div');
            paperLinks.className = 'paper-links';
            paperLinks.style.marginTop = '15px';
            paperLinks.style.display = 'flex';
            paperLinks.style.flexWrap = 'wrap';
            paperLinks.style.gap = '10px';

            // Create buttons using ModuleContainerFactory.createButton
            if (detail.paperLink) {
                const paperButton = ModuleContainerFactory.createButton({
                    text: window.languageManager ? window.languageManager.getText('paper', {}, window.languageManager.getCurrentLanguage()) : 'Paper',
                    iconClass: 'fas fa-file-alt',
                    buttonClass: 'paper-button',
                    onClick: () => window.open(detail.paperLink, '_blank'),
                    style: {
                        backgroundColor: 'var(--paper-color, #4285f4)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }
                });
                paperLinks.appendChild(paperButton);
            }

            if (detail.codeLink) {
                const codeButton = ModuleContainerFactory.createButton({
                    text: window.languageManager ? window.languageManager.getText('code', {}, window.languageManager.getCurrentLanguage()) : 'Code',
                    iconClass: 'fas fa-code',
                    buttonClass: 'code-button',
                    onClick: () => window.open(detail.codeLink, '_blank'),
                    style: {
                        backgroundColor: 'var(--code-color, #34a853)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }
                });
                paperLinks.appendChild(codeButton);
            }

            if (detail.videoLink) {
                const videoButton = ModuleContainerFactory.createButton({
                    text: window.languageManager ? window.languageManager.getText('video', {}, window.languageManager.getCurrentLanguage()) : 'Video',
                    iconClass: 'fas fa-video',
                    buttonClass: 'video-button',
                    onClick: () => window.open(detail.videoLink, '_blank'),
                    style: {
                        backgroundColor: 'var(--video-color, #fbbc05)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }
                });
                paperLinks.appendChild(videoButton);
            }

            if (detail.siteLink) {
                const siteButton = ModuleContainerFactory.createButton({
                    text: window.languageManager ? window.languageManager.getText('site', {}, window.languageManager.getCurrentLanguage()) : 'Site',
                    iconClass: 'fas fa-globe',
                    buttonClass: 'site-button',
                    onClick: () => window.open(detail.siteLink, '_blank'),
                    style: {
                        backgroundColor: 'var(--site-color, #ea4335)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }
                });
                paperLinks.appendChild(siteButton);
            }
            
            columns.columns[1].appendChild(paperLinks);
            
            // Add the paper module to the container | 将论文模块添加到容器中
            allPapersContainer.appendChild(paperModule.container);
        });
    });
    
    return allPapersContainer;
}

// Function to create patent module using ModuleContainerFactory | 使用ModuleContainerFactory创建专利模块的函数
function createPatentModule(patentData) {
    // Create patent module container | 创建专利模块容器
    const patentModule = ModuleContainerFactory.createBasicContainer({
        type: 'patent',
        className: 'patent-module'
    });
    
    // Create header with patent name | 创建带有专利名称的标题
    const header = ModuleContainerFactory.createHeader({
        title: patentData.title,
        iconClass: 'fas fa-file-pdf',
        iconColor: 'var(--patent-color)'
    });
    patentModule.contentWrapper.appendChild(header);
    
    // Create columns layout for patent information | 为专利信息创建列布局
    const columns = ModuleContainerFactory.createColumns({
        columnCount: 1,
        columnWidths: [1],
        columnClasses: ['patent-info-column']
    });
    patentModule.contentWrapper.appendChild(columns.container);

    // Add patent information | 添加专利信息
    const patentInfo = ModuleContainerFactory.createContent({
        content: `<p>${patentData.authors}</p>` + 
        `<p><strong>${patentData.type}</strong>, <a href="${patentData.link}" target="_blank">${patentData.number}</a>, ${patentData.date}</p>`,
        contentType: 'html',
        contentClass: 'patent-info',
        style: {
            lineHeight: '1.6'
        }
    });
    columns.columns[0].appendChild(patentInfo);

    return patentModule.container;
}

// Export functions for use in other files | 导出函数供其他文件使用
window.loadPublicationsContent = loadPublicationsContent;
window.initializePublicationsSection = initializePublicationsSection;
window.createPaperModule = createPaperModule;
window.createPatentModule = createPatentModule;