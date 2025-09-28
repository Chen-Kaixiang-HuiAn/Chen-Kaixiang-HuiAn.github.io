// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-26

// Module Container Component
// This component provides a generic container for various types of content
// such as educational experiences, academic papers, honors, etc.

// Detect if the device is mobile
function isMobileDevice() {
    return (typeof window !== 'undefined' && 
           (window.innerWidth <= 768 || 
            'ontouchstart' in window || 
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0));
}

/**
 * Gets text in the specified language - Chinese text inherits English structure, only differs in nouns and data introduction
 * @param {string} key - The text key
 * @param {string} language - The language code (en, zh, etc.)
 * @returns {string} - The text in the specified language
 */
function getModuleText(key, language = 'en') {
    // Check if the language.js module is available and use its getText function
    if (typeof window !== 'undefined' && window.getText) {
        return window.getText(key, language);
    }
    
    // Fallback to local language texts - Chinese state inherits English structure, only differs in nouns and data introduction
    const localLanguageTexts = {
        en: {
            paper: 'Paper',
            code: 'Code',
            video: 'Video',
            site: 'Site',
            abstract: 'Abstract:',
            company: 'Company:',
            organization: 'Organization:',
            position: 'Position:',
            department: 'Department:',
            time: 'Time:',
            viewDetails: 'View Details',
            hideDetails: 'Hide Details',
            tutor: 'Tutor',
            dissertation: 'Dissertation',
            project: 'Project'
        },
        zh: {
            // Chinese state inherits English structure, only differs in nouns and data introduction
            paper: '论文',
            code: '代码',
            video: '视频',
            site: '网站',
            abstract: '摘要：',
            company: '公司：',
            organization: '组织：',
            position: '职位：',
            department: '部门：',
            time: '时间：',
            viewDetails: '查看详情',
            hideDetails: '隐藏详情',
            tutor: '导师',
            dissertation: '学位论文',
            project: '项目'
        }
    };
    
    return localLanguageTexts[language][key] || key;
}

/**
 * Creates a module container element
 * @param {Object} data - The data object containing module information
 * @param {string} type - The type of module (education, publication, experience, honor, etc.)
 * @param {string} language - The language code (en, zh, etc.)
 * @returns {HTMLElement} - The created module container element
 */
function createModuleContainer(data, type, language = 'en') {
    // Create main container
    const moduleContainer = document.createElement('div');
    moduleContainer.className = `module-container ${type}`;
    
    // Create header section
    const moduleHeader = document.createElement('div');
    moduleHeader.className = 'module-header';
    
    // Create title section
    const titleSection = document.createElement('div');
    
    const moduleTitle = document.createElement('h3');
    moduleTitle.className = 'module-title';
    
    // Add icon based on type
    const icon = document.createElement('i');
    switch(type) {
        case 'education':
            icon.className = 'fas fa-graduation-cap';
            break;
        case 'publication':
            icon.className = 'fas fa-file-alt';
            break;
        case 'experience':
            icon.className = 'fas fa-briefcase';
            break;
        case 'employment':
            icon.className = 'fas fa-briefcase';
            break;
        case 'honor':
            icon.className = 'fas fa-trophy';
            break;
        case 'teaching':
            icon.className = 'fas fa-chalkboard-teacher';
            break;
        case 'reviewer':
            icon.className = 'fas fa-user-check';
            break;
        case 'patent':
            icon.className = 'fas fa-award';
            break;
        default:
            icon.className = 'fas fa-cube';
    }
    
    moduleTitle.appendChild(icon);
    
    // Add title text based on type and data
    const titleText = document.createElement('span');
    if (type === 'education' && data.school) {
        titleText.textContent = data.school;
    } else if (type === 'publication' && data.title) {
        titleText.textContent = data.title;
    } else if (type === 'patent' && data.title) {
        titleText.textContent = data.title;
    } else if (type === 'experience' && data.school) {
        titleText.textContent = data.school;
    } else if (type === 'employment' && data.company) {
        titleText.textContent = data.company;
    } else if (type === 'honor' && data.title) {
        titleText.textContent = data.title;
    } else if (type === 'teaching' && data.title) {
        titleText.textContent = data.title;
    } else if (type === 'reviewer' && data.title) {
        titleText.textContent = data.title;
    } else {
        titleText.textContent = data.title || data.name || 'Untitled';
    }
    
    moduleTitle.appendChild(titleText);
    titleSection.appendChild(moduleTitle);
    moduleHeader.appendChild(titleSection);
    
    moduleContainer.appendChild(moduleHeader);
    
    // Create body section
    const moduleBody = document.createElement('div');
    moduleBody.className = 'module-body';
    
    // For reviewer type, add body content with the same style as other modules
    if (type === 'reviewer') {
        const moduleContent = document.createElement('div');
        moduleContent.className = 'module-content';
        
        const reviewerInfo = document.createElement('div');
        reviewerInfo.innerHTML = `
            ${data.description ? `<p>${data.description}</p>` : ''}
        `;
        moduleContent.appendChild(reviewerInfo);
        
        moduleBody.appendChild(moduleContent);
    } else {
        // Add image if available
        let imageUrl = data.image;
        if (!imageUrl && data.logoSrc) {
            // For education modules, use logoSrc if image is not available
            imageUrl = `images/experience/${data.logoSrc}`;
        } else if (imageUrl && type === 'publication') {
            // For publication modules, prepend the publication image path
            imageUrl = `images/publication/${imageUrl}`;
        }
        
        if (imageUrl) {
            const moduleImageContainer = document.createElement('div');
            moduleImageContainer.className = 'module-image-container';
            
            const moduleImage = document.createElement('img');
            moduleImage.className = 'module-image';
            moduleImage.src = imageUrl;
            moduleImage.alt = data.title || data.name || data.company || 'Module image';
            
            // Add click event to image for zooming
            moduleImage.style.cursor = 'pointer';
            moduleImage.addEventListener('click', () => {
                openImageInModal(imageUrl, data.title || data.name || data.company || 'Module image');
            });
            
            // Wrap image in a link if website is available
            if (data.website || data.link) {
                const imageLink = document.createElement('a');
                imageLink.href = data.website || data.link;
                imageLink.target = '_blank';
                imageLink.rel = 'noopener noreferrer';
                imageLink.appendChild(moduleImage);
                moduleImageContainer.appendChild(imageLink);
            } else {
                moduleImageContainer.appendChild(moduleImage);
            }
            
            moduleBody.appendChild(moduleImageContainer);
        }
        
        const moduleContent = document.createElement('div');
        moduleContent.className = 'module-content';
        
        // Add content based on type
        if (type === 'education' && data.details) {
            const detailsList = document.createElement('ul');
            detailsList.style.paddingLeft = '20px';
            
            data.details.forEach(detail => {
                const detailItem = document.createElement('li');
                detailItem.style.marginBottom = '8px';
                let detailHTML = `
                    <strong>${detail.degree || ''}</strong> <em>${detail.major || ''}</em>${detail.college ? `, ${detail.college}` : ''}
                `;
                // Add tutor and dissertation information if available
                if (detail.tutor || detail.dissertation) {
                    let infoText = '';
                    if (detail.tutor && detail.dissertation) {
                        infoText = `${getModuleText('tutor', language)}: ${detail.tutor}<br>${getModuleText('dissertation', language)}: ${detail.dissertation}`;
                    } else if (detail.tutor) {
                        infoText = `${getModuleText('tutor', language)}: ${detail.tutor}`;
                    } else if (detail.dissertation) {
                        infoText = `${getModuleText('dissertation', language)}: ${detail.dissertation}`;
                    }
                    detailHTML += `<br><span class="module-tutor">${infoText}</span>`;
                }
                // Add time information at the bottom
                if (detail.time) {
                    detailHTML += `<br><span class="module-date">${detail.time}</span>`;
                }
                detailItem.innerHTML = detailHTML;
                detailsList.appendChild(detailItem);
            });
            
            moduleContent.appendChild(detailsList);
        } else if (type === 'publication') {
            const pubInfo = document.createElement('div');
            // Format publication information based on type
            let publicationInfo = '';
            if (data.type) {
                if (data.conference) {
                    // Conference paper format: {type} {conference} ({abbr}), {location}, {year}
                    publicationInfo = `<p><strong>${data.type}</strong> <em>${data.conference}`;
                    if (data.abbr) {
                        publicationInfo += ` (${data.abbr})`;
                    }
                    publicationInfo += `</em>`;
                    if (data.location) {
                        publicationInfo += `, ${data.location}`;
                    }
                    if (data.year) {
                        publicationInfo += `, ${data.year}`;
                    }
                    publicationInfo += `</p>`;
                } else if (data.journal) {
                    // Journal paper format: {type} {journal} ({abbr}) ({volume}), {year}
                    publicationInfo = `<p><strong>${data.type}</strong> <em>${data.journal}`;
                    if (data.abbr) {
                        publicationInfo += ` (${data.abbr})`;
                    }
                    publicationInfo += `</em>`;
                    if (data.volume) {
                        publicationInfo += ` (${data.volume})`;
                    }
                    if (data.year) {
                        publicationInfo += `, ${data.year}`;
                    }
                    publicationInfo += `</p>`;
                } else {
                    // Fallback to original format if neither conference nor journal is specified
                    publicationInfo = `<p><strong>${data.type}</strong> <em>${data.conference || data.journal || ''}</em>${data.year ? `, ${data.year}` : ''}</p>`;
                }
            }
            
            pubInfo.innerHTML = `
                ${data.authors ? `<p>${data.authors}</p>` : ''}
                ${publicationInfo}
                ${data.abstract ? `<p><strong>${getModuleText('abstract', language)}</strong> ${data.abstract}${data.date ? `${language === 'zh' ? '，' : ', '}${data.date}` : ''}</p>` : ''}
            `;
            moduleContent.appendChild(pubInfo);
        } else if (type === 'patent') {
            const patentInfo = document.createElement('div');
            patentInfo.innerHTML = `
                ${data.authors ? `<p>${data.authors}</p>` : ''}
                ${data.type ? `<p><strong class="patent-type">${data.type}</strong> ${data.number ? `(<a href="${data.link || '#'}" target="_blank" rel="noopener noreferrer">${data.number}</a>)` : ''}${data.date ? `${language === 'zh' ? '，' : ', '}${data.date}` : ''}</p>` : ''}
                ${data.abstract ? `<p><strong>${getModuleText('abstract', language)}</strong> ${data.abstract}${data.date ? `${language === 'zh' ? '，' : ', '}${data.date}` : ''}</p>` : ''}
            `;
            moduleContent.appendChild(patentInfo);
        } else if (type === 'experience') {
            if (data.details) {
                const detailsList = document.createElement('ul');
                detailsList.style.paddingLeft = '20px';
                
                data.details.forEach(detail => {
                    const detailItem = document.createElement('li');
                    detailItem.style.marginBottom = '8px';
                    detailItem.innerHTML = `
                        <strong>${detail.position || ''}</strong> <em>${detail.department || ''}</em>
                        ${detail.time ? `<br><span class="module-date">${detail.time}</span>` : ''}
                    `;
                    detailsList.appendChild(detailItem);
                });
                
                moduleContent.appendChild(detailsList);
            } else {
                const expInfo = document.createElement('div');
                expInfo.innerHTML = `
                    ${data.position ? `<p><strong>${getModuleText('position', language)}</strong> ${data.position}</p>` : ''}
                    ${data.department ? `<p><strong>${getModuleText('department', language)}</strong> ${data.department}</p>` : ''}
                    ${data.time ? `<p><strong>${getModuleText('time', language)}</strong> ${data.time}</p>` : ''}
                `;
                moduleContent.appendChild(expInfo);
            }
        } else if (type === 'employment') {
            if (data.details) {
                const detailsList = document.createElement('ul');
                detailsList.style.paddingLeft = '20px';
                
                data.details.forEach(detail => {
                    const detailItem = document.createElement('li');
                    detailItem.style.marginBottom = '8px';
                    let detailHTML = `
                        <strong>${detail.position || ''}</strong> <em>${detail.department || ''}</em>
                    `;
                    // Add project information if available
                    if (detail.project) {
                        detailHTML += `<br><span class="module-project">${getModuleText('project', language)}: ${detail.project}</span>`;
                    }
                    // Add time information at the bottom
                    if (detail.time) {
                        detailHTML += `<br><span class="module-date">${detail.time}</span>`;
                    }
                    detailItem.innerHTML = detailHTML;
                    detailsList.appendChild(detailItem);
                });
                
                moduleContent.appendChild(detailsList);
            } else {
                const empInfo = document.createElement('div');
                let empHTML = `
                    ${data.position ? `<p><strong>${getModuleText('position', language)}</strong> ${data.position}</p>` : ''}
                    ${data.department ? `<p><strong>${getModuleText('department', language)}</strong> ${data.department}</p>` : ''}
                    ${data.time ? `<p><strong>${getModuleText('time', language)}</strong> ${data.time}</p>` : ''}
                `;
                // Add project information if available
                if (data.project) {
                    empHTML += `<p><strong>${getModuleText('project', language)}</strong> ${data.project}</p>`;
                }
                empInfo.innerHTML = empHTML;
                moduleContent.appendChild(empInfo);
            }
        } else if (type === 'honor') {
            const honorInfo = document.createElement('div');
            honorInfo.innerHTML = `
                ${data.organization ? `<p>${data.organization}${data.time ? `${language === 'zh' ? '，' : ', '}${data.time}` : ''}</p>` : ''}
            `;
            moduleContent.appendChild(honorInfo);
        } else if (type === 'teaching') {
            const teachingInfo = document.createElement('div');
            teachingInfo.innerHTML = `
                ${data.description ? `<p>${data.description}</p>` : ''}
            `;
            moduleContent.appendChild(teachingInfo);
        } else if (type === 'reviewer') {
            // For reviewer type, add description as a paragraph to match other modules' styles
            const reviewerInfo = document.createElement('div');
            reviewerInfo.innerHTML = `
                ${data.description ? `<p>${data.description}</p>` : ''}
            `;
            moduleContent.appendChild(reviewerInfo);
        } else {
            // Generic content
            const genericContent = document.createElement('div');
            genericContent.textContent = data.description || data.content || '';
            moduleContent.appendChild(genericContent);
        }
        
        moduleBody.appendChild(moduleContent);
        
        // Add tags if applicable
        if (data.tags && data.tags.length > 0) {
            const moduleTags = document.createElement('div');
            moduleTags.className = 'module-tags';
            
            data.tags.forEach(tag => {
                const moduleTag = document.createElement('span');
                moduleTag.className = 'module-tag';
                moduleTag.textContent = tag;
                moduleTags.appendChild(moduleTag);
            });
            
            moduleBody.appendChild(moduleTags);
        }
        
        // Create footer section with links
        if (data.paperLink || data.codeLink || data.videoLink || data.siteLink) {
            const moduleFooter = document.createElement('div');
            moduleFooter.className = 'module-footer';
            
            const moduleLinks = document.createElement('div');
            moduleLinks.className = 'module-links';
            
            if (data.paperLink) {
                const paperLinkElement = createModuleLink(getModuleText('paper', language), data.paperLink, 'fas fa-file-pdf', language);
                moduleLinks.appendChild(paperLinkElement);
            }
            
            if (data.codeLink) {
                const codeLinkElement = createModuleLink(getModuleText('code', language), data.codeLink, 'fas fa-code', language);
                moduleLinks.appendChild(codeLinkElement);
            }
            
            if (data.videoLink && data.videoLink.trim() !== '') {
                const videoLinkElement = createModuleLink(getModuleText('video', language), data.videoLink, 'fas fa-video', language);
                moduleLinks.appendChild(videoLinkElement);
            }
            
            if (data.siteLink && data.siteLink.trim() !== '') {
                const siteLinkElement = createModuleLink(getModuleText('site', language), data.siteLink, 'fas fa-globe', language);
                moduleLinks.appendChild(siteLinkElement);
            }
            
            moduleFooter.appendChild(moduleLinks);
            // Don't add moduleFooter yet, wait until moduleBody is added to moduleContainer
        }
    }
    
    // Always add body to container to ensure consistent styling across all module types
    moduleContainer.appendChild(moduleBody);
    
    // Now add moduleFooter to moduleContainer, ensuring it's after moduleBody
    if (data.paperLink || data.codeLink || data.videoLink || data.siteLink) {
        const moduleFooter = document.createElement('div');
        moduleFooter.className = 'module-footer';
        
        const moduleLinks = document.createElement('div');
        moduleLinks.className = 'module-links';
        
        if (data.paperLink) {
            const paperLinkElement = createModuleLink(getModuleText('paper', language), data.paperLink, 'fas fa-file-pdf', language);
            moduleLinks.appendChild(paperLinkElement);
        }
        
        if (data.codeLink) {
            const codeLinkElement = createModuleLink(getModuleText('code', language), data.codeLink, 'fas fa-code', language);
            moduleLinks.appendChild(codeLinkElement);
        }
        
        if (data.videoLink && data.videoLink.trim() !== '') {
            const videoLinkElement = createModuleLink(getModuleText('video', language), data.videoLink, 'fas fa-video', language);
            moduleLinks.appendChild(videoLinkElement);
        }
        
        if (data.siteLink && data.siteLink.trim() !== '') {
            const siteLinkElement = createModuleLink(getModuleText('site', language), data.siteLink, 'fas fa-globe', language);
            moduleLinks.appendChild(siteLinkElement);
        }
        
        moduleFooter.appendChild(moduleLinks);
        moduleContainer.appendChild(moduleFooter); // Now add footer to module container, ensuring it's after moduleBody
    }
    
    return moduleContainer;
}

/**
 * Creates a module link element
 * @param {string} text - The link text
 * @param {string} url - The link URL
 * @param {string} iconClass - The icon class
 * @param {string} language - The language code (en, zh, etc.)
 * @returns {HTMLElement} - The created link element
 */
function createModuleLink(text, url, iconClass, language = 'en') {
    const linkElement = document.createElement('a');
    linkElement.className = 'module-link';
    
    // Get localized text for comparison
    const videoText = getModuleText('video', language);
    const siteText = getModuleText('site', language);
    const paperText = getModuleText('paper', language);
    const codeText = getModuleText('code', language);
    
    // Add specific class based on link type
    if (text === videoText) {
        linkElement.classList.add('video-link');
    } else if (text === siteText) {
        linkElement.classList.add('site-link');
    } else if (text === paperText) {
        linkElement.classList.add('paper-link');
    } else if (text === codeText) {
        linkElement.classList.add('code-link');
    }
    
    linkElement.href = url;
    linkElement.target = '_blank';
    linkElement.rel = 'noopener noreferrer';
    
    const icon = document.createElement('i');
    icon.className = iconClass;
    
    linkElement.appendChild(icon);
    linkElement.appendChild(document.createTextNode(text));
    
    return linkElement;
}

/**
 * Updates an existing module container with new data
 * @param {HTMLElement} moduleContainer - The existing module container element
 * @param {Object} data - The new data object containing module information
 * @param {string} type - The type of module (education, publication, experience, honor, etc.)
 * @param {string} language - The language code (en, zh, etc.)
 */
function updateModuleContainer(moduleContainer, data, type, language = 'en') {
    if (!moduleContainer) return;
    
    // Store original dimensions to prevent layout shifts
    const originalRect = moduleContainer.getBoundingClientRect();
    moduleContainer.style.width = originalRect.width + 'px';
    moduleContainer.style.height = originalRect.height + 'px';
    
    // Temporarily disable transitions to prevent flickering
    moduleContainer.style.transition = 'none';
    
    // Update title text
    const titleText = moduleContainer.querySelector('.module-title span');
    if (titleText) {
        if (type === 'education' && data.school) {
            titleText.textContent = data.school;
        } else if (type === 'publication' && data.title) {
            titleText.textContent = data.title;
        } else if (type === 'patent' && data.title) {
            titleText.textContent = data.title;
        } else if (type === 'experience' && data.position) {
            titleText.textContent = data.position;
        } else if (type === 'employment' && data.company) {
            titleText.textContent = data.company;
        } else if (type === 'honor' && data.title) {
            titleText.textContent = data.title;
        } else if (type === 'teaching' && data.title) {
            titleText.textContent = data.title;
        } else if (type === 'reviewer' && data.title) {
            titleText.textContent = data.title;
        } else {
            titleText.textContent = data.title || data.name || 'Untitled';
        }
    }
    
    
    
    // Update image if applicable
    let imageUrl = data.image;
    if (!imageUrl && data.logoSrc) {
        // For education modules, use logoSrc if image is not available
        imageUrl = `images/experience/${data.logoSrc}`;
    } else if (imageUrl && type === 'publication') {
        // For publication modules, prepend the publication image path
        imageUrl = `images/publication/${imageUrl}`;
    }
    
    // For reviewer type, add body content with the same style as other modules
    if (type === 'reviewer') {
        // For reviewer type, add body content if it doesn't exist
        let moduleBody = moduleContainer.querySelector('.module-body');
        if (!moduleBody) {
            moduleBody = document.createElement('div');
            moduleBody.className = 'module-body';
            moduleContainer.appendChild(moduleBody);
        }
        
        let moduleContent = moduleBody.querySelector('.module-content');
        if (!moduleContent) {
            moduleContent = document.createElement('div');
            moduleContent.className = 'module-content';
            moduleBody.appendChild(moduleContent);
        }
        
        moduleContent.innerHTML = `
            ${data.description ? `<p>${data.description}</p>` : ''}
        `;
    } else if (imageUrl) {
            let moduleImageContainer = moduleContainer.querySelector('.module-image-container');
            let moduleImage = moduleContainer.querySelector('.module-image');
            
            if (!moduleImageContainer) {
                const moduleBody = moduleContainer.querySelector('.module-body');
                moduleImageContainer = document.createElement('div');
                moduleImageContainer.className = 'module-image-container';
                
                moduleImage = document.createElement('img');
                moduleImage.className = 'module-image';
                
                // Add click event to image for zooming
                moduleImage.style.cursor = 'pointer';
                moduleImage.addEventListener('click', () => {
                    openImageInModal(imageUrl, data.title || data.name || data.company || 'Module image');
                });
                
                // Wrap image in a link if link is available
                if (data.link) {
                    const imageLink = document.createElement('a');
                    imageLink.href = data.link;
                    imageLink.target = '_blank';
                    imageLink.rel = 'noopener noreferrer';
                    imageLink.appendChild(moduleImage);
                    moduleImageContainer.appendChild(imageLink);
                } else {
                    moduleImageContainer.appendChild(moduleImage);
                }
                
                moduleBody.insertBefore(moduleImageContainer, moduleBody.firstChild);
            } else {
                // Store original image dimensions to prevent layout shifts
                const imageRect = moduleImageContainer.getBoundingClientRect();
                moduleImageContainer.style.width = imageRect.width + 'px';
                moduleImageContainer.style.height = imageRect.height + 'px';
                
                // Update existing image
                moduleImage.src = imageUrl;
                moduleImage.alt = data.title || data.name || data.company || 'Module image';
                
                // Remove existing click event and add new one
                moduleImage.style.cursor = 'pointer';
                const newImage = moduleImage.cloneNode(true);
                newImage.addEventListener('click', () => {
                    openImageInModal(imageUrl, data.title || data.name || data.company || 'Module image');
                });
                moduleImage.parentNode.replaceChild(newImage, moduleImage);
                
                // Check if we need to wrap/unwrap the image in a link
                const existingLink = moduleImageContainer.querySelector('a');
                if (data.link) {
                    if (!existingLink) {
                        // Wrap image in a link
                        const imageLink = document.createElement('a');
                        imageLink.href = data.link;
                        imageLink.target = '_blank';
                        imageLink.rel = 'noopener noreferrer';
                        moduleImageContainer.removeChild(moduleImageContainer.firstChild);
                        imageLink.appendChild(moduleImageContainer.firstChild);
                        moduleImageContainer.appendChild(imageLink);
                    } else {
                        // Update existing link
                        existingLink.href = data.link;
                    }
                } else {
                    if (existingLink) {
                        // Unwrap image from link
                        moduleImageContainer.removeChild(existingLink);
                        moduleImageContainer.appendChild(existingLink.firstChild);
                    }
                }
            }
        }
    
    // Update content based on type
    const moduleContent = moduleContainer.querySelector('.module-content');
    if (moduleContent) {
        // Store original content dimensions to prevent layout shifts
        const contentRect = moduleContent.getBoundingClientRect();
        moduleContent.style.width = contentRect.width + 'px';
        moduleContent.style.minHeight = contentRect.height + 'px';
        
        if (type === 'education' && data.details) {
            // Check if we need to update the details list
            let detailsList = moduleContent.querySelector('ul');
            if (!detailsList) {
                detailsList = document.createElement('ul');
                detailsList.style.paddingLeft = '20px';
                moduleContent.appendChild(detailsList);
            }
            
            // Clear existing items
            detailsList.innerHTML = '';
            
            // Add new items
            data.details.forEach(detail => {
                const detailItem = document.createElement('li');
                detailItem.style.marginBottom = '8px';
                let detailHTML = `
                    <strong>${detail.degree || ''}</strong> <em>${detail.major || ''}</em>${detail.college ? `, ${detail.college}` : ''}
                `;
                // Add tutor and dissertation information if available
                if (detail.tutor || detail.dissertation) {
                    let infoText = '';
                    if (detail.tutor && detail.dissertation) {
                        infoText = `${getModuleText('tutor', language)}: ${detail.tutor}<br>${getModuleText('dissertation', language)}: ${detail.dissertation}`;
                    } else if (detail.tutor) {
                        infoText = `${getModuleText('tutor', language)}: ${detail.tutor}`;
                    } else if (detail.dissertation) {
                        infoText = `${getModuleText('dissertation', language)}: ${detail.dissertation}`;
                    }
                    detailHTML += `<br><span class="module-tutor">${infoText}</span>`;
                }
                // Add time information at the bottom
                if (detail.time) {
                    detailHTML += `<br><span class="module-date">${detail.time}</span>`;
                }
                detailItem.innerHTML = detailHTML;
                detailsList.appendChild(detailItem);
            });
        } else if (type === 'publication') {
            moduleContent.innerHTML = `
                ${data.authors ? `<p>${data.authors}</p>` : ''}
                ${data.type ? `<p><strong>${data.type}</strong> <em>${data.conference || data.journal || ''}</em>${data.year ? `, ${data.year}` : ''}</p>` : ''}
                ${data.abstract ? `<p><strong>${getModuleText('abstract', language)}</strong> ${data.abstract}${data.date ? `${language === 'zh' ? '，' : ', '}${data.date}` : ''}</p>` : ''}
            `;
        } else if (type === 'patent') {
            moduleContent.innerHTML = `
                ${data.authors ? `<p>${data.authors}</p>` : ''}
                ${data.type ? `<p><strong class="patent-type">${data.type}</strong> ${data.number ? `(<a href="${data.link || '#'}" target="_blank" rel="noopener noreferrer">${data.number}</a>)` : ''}${data.date ? `${language === 'zh' ? '，' : ', '}${data.date}` : ''}</p>` : ''}
                ${data.abstract ? `<p><strong>${getModuleText('abstract', language)}</strong> ${data.abstract}${data.date ? `${language === 'zh' ? '，' : ', '}${data.date}` : ''}</p>` : ''}
            `;
        } else if (type === 'employment') {
            if (data.details) {
                // Check if we need to update the details list
                let detailsList = moduleContent.querySelector('ul');
                if (!detailsList) {
                    detailsList = document.createElement('ul');
                    detailsList.style.paddingLeft = '20px';
                    moduleContent.appendChild(detailsList);
                }
                
                // Clear existing items
                detailsList.innerHTML = '';
                
                // Add new items
                data.details.forEach(detail => {
                    const detailItem = document.createElement('li');
                    detailItem.style.marginBottom = '8px';
                    let detailHTML = `
                        <strong>${detail.position || ''}</strong> <em>${detail.department || ''}</em>
                    `;
                    // Add project information if available
                    if (detail.project) {
                        detailHTML += `<br><span class="module-project">${getModuleText('project', language)}: ${detail.project}</span>`;
                    }
                    // Add time information at the bottom
                    if (detail.time) {
                        detailHTML += `<br><span class="module-date">${detail.time}</span>`;
                    }
                    detailItem.innerHTML = detailHTML;
                    detailsList.appendChild(detailItem);
                });
            } else {
                let empHTML = `
                    ${data.position ? `<p><strong>${getModuleText('position', language)}</strong> ${data.position}</p>` : ''}
                    ${data.department ? `<p><strong>${getModuleText('department', language)}</strong> ${data.department}</p>` : ''}
                    ${data.time ? `<p><strong>${getModuleText('time', language)}</strong> ${data.time}</p>` : ''}
                `;
                // Add project information if available
                if (data.project) {
                    empHTML += `<p><strong>${getModuleText('project', language)}</strong> ${data.project}</p>`;
                }
                moduleContent.innerHTML = empHTML;
            }
        } else if (type === 'experience') {
            if (data.details) {
                // Check if we need to update the details list
                let detailsList = moduleContent.querySelector('ul');
                if (!detailsList) {
                    detailsList = document.createElement('ul');
                    detailsList.style.paddingLeft = '20px';
                    moduleContent.appendChild(detailsList);
                }
                
                // Clear existing items
                detailsList.innerHTML = '';
                
                // Add new items
                data.details.forEach(detail => {
                    const detailItem = document.createElement('li');
                    detailItem.style.marginBottom = '8px';
                    detailItem.innerHTML = `
                        <strong>${detail.position || ''}</strong> <em>${detail.department || ''}</em>
                        ${detail.time ? `<br><span class="module-date">${detail.time}</span>` : ''}
                    `;
                    detailsList.appendChild(detailItem);
                });
            } else {
                moduleContent.innerHTML = `
                    ${data.position ? `<p><strong>${getModuleText('position', language)}</strong> ${data.position}</p>` : ''}
                    ${data.department ? `<p><strong>${getModuleText('department', language)}</strong> ${data.department}</p>` : ''}
                    ${data.time ? `<p><strong>${getModuleText('time', language)}</strong> ${data.time}</p>` : ''}
                `;
            }
        } else if (type === 'honor') {
            moduleContent.innerHTML = `
                ${data.organization ? `<p>${data.organization}${data.time ? `${language === 'zh' ? '，' : ', '}${data.time}` : ''}</p>` : ''}
            `;
        } else if (type === 'teaching') {
            moduleContent.innerHTML = `
                ${data.description ? `<p>${data.description}</p>` : ''}
            `;
        } else if (type === 'reviewer') {
            moduleContent.innerHTML = `
                ${data.description ? `<p>${data.description}</p>` : ''}
            `;
        } else {
            // Generic content
            moduleContent.textContent = data.description || data.content || '';
        }
    }
    
    // Update tags if applicable
    if (data.tags && data.tags.length > 0 && type !== 'reviewer') {
        let moduleTags = moduleContainer.querySelector('.module-tags');
        if (!moduleTags) {
            const moduleBody = moduleContainer.querySelector('.module-body');
            moduleTags = document.createElement('div');
            moduleTags.className = 'module-tags';
            moduleBody.appendChild(moduleTags);
        }
        
        // Clear existing tags
        moduleTags.innerHTML = '';
        
        // Add new tags
        data.tags.forEach(tag => {
            const moduleTag = document.createElement('span');
            moduleTag.className = 'module-tag';
            moduleTag.textContent = tag;
            moduleTags.appendChild(moduleTag);
        });
    } else if (type === 'reviewer') {
        // For reviewer type, keep the existing tags
        // The tags have already been updated above
    }
    
    // Update footer links if applicable
    if ((data.paperLink || data.codeLink || data.videoLink || data.siteLink) && type !== 'reviewer') {
        let moduleFooter = moduleContainer.querySelector('.module-footer');
        if (!moduleFooter) {
            moduleFooter = document.createElement('div');
            moduleFooter.className = 'module-footer';
            moduleContainer.appendChild(moduleFooter);
        }
        
        let moduleLinks = moduleFooter.querySelector('.module-links');
        if (!moduleLinks) {
            moduleLinks = document.createElement('div');
            moduleLinks.className = 'module-links';
            moduleFooter.appendChild(moduleLinks);
        }
        
        // Clear existing links
        moduleLinks.innerHTML = '';
        
        // Add paper link
        if (data.paperLink) {
            const paperLinkElement = createModuleLink(getModuleText('paper', language), data.paperLink, 'fas fa-file-pdf', language);
            moduleLinks.appendChild(paperLinkElement);
        }
        
        // Add code link
        if (data.codeLink) {
            const codeLinkElement = createModuleLink(getModuleText('code', language), data.codeLink, 'fas fa-code', language);
            moduleLinks.appendChild(codeLinkElement);
        }
        
        // Add video link if not empty
        if (data.videoLink && data.videoLink.trim() !== '') {
            const videoLinkElement = createModuleLink(getModuleText('video', language), data.videoLink, 'fas fa-video', language);
            moduleLinks.appendChild(videoLinkElement);
        }
        
        // Add site link if not empty
        if (data.siteLink && data.siteLink.trim() !== '') {
            const siteLinkElement = createModuleLink(getModuleText('site', language), data.siteLink, 'fas fa-globe', language);
            moduleLinks.appendChild(siteLinkElement);
        }
    } else if (type === 'reviewer') {
        // For reviewer type, keep the existing footer
        // The footer has already been updated above
    } else {
        // Remove footer if no links
        const moduleFooter = moduleContainer.querySelector('.module-footer');
        if (moduleFooter) {
            moduleFooter.remove();
        }
    }
    
    // Restore original transitions and dimensions after a short delay
    setTimeout(() => {
        moduleContainer.style.transition = '';
        moduleContainer.style.width = '';
        moduleContainer.style.height = '';
        
        // Restore image container dimensions
        const moduleImageContainer = moduleContainer.querySelector('.module-image-container');
        if (moduleImageContainer) {
            moduleImageContainer.style.width = '';
            moduleImageContainer.style.height = '';
        }
        
        // Restore content dimensions
        if (moduleContent) {
            moduleContent.style.width = '';
            moduleContent.style.minHeight = '';
        }
    }, 100);
}



/**
 * Creates and appends an image modal for zooming images
 */
function createImageModal() {
    // Check if modal already exists
    if (document.getElementById('image-modal')) return;
    
    // Create modal container
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.flexDirection = 'column';
    
    // Create close button
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '35px';
    closeButton.style.color = '#f1f1f1';
    closeButton.style.fontSize = '40px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.cursor = 'pointer';
    closeButton.style.transition = 'color 0.3s';
    
    // Add hover effect to close button
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.color = '#34cceb';
    });
    
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.color = '#f1f1f1';
    });
    
    // Add click event to close modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Create image element for modal
    const modalImage = document.createElement('img');
    modalImage.id = 'modal-image';
    modalImage.style.maxWidth = '90%';
    modalImage.style.maxHeight = '80%';
    modalImage.style.objectFit = 'contain';
    modalImage.style.animation = 'zoomIn 0.3s';
    
    // Create image caption
    const caption = document.createElement('div');
    caption.id = 'image-caption';
    caption.style.marginTop = '20px';
    caption.style.color = '#f1f1f1';
    caption.style.textAlign = 'center';
    caption.style.fontSize = '18px';
    caption.style.maxWidth = '80%';
    
    // Append elements to modal
    modal.appendChild(closeButton);
    modal.appendChild(modalImage);
    modal.appendChild(caption);
    
    // Append modal to body
    document.body.appendChild(modal);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes zoomIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
}

/**
 * Opens an image in the modal
 * @param {string} src - The source URL of the image
 * @param {string} alt - The alt text for the image
 */
function openImageInModal(src, alt) {
    // Create modal if it doesn't exist
    createImageModal();
    
    // Get modal elements
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const caption = document.getElementById('image-caption');
    
    // Set image source and caption
    modalImg.src = src;
    caption.textContent = alt;
    
    // Display modal
    modal.style.display = 'flex';
}

/**
 * Renders multiple module containers with smooth transition
 * @param {Array} dataArray - Array of data objects
 * @param {string} type - The type of modules
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function renderModuleContainers(dataArray, type, containerId, language = 'en') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Check if this is a language update (container already has modules)
    const existingModules = container.querySelectorAll('.module-container');
    const isLanguageUpdate = existingModules.length > 0;
    
    if (isLanguageUpdate && dataArray.length === existingModules.length) {
        // Store original container dimensions to prevent layout shifts
        const containerRect = container.getBoundingClientRect();
        container.style.width = containerRect.width + 'px';
        container.style.minHeight = containerRect.height + 'px';
        
        // Temporarily disable transitions to prevent flickering
        container.style.transition = 'none';
        
        // Update existing modules instead of recreating them
        existingModules.forEach((module, index) => {
            if (index < dataArray.length) {
                // Store original module dimensions to prevent layout shifts
                const moduleRect = module.getBoundingClientRect();
                module.style.width = moduleRect.width + 'px';
                module.style.height = moduleRect.height + 'px';
                
                // Temporarily disable transitions for the module
                module.style.transition = 'none';
                
                // Add fade effect for text content
                const textElements = module.querySelectorAll('.module-title span, .module-date, .module-content, .module-tag');
                textElements.forEach(el => {
                    el.style.transition = 'opacity 0.2s ease';
                    el.style.opacity = '0.7';
                });
                
                // Update the module with new data
                setTimeout(() => {
                    updateModuleContainer(module, dataArray[index], type, language);
                    
                    // Fade back in
                    textElements.forEach(el => {
                        el.style.opacity = '1';
                    });
                    
                    // Restore module transitions and dimensions
                    setTimeout(() => {
                        module.style.transition = '';
                        module.style.width = '';
                        module.style.height = '';
                    }, 100);
                }, 100);
            }
        });
        
        // Restore container transitions and dimensions after all updates
        setTimeout(() => {
            container.style.transition = '';
            container.style.width = '';
            container.style.minHeight = '';
        }, 350);
    } else {
        // Add fade out effect
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.3s ease';
        
        // Wait for fade out to complete before updating content
        setTimeout(() => {
            // Clear existing content
            container.innerHTML = '';
            
            // Create and append module containers
            dataArray.forEach(data => {
                const module = createModuleContainer(data, type, language);
                container.appendChild(module);
            });
            
            // Fade in new content
            container.style.opacity = '1';
        }, 300);
    }
}

/**
 * Loads education modules from the configuration file and renders them
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code (en, zh, etc.)
 */
function loadEducationModules(containerId, language = 'en') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Load education data from JSON file
    fetch('data/education.json')
        .then(response => response.json())
        .then(data => {
            renderModuleContainers(data, 'education', containerId, language);
        })
        .catch(error => {
            console.error('Error loading education modules:', error);
        });
}

/**
 * Loads publication modules from the configuration file and renders them
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code (en, zh, etc.)
 */
function loadPublicationModules(containerId, language = 'en') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Load publication data from JSON file
    fetch('data/publication.json')
        .then(response => response.json())
        .then(data => {
            renderModuleContainers(data, 'publication', containerId, language);
        })
        .catch(error => {
            console.error('Error loading publication modules:', error);
        });
}

// Export functions for use in other modules
window.createModuleContainer = createModuleContainer;
window.renderModuleContainers = renderModuleContainers;
window.updateModuleContainer = updateModuleContainer;
window.loadEducationModules = loadEducationModules;
window.loadPublicationModules = loadPublicationModules;