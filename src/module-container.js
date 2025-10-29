// Written by Constantine Heinrich CHEN (ConsHein CHEN)
// Last Updated: 2025-10-29

// Module Container Component - Assembly Interface | 模块容器组件 - 组装接口
// This component provides interfaces for assembling customized containers | 此组件提供用于组装自定义容器的接口

/*
 * 接口示例用法 | Interface Usage Examples
 * 
 * 1. 创建基础模块容器 | Create Basic Module Container
 * 
 * // 创建一个教育类型的模块容器
 * const educationModule = ModuleContainerFactory.createBasicContainer({
 *     type: 'education',
 *     className: 'my-custom-class',
 *     borderColor: '#4285f4'
 * });
 * 
 * // 将容器添加到页面
 * document.getElementById('modules-container').appendChild(educationModule.container);
 * 
 * 
 * 2. 创建模块头部 | Create Module Header
 * 
 * // 创建带有图标和标题的头部
 * const header = ModuleContainerFactory.createHeader({
 *     title: '教育经历',
 *     iconClass: 'fas fa-graduation-cap',
 *     iconColor: '#4285f4',
 *     titleStyle: {
 *         fontSize: '1.5rem',
 *         fontWeight: 'bold'
 *     }
 * });
 * 
 * // 将头部添加到内容包装器
 * educationModule.contentWrapper.appendChild(header);
 * 
 * 
 * 3. 创建多列布局 | Create Multi-Column Layout
 * 
 * // 创建三列布局，比例为1:2:1
 * const columns = ModuleContainerFactory.createColumns({
 *     columnCount: 3,
 *     columnWidths: [1, 2, 1],
 *     columnClasses: ['left-column', 'middle-column', 'right-column']
 * });
 * 
 * // 将列容器添加到内容包装器
 * educationModule.contentWrapper.appendChild(columns.container);
 * 
 * 
 * 4. 插入图片 | Insert Image
 * 
 * // 在第一列中插入可点击放大的图片
 * const image = ModuleContainerFactory.insertImage({
 *     imagePath: 'images/university-logo.png',
 *     altText: '大学校徽',
 *     size: { width: '100px', height: '100px' },
 *     position: 'center',
 *     container: columns.columns[0],
 *     clickable: true
 * });
 * 
 * 
 * 5. 创建内容区域 | Create Content Section
 * 
 * // 在第二列中创建文本内容
 * const content = ModuleContainerFactory.createContent({
 *     content: '这是我的教育经历描述...',
 *     contentType: 'text',
 *     contentClass: 'education-description',
 *     style: {
 *         lineHeight: '1.6',
 *         marginBottom: '10px'
 *     }
 * });
 * 
 * columns.columns[1].appendChild(content);
 * 
 * 
 * 6. 创建列表 | Create List
 * 
 * // 在第二列中创建项目列表
 * const list = ModuleContainerFactory.createList({
 *     items: [
 *         '计算机科学学士',
 *         'GPA: 3.8/4.0',
 *         '荣誉毕业生'
 *     ],
 *     listType: 'ul',
 *     listClass: 'education-list',
 *     itemClass: 'education-item'
 * });
 * 
 * columns.columns[1].appendChild(list);
 * 
 * 
 * 7. 创建标签 | Create Tags
 * 
 * // 在第三列中创建标签容器
 * const tagsContainer = ModuleContainerFactory.createTagsContainer([
 *     { text: '计算机科学', tagClass: 'tag-cs' },
 *     { text: '人工智能', tagClass: 'tag-ai' },
 *     { text: '数据科学', tagClass: 'tag-ds' }
 * ], {
 *     containerClass: 'education-tags',
 *     containerStyle: {
 *         display: 'flex',
 *         flexWrap: 'wrap',
 *         gap: '5px'
 *     }
 * });
 * 
 * columns.columns[2].appendChild(tagsContainer);
 * 
 * 
 * 8. 创建链接 | Create Links
 * 
 * // 创建链接容器
 * const linksContainer = ModuleContainerFactory.createLinksContainer([
 *     {
 *         url: 'https://university.edu',
 *         text: '大学官网',
 *         iconClass: 'fas fa-globe',
 *         linkType: 'site'
 *     },
 *     {
 *         url: 'https://github.com/student/projects',
 *         text: '项目代码',
 *         iconClass: 'fab fa-github',
 *         linkType: 'code'
 *     },
 *     {
 *         url: 'documents/thesis.pdf',
 *         text: '毕业论文',
 *         iconClass: 'fas fa-file-pdf',
 *         linkType: 'paper'
 *     }
 * ], {
 *     containerClass: 'education-links',
 *     containerStyle: {
 *         marginTop: '10px'
 *     }
 * });
 * 
 * columns.columns[2].appendChild(linksContainer);
 * 
 * 
 * 9. 创建按钮 | Create Button
 * 
 * // 创建带有点击事件的按钮
 * const button = ModuleContainerFactory.createButton({
 *     text: '查看详情',
 *     iconClass: 'fas fa-arrow-right',
 *     buttonClass: 'btn-primary',
 *     onClick: function() {
 *         alert('查看更多教育经历详情');
 *     },
 *     style: {
 *         marginTop: '15px',
 *         padding: '8px 16px'
 *     }
 * });
 * 
 * educationModule.contentWrapper.appendChild(button);
 * 
 * 
 * 10. 完整示例：创建出版物模块 | Complete Example: Create Publication Module
 * 
 * // 创建出版物模块容器
 * const publicationModule = ModuleContainerFactory.createBasicContainer({
 *     type: 'publication'
 * });
 * 
 * // 创建头部
 * const pubHeader = ModuleContainerFactory.createHeader({
 *     title: '学术论文',
 *     iconClass: 'fas fa-file-alt',
 *     iconColor: '#34a853'
 * });
 * publicationModule.contentWrapper.appendChild(pubHeader);
 * 
 * // 创建两列布局
 * const pubColumns = ModuleContainerFactory.createColumns({
 *     columnCount: 2,
 *     columnWidths: [1, 2]
 * });
 * publicationModule.contentWrapper.appendChild(pubColumns.container);
 * 
 * // 添加论文封面
 * ModuleContainerFactory.insertImage({
 *     imagePath: 'images/paper-cover.jpg',
 *     altText: '论文封面',
 *     size: { width: '120px', height: '160px' },
 *     position: 'center',
 *     container: pubColumns.columns[0],
 *     clickable: true
 * });
 * 
 * // 添加论文信息
 * const paperInfo = ModuleContainerFactory.createContent({
 *     content: '<h4>深度学习在自然语言处理中的应用研究</h4>' +
 *              '<p><strong>作者：</strong>张三, 李四, 王五</p>' +
 *              '<p><strong>期刊：</strong>计算机科学前沿</p>' +
 *              '<p><strong>年份：</strong>2023</p>',
 *     contentType: 'html',
 *     style: {
 *         lineHeight: '1.6'
 *     }
 * });
 * pubColumns.columns[1].appendChild(paperInfo);
 * 
 * // 添加摘要
 * const abstract = ModuleContainerFactory.createContent({
 *     content: '本文研究了深度学习技术在自然语言处理领域的最新应用...',
 *     contentClass: 'paper-abstract',
 *     style: {
 *         fontStyle: 'italic',
 *         margin: '10px 0'
 *     }
 * });
 * pubColumns.columns[1].appendChild(abstract);
 * 
 * // 添加关键词标签
 * const keywords = ModuleContainerFactory.createTagsContainer([
 *     { text: '深度学习', tagClass: 'tag-primary' },
 *     { text: '自然语言处理', tagClass: 'tag-primary' },
 *     { text: '神经网络', tagClass: 'tag-secondary' }
 * ]);
 * pubColumns.columns[1].appendChild(keywords);
 * 
 * // 添加相关链接
 * const paperLinks = ModuleContainerFactory.createLinksContainer([
 *     {
 *         url: 'https://doi.org/10.1234/paper.2023.001',
 *         text: 'DOI链接',
 *         iconClass: 'fas fa-link',
 *         linkType: 'site'
 *     },
 *     {
 *         url: 'https://arxiv.org/abs/2023.12345',
 *         text: 'ArXiv',
 *         iconClass: 'fas fa-file-alt',
 *         linkType: 'paper'
 *     },
 *     {
 *         url: 'https://github.com/author/paper-code',
 *         text: '代码实现',
 *         iconClass: 'fab fa-github',
 *         linkType: 'code'
 *     }
 * ]);
 * pubColumns.columns[1].appendChild(paperLinks);
 * 
 * // 将出版物模块添加到页面
 * document.getElementById('modules-container').appendChild(publicationModule.container);
 */

/**
 * Module Container Factory | 模块容器工厂
 * Provides interfaces for creating customized module containers | 提供创建自定义模块容器的接口
 */
const ModuleContainerFactory = {
    
    /**
     * Creates a basic module container with left border | 创建带有左边框的基础模块容器
     * @param {Object} options - Configuration options | 配置选项
     * @param {string} options.type - Module type (education, publication, etc.) | 模块类型
     * @param {string} options.className - Additional CSS classes | 额外的CSS类
     * @param {string} options.borderColor - Border color | 边框颜色
     * @returns {HTMLElement} - The created module container element | 创建的模块容器元素
     */
    createBasicContainer: function(options = {}) {
        const {
            type = 'default',
            className = '',
            borderColor = null
        } = options;
        
        // Create main container | 创建主容器
        const moduleContainer = document.createElement('div');
        moduleContainer.className = `module-container ${type} ${className}`.trim();
        
        // Create left border | 创建左边框
        const leftBorder = document.createElement('div');
        leftBorder.className = 'module-left-border';
        
        // Set border color if provided | 如果提供了边框颜色则设置
        if (borderColor) {
            leftBorder.style.backgroundColor = borderColor;
        }
        
        // Create content wrapper | 创建内容包装器
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'module-content-wrapper';
        
        // Assemble basic container | 组装基础容器
        moduleContainer.appendChild(leftBorder);
        moduleContainer.appendChild(contentWrapper);
        
        return {
            container: moduleContainer,
            contentWrapper: contentWrapper,
            leftBorder: leftBorder
        };
    },
    
    /**
     * Creates a header section with title and icon | 创建带有标题和图标的头部区域
     * @param {Object} options - Configuration options | 配置选项
     * @param {string} options.title - Title text | 标题文本
     * @param {string} options.iconClass - Font Awesome icon class | Font Awesome图标类
     * @param {string} options.iconColor - Icon color | 图标颜色
     * @param {Object} options.titleStyle - Additional title styles | 额外的标题样式
     * @returns {HTMLElement} - The created header element | 创建的头部元素
     */
    createHeader: function(options = {}) {
        const {
            title = '',
            iconClass = 'fas fa-cube',
            iconColor = null,
            titleStyle = {}
        } = options;
        
        // Create header section | 创建头部区域
        const moduleHeader = document.createElement('div');
        moduleHeader.className = 'module-header';
        
        // Create title section | 创建标题区域
        const titleSection = document.createElement('div');
        
        const moduleTitle = document.createElement('h3');
        moduleTitle.className = 'module-title';
        
        // Add icon | 添加图标
        const icon = document.createElement('i');
        icon.className = iconClass;
        
        // Set icon color if provided | 如果提供了图标颜色则设置
        if (iconColor) {
            icon.style.color = iconColor;
        }
        
        moduleTitle.appendChild(icon);
        
        // Add title text | 添加标题文本
        if (title) {
            const titleText = document.createElement('span');
            titleText.textContent = title;
            moduleTitle.appendChild(titleText);
        }
        
        // Apply additional styles | 应用额外样式
        Object.assign(moduleTitle.style, titleStyle);
        
        titleSection.appendChild(moduleTitle);
        moduleHeader.appendChild(titleSection);
        
        return moduleHeader;
    },
    
    /**
     * Creates a column layout | 创建分栏布局
     * @param {Object} options - Configuration options | 配置选项
     * @param {number} options.columnCount - Number of columns (1-3) | 列数(1-3)
     * @param {Array} options.columnWidths - Width ratios for columns (e.g., [1, 2, 1]) | 列的宽度比例
     * @param {Array} options.columnClasses - Additional CSS classes for each column | 每列的额外CSS类
     * @returns {Object} - Object containing columns container and individual columns | 包含列容器和各列的对象
     */
    createColumns: function(options = {}) {
        const {
            columnCount = 1,
            columnWidths = null,
            columnClasses = []
        } = options;
        
        // Validate column count | 验证列数
        if (columnCount < 1 || columnCount > 3) {
            throw new Error('Column count must be between 1 and 3');
        }
        
        // Create columns container | 创建列容器
        const columnsContainer = document.createElement('div');
        columnsContainer.className = 'module-columns';
        
        // Create columns | 创建列
        const columns = [];
        
        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.className = `module-column column-${i + 1} ${columnClasses[i] || ''}`.trim();
            
            // Set column width if specified | 如果指定了列宽度则设置
            if (columnWidths && columnWidths[i]) {
                column.style.flex = columnWidths[i];
            }
            
            columns.push(column);
            columnsContainer.appendChild(column);
        }
        
        return {
            container: columnsContainer,
            columns: columns
        };
    },
    
    /**
     * Inserts an image into a container | 向容器中插入图片
     * @param {Object} options - Configuration options | 配置选项
     * @param {string} options.imagePath - Path to the image | 图片路径
     * @param {string} options.altText - Alt text for the image | 图片的alt文本
     * @param {Object} options.size - Image size {width, height} | 图片尺寸 {宽度, 高度}
     * @param {string} options.position - Position in container (left, right, center) | 在容器中的位置
     * @param {string} options.container - Target container element | 目标容器元素
     * @param {boolean} options.clickable - Whether image is clickable for zooming | 图片是否可点击放大
     * @param {string} options.linkUrl - URL to link to if clicked | 点击时链接到的URL
     * @param {Object} options.containerStyle - Additional container styles | 额外的容器样式
     * @returns {HTMLElement} - The created image container element | 创建的图片容器元素
     */
    insertImage: function(options = {}) {
        const {
            imagePath = '',
            altText = 'Image',
            size = { width: '100%', height: 'auto' },
            position = 'center',
            container = null,
            clickable = false,
            linkUrl = null,
            containerStyle = {}
        } = options;
        
        if (!imagePath) {
            console.warn('Image path is required');
            return null;
        }
        
        // Create image container | 创建图片容器
        const imageContainer = document.createElement('div');
        imageContainer.className = 'module-image-container';
        
        // Set container position | 设置容器位置
        switch (position) {
            case 'left':
                imageContainer.style.textAlign = 'left';
                break;
            case 'right':
                imageContainer.style.textAlign = 'right';
                break;
            default:
                imageContainer.style.textAlign = 'center';
        }
        
        // Apply additional container styles | 应用额外容器样式
        Object.assign(imageContainer.style, containerStyle);
        
        // Create image element | 创建图片元素
        const image = document.createElement('img');
        image.className = 'module-image';
        image.src = imagePath;
        image.alt = altText;
        
        // Set image size | 设置图片尺寸
        if (size.width) {
            image.style.width = size.width;
        }
        if (size.height) {
            image.style.height = size.height;
        }
        
        // Make image clickable for zooming if specified | 如果指定则使图片可点击放大
        if (clickable) {
            image.style.cursor = 'pointer';
            image.addEventListener('click', () => {
                this.openImageInModal(imagePath, altText);
            });
        }
        
        // Wrap image in a link if URL is provided | 如果提供了URL则将图片包装在链接中
        if (linkUrl) {
            const imageLink = document.createElement('a');
            imageLink.href = linkUrl;
            imageLink.target = '_blank';
            imageLink.rel = 'noopener noreferrer';
            imageLink.appendChild(image);
            imageContainer.appendChild(imageLink);
        } else {
            imageContainer.appendChild(image);
        }
        
        // Add to specified container if provided | 如果提供了指定容器则添加到其中
        if (container) {
            container.appendChild(imageContainer);
        }
        
        return imageContainer;
    },
    
    /**
     * Creates a button with specified properties | 创建具有指定属性的按钮
     * @param {Object} options - Configuration options | 配置选项
     * @param {string} options.text - Button text | 按钮文本
     * @param {string} options.iconClass - Font Awesome icon class | Font Awesome图标类
     * @param {string} options.buttonClass - Additional CSS classes | 额外的CSS类
     * @param {Function} options.onClick - Click event handler | 点击事件处理程序
     * @param {Object} options.style - Additional button styles | 额外的按钮样式
     * @param {string} options.type - Button type (button, submit, reset) | 按钮类型
     * @returns {HTMLElement} - The created button element | 创建的按钮元素
     */
    createButton: function(options = {}) {
        const {
            text = '',
            iconClass = '',
            buttonClass = '',
            onClick = null,
            style = {},
            type = 'button'
        } = options;
        
        // Create button element | 创建按钮元素
        const button = document.createElement('button');
        button.type = type;
        button.className = `module-button ${buttonClass}`.trim();
        
        // Add icon if specified | 如果指定了图标则添加
        if (iconClass) {
            const icon = document.createElement('i');
            icon.className = iconClass;
            button.appendChild(icon);
        }
        
        // Add text if specified | 如果指定了文本则添加
        if (text) {
            const textNode = document.createTextNode(text);
            button.appendChild(textNode);
        }
        
        // Apply additional styles | 应用额外样式
        Object.assign(button.style, style);
        
        // Add click event handler if specified | 如果指定了点击事件处理程序则添加
        if (onClick && typeof onClick === 'function') {
            button.addEventListener('click', onClick);
        }
        
        return button;
    },
    
    /**
     * Creates a tag element | 创建标签元素
     * @param {Object} options - Configuration options | 配置选项
     * @param {string} options.text - Tag text | 标签文本
     * @param {string} options.tagClass - Additional CSS classes | 额外的CSS类
     * @param {Object} options.style - Additional tag styles | 额外的标签样式
     * @returns {HTMLElement} - The created tag element | 创建的标签元素
     */
    createTag: function(options = {}) {
        const {
            text = '',
            tagClass = '',
            style = {}
        } = options;
        
        // Create tag element | 创建标签元素
        const tag = document.createElement('span');
        tag.className = `module-tag ${tagClass}`.trim();
        tag.textContent = text;
        
        // Apply additional styles | 应用额外样式
        Object.assign(tag.style, style);
        
        return tag;
    },
    
    /**
     * Creates a tags container with multiple tags | 创建包含多个标签的标签容器
     * @param {Array} tags - Array of tag objects {text, class, style} | 标签对象数组 {文本, 类, 样式}
     * @param {Object} containerOptions - Container options | 容器选项
     * @returns {HTMLElement} - The created tags container element | 创建的标签容器元素
     */
    createTagsContainer: function(tags = [], containerOptions = {}) {
        const {
            containerClass = '',
            containerStyle = {}
        } = containerOptions;
        
        // Create tags container | 创建标签容器
        const tagsContainer = document.createElement('div');
        tagsContainer.className = `module-tags ${containerClass}`.trim();
        
        // Apply container styles | 应用容器样式
        Object.assign(tagsContainer.style, containerStyle);
        
        // Add tags | 添加标签
        tags.forEach(tagOptions => {
            const tag = this.createTag(tagOptions);
            tagsContainer.appendChild(tag);
        });
        
        return tagsContainer;
    },
    
    /**
     * Creates a link element | 创建链接元素
     * @param {Object} options - Configuration options | 配置选项
     * @param {string} options.url - Link URL | 链接URL
     * @param {string} options.text - Link text | 链接文本
     * @param {string} options.iconClass - Font Awesome icon class | Font Awesome图标类
     * @param {string} options.linkClass - Additional CSS classes | 额外的CSS类
     * @param {boolean} options.newTab - Whether to open in new tab | 是否在新标签页中打开
     * @param {string} options.linkType - Type of link (video, site, paper, code) | 链接类型(视频, 网站, 论文, 代码)
     * @param {Object} options.style - Additional link styles | 额外的链接样式
     * @returns {HTMLElement} - The created link element | 创建的链接元素
     */
    createLink: function(options = {}) {
        const {
            url = '#',
            text = '',
            iconClass = '',
            linkClass = '',
            newTab = true,
            linkType = '',
            style = {}
        } = options;
        
        // Create link element | 创建链接元素
        const link = document.createElement('a');
        link.href = url;
        link.className = `module-link ${linkClass}`.trim();
        
        // Add link type class if specified | 如果指定了链接类型则添加相应的类
        if (linkType) {
            link.classList.add(`${linkType}-link`);
        }
        
        // Set target for new tab if specified | 如果指定则设置新标签页目标
        if (newTab) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
        
        // Add icon if specified | 如果指定了图标则添加
        if (iconClass) {
            const icon = document.createElement('i');
            icon.className = iconClass;
            link.appendChild(icon);
        }
        
        // Add text if specified | 如果指定了文本则添加
        if (text) {
            const textNode = document.createTextNode(text);
            link.appendChild(textNode);
        }
        
        // Apply additional styles | 应用额外样式
        Object.assign(link.style, style);
        
        return link;
    },
    
    /**
     * Creates a links container with multiple links | 创建包含多个链接的链接容器
     * @param {Array} links - Array of link objects | 链接对象数组
     * @param {Object} containerOptions - Container options | 容器选项
     * @returns {HTMLElement} - The created links container element | 创建的链接容器元素
     */
    createLinksContainer: function(links = [], containerOptions = {}) {
        const {
            containerClass = '',
            containerStyle = {}
        } = containerOptions;
        
        // Create links container | 创建链接容器
        const linksContainer = document.createElement('div');
        linksContainer.className = `module-links ${containerClass}`.trim();
        
        // Apply container styles | 应用容器样式
        Object.assign(linksContainer.style, containerStyle);
        
        // Add links | 添加链接
        links.forEach(linkOptions => {
            // Map icon to linkType if not provided | 如果未提供linkType则根据图标映射
            if (!linkOptions.linkType && linkOptions.icon) {
                if (linkOptions.icon.includes('file-pdf') || linkOptions.icon.includes('file-alt')) {
                    linkOptions.linkType = 'paper';
                } else if (linkOptions.icon.includes('code') || linkOptions.icon.includes('github')) {
                    linkOptions.linkType = 'code';
                } else if (linkOptions.icon.includes('video') || linkOptions.icon.includes('youtube')) {
                    linkOptions.linkType = 'video';
                } else if (linkOptions.icon.includes('globe') || linkOptions.icon.includes('external-link')) {
                    linkOptions.linkType = 'site';
                }
            }
            
            const link = this.createLink(linkOptions);
            linksContainer.appendChild(link);
        });
        
        return linksContainer;
    },
    
    /**
     * Creates a content section with text | 创建带有文本的内容区域
     * @param {Object} options - Configuration options | 配置选项
     * @param {string} options.content - Text content | 文本内容
     * @param {string} options.contentType - Content type (text, html) | 内容类型(文本, HTML)
     * @param {string} options.contentClass - Additional CSS classes | 额外的CSS类
     * @param {Object} options.style - Additional content styles | 额外的内容样式
     * @returns {HTMLElement} - The created content element | 创建的内容元素
     */
    createContent: function(options = {}) {
        const {
            content = '',
            contentType = 'text',
            contentClass = '',
            style = {}
        } = options;
        
        // Create content element | 创建内容元素
        const contentElement = document.createElement('div');
        contentElement.className = `module-content ${contentClass}`.trim();
        
        // Set content based on type | 根据类型设置内容
        if (contentType === 'html') {
            contentElement.innerHTML = content;
        } else {
            contentElement.textContent = content;
        }
        
        // Apply additional styles | 应用额外样式
        Object.assign(contentElement.style, style);
        
        return contentElement;
    },
    
    /**
     * Creates a list section | 创建列表区域
     * @param {Object} options - Configuration options | 配置选项
     * @param {Array} options.items - List items | 列表项
     * @param {string} options.listType - List type (ul, ol) | 列表类型
     * @param {string} options.listClass - Additional CSS classes for list | 列表的额外CSS类
     * @param {string} options.itemClass - Additional CSS classes for items | 项目的额外CSS类
     * @param {Object} options.style - Additional list styles | 额外的列表样式
     * @returns {HTMLElement} - The created list element | 创建的列表元素
     */
    createList: function(options = {}) {
        const {
            items = [],
            listType = 'ul',
            listClass = '',
            itemClass = '',
            style = {}
        } = options;
        
        // Create list element | 创建列表元素
        const list = document.createElement(listType);
        list.className = `module-list ${listClass}`.trim();
        
        // Apply additional styles | 应用额外样式
        Object.assign(list.style, style);
        
        // Add items | 添加项目
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = `module-list-item ${itemClass}`.trim();
            
            if (typeof item === 'string') {
                listItem.textContent = item;
            } else if (item.html) {
                listItem.innerHTML = item.html;
            } else {
                listItem.textContent = item.text || '';
            }
            
            list.appendChild(listItem);
        });
        
        return list;
    },
    
    /**
     * Opens an image in a modal | 在模态框中打开图片
     * @param {string} imageUrl - The URL of the image to display | 要显示的图片URL
     * @param {string} title - The title of the image | 图片的标题
     */
    openImageInModal: function(imageUrl, title) {
        // Create modal element | 创建模态框元素
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        
        // Create image element | 创建图片元素
        const modalImage = document.createElement('img');
        modalImage.src = imageUrl;
        modalImage.alt = title;
        modalImage.style.maxWidth = '90%';
        modalImage.style.maxHeight = '90%';
        modalImage.style.objectFit = 'contain';
        modalImage.style.borderRadius = '8px';
        modalImage.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
        
        // Create close button | 创建关闭按钮
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '20px';
        closeButton.style.right = '20px';
        closeButton.style.fontSize = '30px';
        closeButton.style.color = 'white';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.cursor = 'pointer';
        
        // Add event listeners | 添加事件监听器
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Assemble modal | 组装模态框
        modal.appendChild(modalImage);
        modal.appendChild(closeButton);
        
        // Add modal to body | 将模态框添加到body
        document.body.appendChild(modal);
    }
};

// Export the factory for use in other modules | 导出工厂以在其他模块中使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModuleContainerFactory;
} else {
    window.ModuleContainerFactory = ModuleContainerFactory;
}