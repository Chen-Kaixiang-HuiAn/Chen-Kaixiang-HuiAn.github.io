// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-17
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
                    <object data="configs/zh/cv_zh.pdf?t=${timestamp}" type="application/pdf" width="100%" height="800px" id="cv-pdf-object">
                        <div class="pdf-fallback">
                            <p>您的浏览器不支持PDF预览。请点击上方按钮下载PDF。</p>
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
                    <object data="configs/en/cv.pdf?t=${timestamp}" type="application/pdf" width="100%" height="800px" id="cv-pdf-object">
                        <div class="pdf-fallback">
                            <p>Your browser does not support PDF preview. Please click the button above to download the PDF.</p>
                        </div>
                    </object>
                </div>
            </div>
        `;
    }
}

// Function to refresh PDF viewer
function refreshPDFViewer() {
    const pdfObject = document.getElementById('cv-pdf-object');
    if (pdfObject) {
        const currentLang = getCurrentLanguage();
        const timestamp = new Date().getTime(); // Add timestamp to prevent caching
        
        // First, completely clear the current PDF
        pdfObject.setAttribute('data', '');
        
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