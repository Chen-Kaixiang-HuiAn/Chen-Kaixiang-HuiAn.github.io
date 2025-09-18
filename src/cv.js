// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-18

// CV section content
function loadCVContent(lang) {
    const currentLang = lang || getCurrentLanguage();
    const timestamp = new Date().getTime(); // Add timestamp to prevent caching
    
    if (currentLang === 'zh') {
        return `
            <div class="section-title">
                <h2>${getText('curriculumVitae')}</h2>
            </div>
            <div class="cv-download-container">
                <a href="configs/zh/cv_zh.pdf?t=${timestamp}" target="_blank" class="btn">${getText('downloadFullCV')}</a>
            </div>
            <div class="cv-content">
                <div class="cv-pdf-viewer">
                    <object data="configs/zh/cv_zh.pdf?t=${timestamp}" type="application/pdf" width="100%" height="800px" id="cv-pdf-object" onerror="handlePDFLoadError(this)">
                        <div class="pdf-fallback">
                            <p>您的浏览器不适合PDF查看器，请点击上方按钮下载！</p>
                        </div>
                    </object>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="section-title">
                <h2>${getText('curriculumVitae')}</h2>
            </div>
            <div class="cv-download-container">
                <a href="configs/en/cv.pdf?t=${timestamp}" target="_blank" class="btn">${getText('downloadFullCV')}</a>
            </div>
            <div class="cv-content">
                <div class="cv-pdf-viewer">
                    <object data="configs/en/cv.pdf?t=${timestamp}" type="application/pdf" width="100%" height="800px" id="cv-pdf-object" onerror="handlePDFLoadError(this)">
                        <div class="pdf-fallback">
                            <p>Your browser is not suitable for PDF Viewer, please click button above to download it!</p>
                        </div>
                    </object>
                </div>
            </div>
        `;
    }
}

// Function to handle PDF loading errors
function handlePDFLoadError(pdfObject) {
    const currentLang = getCurrentLanguage();
    const pdfViewer = pdfObject.closest('.cv-pdf-viewer');
    
    // Remove the object element
    pdfObject.style.display = 'none';
    
    // Create error message div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'pdf-error-message';
    
    if (currentLang === 'zh') {
        errorDiv.innerHTML = '<p>您的浏览器不适合PDF查看器，请点击上方按钮下载！</p>';
    } else {
        errorDiv.innerHTML = '<p>Your browser is not suitable for PDF Viewer, please click button above to download it!</p>';
    }
    
    // Add the error message to the viewer
    pdfViewer.appendChild(errorDiv);
}

// Function to refresh PDF viewer
function refreshPDFViewer() {
    const pdfObject = document.getElementById('cv-pdf-object');
    if (pdfObject) {
        const currentLang = getCurrentLanguage();
        const timestamp = new Date().getTime(); // Add timestamp to prevent caching
        
        // First, completely clear the current PDF
        pdfObject.setAttribute('data', '');
        
        // Remove any existing error messages
        const existingErrorMessages = document.querySelectorAll('.pdf-error-message');
        existingErrorMessages.forEach(msg => msg.remove());
        
        // Show the object element again
        pdfObject.style.display = 'block';
        
        // Add a slight delay to ensure the old PDF is cleared before loading the new one
        setTimeout(() => {
            // Set the new PDF URL based on current language
            const newPdfUrl = currentLang === 'zh' 
                ? `configs/zh/cv_zh.pdf?t=${timestamp}`
                : `configs/en/cv.pdf?t=${timestamp}`;
            
            pdfObject.setAttribute('data', newPdfUrl);
        }, 100);
    }
}