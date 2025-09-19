// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-19

// CV section content
// English text structure is used across all languages
function loadCVContent() {
    const currentLang = getCurrentLanguage();
    const timestamp = new Date().getTime(); // Add timestamp to prevent caching
    
    // Try to get preloaded CV content
    const preloadedCV = getPreloadedContent('cv');
    
    if (preloadedCV && preloadedCV[currentLang]) {
        // Use preloaded content if available
        return `
            <div class="section-title">
                <h2>${getText('curriculumVitae')}</h2>
            </div>
            <div class="cv-download-container">
                <a href="${preloadedCV[currentLang].downloadUrl}?t=${timestamp}" target="_blank" class="btn">${getText('downloadFullCV')}</a>
            </div>
            <div class="cv-content">
                <div class="cv-pdf-viewer">
                    <object data="${preloadedCV[currentLang].pdfUrl}?t=${timestamp}" type="application/pdf" width="100%" height="800px" id="cv-pdf-object" onerror="handlePDFLoadError(this)">
                        <div class="pdf-fallback">
                            <p>Your browser is not suitable for PDF Viewer, please click button above to download it!</p>
                        </div>
                    </object>
                    <div class="pdf-loading-indicator">
                        <p>Loading PDF, please wait...</p>
                    </div>
                </div>
            </div>
        `;
    } else if (currentLang === 'zh') {
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
                            <p>Your browser is not suitable for PDF Viewer, please click button above to download it!</p>
                        </div>
                    </object>
                    <div class="pdf-loading-indicator">
                        <p>Loading PDF, please wait...</p>
                    </div>
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
                    <div class="pdf-loading-indicator">
                        <p>Loading PDF, please wait...</p>
                    </div>
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
    
    // Hide loading indicator
    const loadingIndicator = pdfViewer.querySelector('.pdf-loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    // Remove any existing error messages
    const existingErrorMessages = pdfViewer.querySelectorAll('.pdf-error-message');
    existingErrorMessages.forEach(msg => msg.remove());
    
    // Create error message div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'pdf-error-message';
    
    if (currentLang === 'zh') {
        errorDiv.innerHTML = '<p>Your browser is not suitable for PDF Viewer, please click button above to download it!</p>';
    } else {
        errorDiv.innerHTML = '<p>Your browser is not suitable for PDF Viewer, please click button above to download it!</p>';
    }
    
    // Add the error message to the viewer
    pdfViewer.appendChild(errorDiv);
}

// Function to check if PDF loaded successfully
function checkPDFLoadStatus() {
    const pdfObject = document.getElementById('cv-pdf-object');
    if (!pdfObject) return;
    
    const pdfViewer = pdfObject.closest('.cv-pdf-viewer');
    if (!pdfViewer) return;
    
    // Set loading timeout - if PDF doesn't load in 10 seconds, show error
    const loadingTimeout = 10000; // 10 seconds loading time
    
    setTimeout(() => {
        const loadingIndicator = pdfViewer.querySelector('.pdf-loading-indicator');
        if (loadingIndicator && loadingIndicator.style.display !== 'none') {
            // If loading indicator is still visible after timeout, PDF failed to load
            handlePDFLoadError(pdfObject);
        }
    }, loadingTimeout);
    
    // Also try to detect if PDF loads successfully earlier
    setTimeout(() => {
        const loadingIndicator = pdfViewer.querySelector('.pdf-loading-indicator');
        if (loadingIndicator) {
            try {
                // Check if PDF object has valid content
                // This is a simple check - different browsers may behave differently
                const pdfType = pdfObject.type;
                const pdfData = pdfObject.getAttribute('data');
                
                if (pdfData && pdfType === 'application/pdf') {
                    // PDF seems to be loading, hide the loading indicator
                    loadingIndicator.style.display = 'none';
                }
            } catch (e) {
                // If we can't check the type, we'll rely on the timeout
                console.log('Could not verify PDF loading status');
            }
        }
    }, 1000); // Check after 1 second
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
        
        // Show loading indicator
        const pdfViewer = pdfObject.closest('.cv-pdf-viewer');
        if (pdfViewer) {
            const loadingIndicator = pdfViewer.querySelector('.pdf-loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'flex';
            }
        }
        
        // Show the object element again
        pdfObject.style.display = 'block';
        
        // Add a slight delay to ensure the old PDF is cleared before loading the new one
        setTimeout(() => {
            // Try to get preloaded CV content
            const preloadedCV = getPreloadedContent('cv');
            
            // Set the new PDF URL based on current language
            let newPdfUrl;
            if (preloadedCV && preloadedCV[currentLang]) {
                // Use preloaded content if available
                newPdfUrl = `${preloadedCV[currentLang].pdfUrl}?t=${timestamp}`;
            } else {
                // Fallback to original paths
                newPdfUrl = currentLang === 'zh' 
                    ? `configs/zh/cv_zh.pdf?t=${timestamp}`
                    : `configs/en/cv.pdf?t=${timestamp}`;
            }
            
            pdfObject.setAttribute('data', newPdfUrl);
            
            // Check if PDF loads successfully after a delay
            checkPDFLoadStatus();
        }, 100);
    }
}

// Initialize PDF viewer when CV section is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if CV section is loaded and initialize PDF viewer
    const cvSection = document.getElementById('cv');
    if (cvSection) {
        // Set up a mutation observer to detect when CV section becomes active
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (cvSection.classList.contains('active')) {
                        // CV section is now active, check PDF load status
                        checkPDFLoadStatus();
                    }
                }
            });
        });
        
        // Start observing the CV section for class changes
        observer.observe(cvSection, { attributes: true });
    }
});