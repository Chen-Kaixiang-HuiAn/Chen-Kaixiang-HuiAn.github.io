// Written by Constantine Heinrich CHEN (ConsHein CHEN)
// Last Updated: 2025-10-29

// Experiences section content | 经历部分内容
// Chinese text inherits English structure, only differs in nouns and data introduction | 中文内容继承英文结构，仅在名词和数据介绍上有所不同

// Load experiences section content | 加载经历部分内容
function loadExperiencesContent() {
    const currentLang = getCurrentLanguage();
    
    // Get data for each tab to check if they should be hidden | 获取每个标签页的数据以检查是否应该隐藏
    const employmentData = window.languageManager ? window.languageManager.getContent('employment', currentLang) : [];
    const honorsData = window.languageManager ? window.languageManager.getContent('honors', currentLang) : [];
    const teachingData = window.languageManager ? window.languageManager.getContent('teaching', currentLang) : [];
    const reviewerData = window.languageManager ? window.languageManager.getContent('reviewer', currentLang) : [];
    
    // Create a container for the modules with tabs | 为带有标签页的模块创建容器
    let content = `
        <div class="section-title">
            <h2>${window.languageManager ? window.languageManager.getText('experiences') : 'Experiences'}</h2>
        </div>
        <div class="tabs-container">
            <div class="tabs">
                <button class="tab-button active" data-tab="education">${window.languageManager ? window.languageManager.getText('education') : 'Education'}</button>
                ${employmentData && employmentData.length > 0 ? `<button class="tab-button" data-tab="employment">${window.languageManager ? window.languageManager.getText('employment') : 'Employment'}</button>` : ''}
                ${honorsData && honorsData.length > 0 ? `<button class="tab-button" data-tab="honors-awards">${window.languageManager ? window.languageManager.getText('honorsAndAwards') : 'Honors and Awards'}</button>` : ''}
                ${teachingData && teachingData.length > 0 ? `<button class="tab-button" data-tab="teaching">${window.languageManager ? window.languageManager.getText('teaching') : 'Teaching'}</button>` : ''}
                ${reviewerData && reviewerData.length > 0 ? `<button class="tab-button" data-tab="reviewer">${window.languageManager ? window.languageManager.getText('reviewer') : 'Reviewer'}</button>` : ''}
            </div>
            <div class="tab-content">
                <div id="education" class="tab-pane active">
                    <div id="education-modules-container"></div>
                </div>
                ${employmentData && employmentData.length > 0 ? `<div id="employment" class="tab-pane">
                    <div id="employment-modules-container"></div>
                </div>` : ''}
                ${honorsData && honorsData.length > 0 ? `<div id="honors-awards" class="tab-pane">
                    <div id="honors-awards-modules-container"></div>
                </div>` : ''}
                ${teachingData && teachingData.length > 0 ? `<div id="teaching" class="tab-pane">
                    <div id="teaching-modules-container"></div>
                </div>` : ''}
                ${reviewerData && reviewerData.length > 0 ? `<div id="reviewer" class="tab-pane">
                    <div id="reviewer-modules-container"></div>
                </div>` : ''}
            </div>
        </div>
    `;
    
    return content;
}

// Initialize experiences section with tab functionality | 初始化带有标签页功能的经历部分
function initializeExperiencesSection() {
    // Initialize active tab states if not exists | 如果不存在，初始化活动标签页状态
    if (typeof window.activeTabStates === 'undefined') {
        window.activeTabStates = {};
    }
    
    // Get all tab buttons and panes | 获取所有标签页按钮和面板
    const tabButtons = document.querySelectorAll('#experiences-section .tab-button');
    const tabPanes = document.querySelectorAll('#experiences-section .tab-pane');
    
    // Check if any tabs are visible | 检查是否有任何标签页可见
    const visibleTabs = Array.from(tabButtons).filter(button => button.style.display !== 'none');
    
    // If no tabs are visible, show a message | 如果没有标签页可见，显示一条消息
    if (visibleTabs.length === 0) {
        const tabsContainer = document.querySelector('#experiences-section .tabs-container');
        if (tabsContainer) {
            tabsContainer.innerHTML = `<div class="no-content-message">${window.languageManager ? window.languageManager.getText('noContentAvailable') : 'No content available'}</div>`;
        }
        return;
    }
    
    // Get the initial active tab | 获取初始活动标签页
    let activeTab = 'education'; // Default to education | 默认为教育
    if (window.activeTabStates.experiences) {
        activeTab = window.activeTabStates.experiences;
    } else {
        // Check if any tab is marked as active in HTML | 检查HTML中是否有标签页被标记为活动
        const activeButton = document.querySelector('#experiences-section .tab-button.active');
        if (activeButton) {
            activeTab = activeButton.getAttribute('data-tab');
        }
    }
    
    // If the saved active tab is not visible, switch to the first visible tab | 如果保存的活动标签页不可见，切换到第一个可见的标签页
    if (!visibleTabs.find(button => button.getAttribute('data-tab') === activeTab)) {
        activeTab = visibleTabs[0].getAttribute('data-tab');
    }
    
    // Restore the last active tab if available | 如果可用，恢复上次活动的标签页
    if (window.activeTabStates.experiences) {
        // Remove active class from all tabs and panes | 从所有标签页和面板中移除活动类
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Set the last active tab | 设置上次活动的标签页
        const activeButton = document.querySelector(`#experiences-section .tab-button[data-tab="${activeTab}"]`);
        const activePane = document.getElementById(activeTab);    
        
        if (activeButton && activePane) {
            activeButton.classList.add('active');
            activePane.classList.add('active');
        }
    }
    
    // Load content for the active tab | 为活动标签页加载内容
    if (window.languageManager) {
        // Use the updateExperiencesContent method instead of calling individual methods
        // 使用updateExperiencesContent方法而不是调用单独的方法
        window.languageManager.updateExperiencesContent();
    }
    
    // Initialize responsive tabs for mobile devices | 为移动设备初始化响应式标签页
    if (window.initializeResponsiveTabs) {
        window.initializeResponsiveTabs('experiences-section');
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
            // Use the updateExperiencesContent method instead of calling individual methods
            // 使用updateExperiencesContent方法而不是调用单独的方法
            if (window.languageManager) {
                window.languageManager.updateExperiencesContent();
            }
            
            // Store the active tab state | 存储活动标签页状态
            window.activeTabStates.experiences = tabId;
            
            // Trigger custom event for tab change | 为标签页更改触发自定义事件
            const event = new CustomEvent('tabChange', {
                detail: {
                    section: 'experiences',
                    activeTab: tabId
                }
            });
            document.dispatchEvent(event);
        });
    });
}

// Function to create education module using ModuleContainerFactory | 使用ModuleContainerFactory创建教育模块的函数
function createEducationModule(educationData) {
    // Create education module container | 创建教育模块容器
    const educationModule = ModuleContainerFactory.createBasicContainer({
        type: 'education',
        className: 'education-module'
    });
    
    // Create header with school name | 创建带有学校名称的标题
    const header = ModuleContainerFactory.createHeader({
        title: educationData.school,
        iconClass: 'fas fa-graduation-cap',
        iconColor: 'var(--education-color)'
    });
    educationModule.contentWrapper.appendChild(header);
    
    // Create columns layout for the entire school | 为整个学校创建列布局
    const columns = ModuleContainerFactory.createColumns({
        columnCount: 2,
        columnWidths: [1, 2],
        columnClasses: ['edu-logo-column', 'edu-info-column']
    });
    educationModule.contentWrapper.appendChild(columns.container);
    
    // Add school logo if available | 如果可用，添加学校标志
    if (educationData.logoSrc) {
        ModuleContainerFactory.insertImage({
            imagePath: `images/experience/${educationData.logoSrc}`,
            altText: `${educationData.school} logo`,
            size: { width: '125px', height: 'auto' },
            position: 'center',
            container: columns.columns[0],
            clickable: true
        });
    }
    
    // Process all education details for this school in the same column | 在同一列中处理此学校的所有教育详情
    educationData.details.forEach((detail, index) => {
        // Add some spacing between multiple degrees from the same school | 在同一学校的多个学位之间添加一些间距
        const spacingClass = index > 0 ? 'multiple-degree-spacing' : '';
        
        // Add education information | 添加教育信息
        const degreeInfo = ModuleContainerFactory.createContent({
            content: `<div class="education-degree ${spacingClass}">
                <p><strong>${detail.degree}</strong></p>
                <p>${detail.major}, ${detail.college}</p>
                <p><strong>${window.languageManager ? window.languageManager.getText('time') : 'Time'}:</strong> ${detail.time}</p>
                ${detail.tutor ? `<p><strong>${window.languageManager ? window.languageManager.getText('tutor') : 'Tutor'}:</strong> ${detail.tutor}</p>` : ''}
                ${detail.dissertation ? `<p><strong>${window.languageManager ? window.languageManager.getText('dissertation') : 'Dissertation'}:</strong> ${detail.dissertation}</p>` : ''}
            </div>`,
            contentType: 'html',
            contentClass: 'education-info',
            style: {
                lineHeight: '1.6'
            }
        });
        columns.columns[1].appendChild(degreeInfo);
    });
    
    return educationModule.container;
}

// Function to create employment module using ModuleContainerFactory | 使用ModuleContainerFactory创建就业模块的函数
function createEmploymentModule(employmentData) {
    // Create employment module container | 创建就业模块容器
    const employmentModule = ModuleContainerFactory.createBasicContainer({
        type: 'employment',
        className: 'employment-module'
    });
    
    // Create header with company name | 创建带有公司名称的标题
    const header = ModuleContainerFactory.createHeader({
        title: employmentData.company,
        iconClass: 'fas fa-briefcase',
        iconColor: 'var(--employment-color)'
    });
    employmentModule.contentWrapper.appendChild(header);
    
    // Create columns layout for the entire company | 为整个公司创建列布局
    const columns = ModuleContainerFactory.createColumns({
        columnCount: 2,
        columnWidths: [1, 2],
        columnClasses: ['emp-logo-column', 'emp-info-column']
    });
    employmentModule.contentWrapper.appendChild(columns.container);
    
    // Add company logo if available | 如果可用，添加公司标志
    if (employmentData.logoSrc) {
        ModuleContainerFactory.insertImage({
            imagePath: `images/experience/${employmentData.logoSrc}`,
            altText: `${employmentData.company} logo`,
            size: { width: '125px', height: 'auto' },
            position: 'center',
            container: columns.columns[0],
            clickable: true
        });
    }
    
    // Process all employment details for this company in the same column | 在同一列中处理此公司的所有就业详情
    employmentData.details.forEach((detail, index) => {
        // Add some spacing between multiple positions from the same company | 在同一公司的多个职位之间添加一些间距
        const spacingClass = index > 0 ? 'multiple-position-spacing' : '';
        
        // Add employment information | 添加就业信息
        const jobInfo = ModuleContainerFactory.createContent({
            content: `<div class="employment-position ${spacingClass}">
                <p><strong>${detail.position}</strong></p>
                <p>${detail.department}, ${employmentData.company}</p>
                <p><strong>${window.languageManager ? window.languageManager.getText('time') : 'Time'}:</strong> ${detail.time}</p>
                ${detail.project ? `<p><strong>${window.languageManager ? window.languageManager.getText('project') : 'Project'}:</strong> ${detail.project}</p>` : ''}
            </div>`,
            contentType: 'html',
            contentClass: 'employment-info',
            style: {
                lineHeight: '1.6'
            }
        });
        columns.columns[1].appendChild(jobInfo);
    });
    
    return employmentModule.container;
}

// Function to create honor module using ModuleContainerFactory | 使用ModuleContainerFactory创建荣誉模块的函数
function createHonorModule(honorData) {
    // Create honor module container | 创建荣誉模块容器
    const honorModule = ModuleContainerFactory.createBasicContainer({
        type: 'honor',
        className: 'honor-module'
    });
    
    // Create header with award name | 创建带有奖励名称的标题
    const header = ModuleContainerFactory.createHeader({
        title: honorData.award,
        iconClass: 'fas fa-trophy',
        iconColor: 'var(--honor-color)'
    });
    honorModule.contentWrapper.appendChild(header);
    
    // Create columns layout for honor information | 为荣誉信息创建列布局
    const columns = ModuleContainerFactory.createColumns({
        columnCount: 1,
        columnWidths: [1],
        columnClasses: ['honor-info-column']
    });
    honorModule.contentWrapper.appendChild(columns.container);

    // Add honor information | 添加荣誉信息
    const honorInfo = ModuleContainerFactory.createContent({
        content: `<p>${honorData.unit}, ${honorData.time}</p>`,
        contentType: 'html',
        contentClass: 'honor-info',
        style: {
            lineHeight: '1.6'
        }
    });
    columns.columns[0].appendChild(honorInfo);

    return honorModule.container;
}

// Function to create teaching module using ModuleContainerFactory | 使用ModuleContainerFactory创建教学模块的函数
function createTeachingModule(teachingData) {
    // Create teaching module container | 创建教学模块容器
    const teachingModule = ModuleContainerFactory.createBasicContainer({
        type: 'teaching',
        className: 'teaching-module'
    });
    
    // Create header with course name | 创建带有课程名称的标题
    const header = ModuleContainerFactory.createHeader({
        title: teachingData.code + ' ' + teachingData.course,
        iconClass: 'fas fa-chalkboard-teacher',
        iconColor: 'var(--teaching-color)'
    });
    teachingModule.contentWrapper.appendChild(header);
    
    // Create columns layout for teaching information | 为教学信息创建列布局
    const columns = ModuleContainerFactory.createColumns({
        columnCount: 1,
        columnWidths: [1],
        columnClasses: ['teaching-info-column']
    });
    teachingModule.contentWrapper.appendChild(columns.container);

    // Add teaching information | 添加教学信息
    const teachingInfo = ModuleContainerFactory.createContent({
        content: `<p>${teachingData.identity}, ${teachingData.school}, ${teachingData.season} ${teachingData.year}</p>`,
        contentType: 'html',
        contentClass: 'teaching-info',
        style: {
            lineHeight: '1.6'
        }
    });
    columns.columns[0].appendChild(teachingInfo);

    return teachingModule.container;
}

// Group reviewer data by conference/journal and sort years chronologically
// 按会议/期刊分组审稿人数据并按年份排序
function groupReviewerData(reviewerData) {
    const grouped = {};
    
    // Group by conference or journal | 按会议或期刊分组
    reviewerData.forEach(item => {
        const key = item.conference || item.journal;
        if (!grouped[key]) {
            grouped[key] = {
                type: item.conference ? 'conference' : 'journal',
                name: key,
                years: []
            };
        }
        grouped[key].years.push(item.year);
    });
    
    // Sort years for each group chronologically | 对每个组的年份按时间排序
    Object.keys(grouped).forEach(key => {
        grouped[key].years.sort((a, b) => parseInt(a) - parseInt(b));
    });
    
    return grouped;
}

// Function to create reviewer module using ModuleContainerFactory | 使用ModuleContainerFactory创建审稿人模块的函数
function createReviewerModule(reviewerData) {
    // Group reviewer data by conference/journal | 按会议/期刊分组审稿人数据
    const groupedData = groupReviewerData(reviewerData);
    
    // Create a container to hold all reviewer modules | 创建一个容器来容纳所有审稿人模块
    const allReviewerModules = document.createElement('div');
    allReviewerModules.className = 'reviewer-modules-container';
    
    // Create separate module for each conference/journal | 为每个会议/期刊创建单独的模块
    Object.keys(groupedData).forEach(key => {
        const group = groupedData[key];
        
        // Create individual reviewer module container | 创建单独的审稿人模块容器
        const reviewerModule = ModuleContainerFactory.createBasicContainer({
            type: 'reviewer',
            className: 'reviewer-module'
        });
        
        // Create header with conference/journal name | 创建带有会议/期刊名称的标题
        const header = ModuleContainerFactory.createHeader({
            title: group.name,
            iconClass: 'fas fa-user-edit',
            iconColor: 'var(--reviewer-color)'
        });
        reviewerModule.contentWrapper.appendChild(header);
        
        // Create columns layout for reviewer information | 为审稿人信息创建列布局
        const columns = ModuleContainerFactory.createColumns({
            columnCount: 1,
            columnWidths: [1],
            columnClasses: ['reviewer-info-column']
        });
        reviewerModule.contentWrapper.appendChild(columns.container);

        // Format years with slashes if multiple | 如果有多个年份，用斜杠格式化
        const yearsText = group.years.length > 1 ? group.years.join(' / ') : group.years[0];
        
        // Add reviewer information | 添加审稿人信息
        const reviewerInfo = ModuleContainerFactory.createContent({
            content: `<p>${window.languageManager ? window.languageManager.getText('reviewer') : 'Review Year(s): '}, ${yearsText}</p>`,
            contentType: 'html',
            contentClass: 'reviewer-info',
            style: {
                lineHeight: '1.6'
            }
        });
        columns.columns[0].appendChild(reviewerInfo);
        
        // Add the individual module to the container | 将单独的模块添加到容器中
        allReviewerModules.appendChild(reviewerModule.container);
    });

    return allReviewerModules;
}

// Export functions for use in other files | 导出函数供其他文件使用
window.loadExperiencesContent = loadExperiencesContent;
window.initializeExperiencesSection = initializeExperiencesSection;
window.createEducationModule = createEducationModule;
window.createEmploymentModule = createEmploymentModule;
window.createHonorModule = createHonorModule;
window.createTeachingModule = createTeachingModule;
window.createReviewerModule = createReviewerModule;