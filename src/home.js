// Written by Constantine Heinrich CHEN (ConsHein CHEN)
// Last Updated: 2025-10-29

// Home page functionality | 主页功能
// This file now works with the language manager for hot switching | 此文件现在与语言管理器配合工作以实现热切换

// Load home page content | 加载主页内容
function loadHomeContent() {
    console.log('Loading home content...');
    
    // Check if home section exists | 检查主页部分是否存在
    const homeSection = document.getElementById('home-section');
    if (!homeSection) {
        console.warn('Home section not found');
        return;
    }
    
    // Check if content already exists | 检查内容是否已存在
    if (homeSection.querySelector('.home-content-wrapper')) {
        console.log('Home content already exists, skipping loading');
        return;
    }
    
    console.log('Home section found, creating content...');
    
    // Create a container for the home content with fade effect | 创建带有淡入效果的主页内容容器
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'home-content-wrapper';
    contentWrapper.style.opacity = '0';
    
    contentWrapper.innerHTML = `
        <div class="home-container">
            <!-- Container for info and content sections | 信息和内容部分的容器 -->
            <div class="home-content-container">
                <!-- Left Information Section | 左侧信息部分 -->
                <div class="info-section">
                    <div class="profile-container">
                        <img src="images/homepage/photo/photo.png" alt="Profile Photo" class="profile-photo">
                    </div>
                    <div class="info-content" id="info-content">
                        <!-- Info will be loaded by language manager | 信息将由语言管理器加载 -->
                    </div>
                </div>
                
                <!-- Right Content Section | 右侧内容部分 -->
                <div class="home-content-section">
                    <div class="intro-section">
                        <h3 id="intro-title"></h3>
                        <div id="intro-content">
                            <!-- Intro content will be loaded by language manager | 介绍内容将由语言管理器加载 -->
                        </div>
                    </div>
                    <div class="news-section">
                        <h3 id="news-title"></h3>
                        <div id="news-content">
                            <!-- News content will be loaded by language manager | 新闻内容将由语言管理器加载 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Append to home section | 附加到主页部分
    homeSection.appendChild(contentWrapper);
    
    console.log('Home content structure created, adding fade effect...');
    
    // Add fade in effect to home content | 为主页内容添加淡入效果
    contentWrapper.style.transition = 'opacity 0.5s ease';
    
    // Use requestAnimationFrame to ensure smooth transition | 使用requestAnimationFrame确保平滑过渡
    requestAnimationFrame(() => {
        contentWrapper.style.opacity = '1';
    });
    
    console.log('Home content loaded successfully');
    // Note: Content will be loaded by language manager after initialization | 注意：内容将在初始化后由语言管理器加载
}

// Legacy functions for backward compatibility | 向后兼容的遗留函数
// These functions are kept for compatibility but now delegate to the language manager | 保留这些函数以实现兼容性，但现在委托给语言管理器
function loadPersonalInfo(language = 'en') {
    if (window.languageManager && window.languageManager.isInitialized) {
        window.languageManager.updatePersonalInfo(language);
    }
}

function loadIntroContent(language = 'en') {
    if (window.languageManager && window.languageManager.isInitialized) {
        window.languageManager.updateIntroContent(language);
    }
}

function loadNewsContent(language = 'en') {
    if (window.languageManager && window.languageManager.isInitialized) {
        window.languageManager.updateNewsContent(language);
    }
}

// Export functions for use in other modules | 导出函数供其他模块使用
window.loadHomeContent = loadHomeContent;
window.loadPersonalInfo = loadPersonalInfo;
window.loadIntroContent = loadIntroContent;
window.loadNewsContent = loadNewsContent;