// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-19

// CV section content
// English text structure is used across all languages
function loadCVContent() {
    const currentLang = getCurrentLanguage();
    
    // Try to get preloaded CV content
    const preloadedCV = getPreloadedContent('cv');
    
    if (preloadedCV && preloadedCV[currentLang]) {
        // Use preloaded content if available
        return `
            <div class="section-title">
                <h2>${getText('curriculumVitae')}</h2>
            </div>
            <div class="cv-download-container">
                <button id="generate-cv-btn" class="btn">${getText('downloadFullCV')}</button>
            </div>
            <div class="cv-content">
                <div class="cv-info">
                    <p>${getText('cvButtonText')}</p>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="section-title">
                <h2>${getText('curriculumVitae')}</h2>
            </div>
            <div class="cv-download-container">
                <button id="generate-cv-btn" class="btn">${getText('downloadFullCV')}</button>
            </div>
            <div class="cv-content">
                <div class="cv-info">
                    <p>${getText('cvButtonText')}</p>
                </div>
            </div>
        `;
    }
}