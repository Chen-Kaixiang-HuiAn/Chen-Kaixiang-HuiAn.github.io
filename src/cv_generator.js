// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-29

// 56,115,178

// CV Generator using pdf-lib library
let pdfLib = null;

// Initialize pdf-lib library
function initializePdfLib() {
    if (typeof PDFDocument !== 'undefined') {
        pdfLib = { PDFDocument: PDFDocument };
        if (typeof PDFLib !== 'undefined') {
            pdfLib.rgb = PDFLib.rgb;
            pdfLib.StandardFonts = PDFLib.StandardFonts;
        }
        return true;
    }
    
    if (typeof PDFLib !== 'undefined' && PDFLib.PDFDocument) {
        pdfLib = { 
            PDFDocument: PDFLib.PDFDocument, 
            rgb: PDFLib.rgb, 
            StandardFonts: PDFLib.StandardFonts 
        };
        return true;
    }
    
    if (window.PDFDocument) {
        pdfLib = { PDFDocument: window.PDFDocument };
        if (window.PDFLib) {
            pdfLib.rgb = window.PDFLib.rgb;
            pdfLib.StandardFonts = window.PDFLib.StandardFonts;
        }
        return true;
    }
    
    return false;
}

// Generate PDF with minimal processing
async function generatePDF() {
    if (!pdfLib) return null;
    
    try {
        const pdfDoc = await pdfLib.PDFDocument.create();
        
        // Register fontkit with the PDFDocument
        pdfDoc.registerFontkit(fontkit);
        
        const page = pdfDoc.addPage([595, 842]);
        
        // Load fonts using fontkit
        const lmsansFontBytes = await fetch('components/font/lmsans10-regular.otf').then(res => res.arrayBuffer());
        const lmsansBoldFontBytes = await fetch('components/font/lmsans10-bold.otf').then(res => res.arrayBuffer());
        const lmsansItalicFontBytes = await fetch('components/font/lmsans10-oblique.otf').then(res => res.arrayBuffer());
        const lmsansBoldItalicFontBytes = await fetch('components/font/lmsans10-boldoblique.otf').then(res => res.arrayBuffer());
        
        // Embed fonts using fontkit
        const RegularFont = await pdfDoc.embedFont(lmsansFontBytes);
        const BoldFont = await pdfDoc.embedFont(lmsansBoldFontBytes);
        const ItalicFont = await pdfDoc.embedFont(lmsansItalicFontBytes);
        const BoldItalicFont = await pdfDoc.embedFont(lmsansBoldItalicFontBytes);
        
        // Add watermark
        try {
            // Fetch watermark image
            const watermarkResponse = await fetch('images/homepage/watermark/watermark.png');
            if (watermarkResponse.ok) {
                const watermarkBytes = await watermarkResponse.arrayBuffer();
                const watermarkImage = await pdfDoc.embedPng(watermarkBytes);
                
                // Calculate watermark dimensions and position to cover the entire page
                const pageWidth = 595;
                const pageHeight = 842;
                const watermarkDims = watermarkImage.scale(1.0);
                
                // Scale watermark to fit the page while maintaining aspect ratio (3/4 of original size)
                const scale = Math.max(pageWidth / watermarkDims.width, pageHeight / watermarkDims.height) * 0.75;
                const scaledWidth = watermarkDims.width * scale;
                const scaledHeight = watermarkDims.height * scale;
                
                // Center the watermark on the page
                const x = (pageWidth - scaledWidth) / 2;
                const y = (pageHeight - scaledHeight) / 2;
                
                // Draw watermark with transparency (as background)
                page.drawImage(watermarkImage, {
                    x: x,
                    y: y,
                    width: scaledWidth,
                    height: scaledHeight,
                    opacity: 0.2 // Set transparency for watermark
                });
                
                console.log('Watermark added successfully');
            } else {
                console.log('Watermark image not found, generating PDF without watermark');
            }
        } catch (watermarkError) {
            console.log('Error adding watermark, generating PDF without watermark:', watermarkError.message);
        }
        
        // Title and Subline
        let name = '';
        let address = '';
        let institution = '';
        let email = '';
        
        const response = await fetch('configs/en/info.json');
        const data = await response.json();

        const title_fontsize = 24;
        name = data.name;
        address = data.address;
        institution = data.institution;
        email = data.email;
        let yPos = 758;
        
        const titleWidth = BoldFont.widthOfTextAtSize(name, title_fontsize);
        const titleX = (595 - titleWidth) / 2;
        page.drawText(name, { x: titleX, y: yPos, size: title_fontsize, font: BoldFont, color: pdfLib.rgb(56/255, 115/255, 178/255) });
        yPos -= 15;
        
        const subline = address + ' | ' + institution + ' | ' + email;
        const subline_fontsize = 12;
        const sublineWidth = RegularFont.widthOfTextAtSize(subline, subline_fontsize);
        const sublineX = (595 - sublineWidth) / 2;
        page.drawText(subline, { x: sublineX, y: yPos, size: subline_fontsize, font: RegularFont, color: pdfLib.rgb(150/255, 150/255, 150/255) });
        yPos -= 30;

        // Set fontsize for next sections
        let subtitle_fontsize = 18;
        let subsection_fontsize = 15;
        let body_fontsize = 12;
        
        // Function to draw section title with underline
        function drawSectionTitle(page, title, yPos) {
            page.drawText(title, { x: 50, y: yPos, size: subtitle_fontsize, font: BoldFont, color: pdfLib.rgb(56/255, 115/255, 178/255) });
            yPos -= 5;
            
            // Add a horizontal line under the title
            page.drawLine({
                start: { x: 50, y: yPos },
                end: { x: 550, y: yPos },
                thickness: 1,
                color: pdfLib.rgb(56/255, 115/255, 178/255)
            });
            yPos -= 15; // Add space after the line
            
            return yPos;
        }
        
        // Function to draw subsection title with ellipsis
        function drawSubsectionTitle(page, title, yPos) {
            page.drawText(title, { x: 50, y: yPos, size: subsection_fontsize, font: BoldItalicFont, color: pdfLib.rgb(56/255, 115/255, 178/255) });
            
            // Calculate the width of the title text
            const titleWidth = BoldItalicFont.widthOfTextAtSize(title, subsection_fontsize);
            
            // Draw ellipsis (...) to extend to x=550
            const ellipsisX = 50 + titleWidth + 5; // Add a small space after the title
            const ellipsisText = '.';
            const ellipsisWidth = BoldItalicFont.widthOfTextAtSize(ellipsisText, subsection_fontsize);
            
            // Calculate how many ellipses we need to fill the space to x=550
            const availableWidth = 550 - ellipsisX;
            const ellipsisCount = Math.floor(availableWidth / ellipsisWidth);
            
            // Draw the ellipses
            for (let i = 0; i < ellipsisCount; i++) {
                page.drawText(ellipsisText, { 
                    x: ellipsisX + i * ellipsisWidth, 
                    y: yPos, 
                    size: subsection_fontsize, 
                    font: BoldItalicFont, 
                    color: pdfLib.rgb(56/255, 115/255, 178/255) 
                });
            }
            
            yPos -= 15; // Add space after the line
            return yPos;
        }
        
        // Function to draw education entry
        function drawEducationEntry(page, school, detail, yPos) {
            // Store initial Y position for this entry
            const initialYPos = yPos;
            
            // Draw bullet point
            page.drawText('- ', {
                x: 50,
                y: yPos,
                size: body_fontsize,
                font: BoldFont,
                color: pdfLib.rgb(0, 0, 0)
            });
            let xPos = 50 + BoldFont.widthOfTextAtSize('- ', body_fontsize);
            
            // Store the position after the bullet point for wrapping
            const bulletEndX = xPos;
            
            // Draw education information with wrapping and overlap prevention
            const eduText = `${detail.degree}, ${detail.major}, ${school}`;
            const result = drawTextWithWrapping(page, eduText, BoldFont, xPos, yPos, 550, 15, pdfLib.rgb(0, 0, 0), bulletEndX);
            const leftTextEndX = result.x; // Store the end position of the left text
            xPos = result.x;
            yPos = result.y;
            
            // Draw time on the right side with overlap prevention
            yPos = drawRightAlignedText(page, detail.time, BoldItalicFont, yPos, leftTextEndX, pdfLib.rgb(0, 0, 0), result.originalY, result.wasTruncated);
            
            // Move to next line
            yPos -= 15;
            
            // Add tutor information if available
            if (detail.tutor) {
                const tutorLabel = "  Tutor: ";
                page.drawText(tutorLabel, { x: 50, y: yPos, size: body_fontsize, font: RegularFont, color: pdfLib.rgb(0, 0, 0) });
                
                // Calculate position for the tutor name
                const labelWidth = RegularFont.widthOfTextAtSize(tutorLabel, body_fontsize);
                const tutorX = 50 + labelWidth;
                
                // Draw tutor name with wrapping
                const tutorResult = drawTextWithWrapping(page, detail.tutor, RegularFont, tutorX, yPos, 550, 15, pdfLib.rgb(0, 0, 0), bulletEndX);
                yPos = tutorResult.y - 15;
            }
            
            // Add dissertation information if available
            if (detail.dissertation) {
                const dissertationLabel = "  Dissertation: ";
                page.drawText(dissertationLabel, { x: 50, y: yPos, size: body_fontsize, font: RegularFont, color: pdfLib.rgb(0, 0, 0) });
                
                // Calculate position for the dissertation title
                const labelWidth = RegularFont.widthOfTextAtSize(dissertationLabel, body_fontsize);
                const dissertationX = 50 + labelWidth;
                
                // Draw dissertation title with wrapping
                const dissertationResult = drawTextWithWrapping(page, detail.dissertation, ItalicFont, dissertationX, yPos, 550, 15, pdfLib.rgb(0, 0, 0), bulletEndX);
                yPos = dissertationResult.y - 15;
            }
            
            return yPos;
        }
        
        // Function to draw employment entry
        function drawEmploymentEntry(page, company, detail, yPos) {
            // Store initial Y position for this entry
            const initialYPos = yPos;
            
            // Draw bullet point
            page.drawText('- ', {
                x: 50,
                y: yPos,
                size: body_fontsize,
                font: BoldFont,
                color: pdfLib.rgb(0, 0, 0)
            });
            let xPos = 50 + BoldFont.widthOfTextAtSize('- ', body_fontsize);
            
            // Store the position after the bullet point for wrapping
            const bulletEndX = xPos;
            
            // Draw employment information with wrapping and overlap prevention
            const jobText = `${detail.position}, ${detail.department}, ${company}`;
            const result = drawTextWithWrapping(page, jobText, BoldFont, xPos, yPos, 550, 15, pdfLib.rgb(0, 0, 0), bulletEndX);
            const leftTextEndX = result.x; // Store the end position of the left text
            xPos = result.x;
            yPos = result.y;
            
            // Draw time on the right side with overlap prevention
            yPos = drawRightAlignedText(page, detail.time, BoldItalicFont, yPos, leftTextEndX, pdfLib.rgb(0, 0, 0), result.originalY, result.wasTruncated);
            
            // Move to next line
            yPos -= 15;
            
            // Add project information if available
            if (detail.project) {
                const projectLabel = "  Project: ";
                page.drawText(projectLabel, { x: 50, y: yPos, size: body_fontsize, font: RegularFont, color: pdfLib.rgb(0, 0, 0) });
                
                // Calculate position for the project title
                const labelWidth = RegularFont.widthOfTextAtSize(projectLabel, body_fontsize);
                const projectX = 50 + labelWidth;
                
                // Draw project title with wrapping
                const projectResult = drawTextWithWrapping(page, detail.project, ItalicFont, projectX, yPos, 550, 15, pdfLib.rgb(0, 0, 0), bulletEndX);
                yPos = projectResult.y - 15;
            }
            
            return yPos;
        }
        
        // Function to draw publication classification
        function drawPublicationClassification(page, yPos) {
            // Set publication classification text and colors
            const classificationItems = [
                { text: 'Conference', color: pdfLib.rgb(255/255, 0/255, 0/255) },  // Red
                { text: 'Journal', color: pdfLib.rgb(0/255, 0/255, 255/255) },    // Blue
                { text: 'Workshop', color: pdfLib.rgb(0/255, 128/255, 0/255) },   // Green
                { text: 'In submission', color: pdfLib.rgb(0/255, 0/255, 0/255) }  // Black
            ];

            // Initial X position for drawing text
            let xPos = 50;
            const classificationFontSize = 12;

            // Draw classification text
            classificationItems.forEach((item, index) => {
                page.drawText(item.text, {
                    x: xPos,
                    y: yPos,
                    size: classificationFontSize,
                    font: BoldFont,
                    color: item.color
                });

                // Calculate the width of the current text
                const textWidth = BoldFont.widthOfTextAtSize(item.text, classificationFontSize);
                xPos += textWidth;

                // Add a black slash if it's not the last classification
                if (index < classificationItems.length - 1) {
                    const slashText = '  |  ';
                    page.drawText(slashText, {
                        x: xPos,
                        y: yPos,
                        size: classificationFontSize,
                        font: BoldFont,
                        color: pdfLib.rgb(0, 0, 0)
                    });
                    xPos += BoldFont.widthOfTextAtSize(slashText, classificationFontSize);
                }
            });

            yPos -= 15;
            return yPos;
        }
        
        // Function to draw text with word wrapping and color
        function drawTextWithWrapping(page, text, font, initialX, initialY, maxWidth, lineHeight, color = pdfLib.rgb(0, 0, 0), bulletEndX = 50) {
            let currentX = initialX;
            let currentY = initialY;
            const words = text.split(' ');
            
            // Store the original Y position in case we need to reset
            const originalY = initialY;
            let wasTruncated = false;
            
            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                const wordWidth = font.widthOfTextAtSize(word + (i < words.length - 1 ? ' ' : ''), body_fontsize);
                
                // Check if adding this word would exceed the max width
                if (currentX + wordWidth > maxWidth && currentX > bulletEndX) {
                    // Move to next line, aligned with the text after the bullet point
                    currentX = bulletEndX;
                    currentY -= lineHeight;
                    wasTruncated = true;
                }
                
                // Draw the word
                page.drawText(word + (i < words.length - 1 ? ' ' : ''), {
                    x: currentX,
                    y: currentY,
                    size: body_fontsize,
                    font: font,
                    color: color
                });
                
                currentX += wordWidth;
            }
            
            return { x: currentX, y: currentY, originalY: originalY, wasTruncated: wasTruncated }; // Return the final position, original Y, and truncation status
        }
        
        // Function to draw text with right alignment and overlap prevention
        function drawRightAlignedText(page, text, font, initialY, leftTextEndX, color = pdfLib.rgb(0, 0, 0), originalYPos, wasTruncated) {
            const textWidth = font.widthOfTextAtSize(text, body_fontsize);
            const xPos = 550 - textWidth; // Position to the right of the page
            let yPos = initialY;
            
            if (!wasTruncated) {
                // Left text was not truncated, check for overlap
                const minSpacing = 10; // Minimum spacing between left and right text
                
                if (leftTextEndX + minSpacing > xPos) {
                    // There's overlap, move the right-aligned text to the next line
                    yPos -= 15;
                }
            }
            
            // Validate coordinates before drawing
            if (isNaN(xPos) || isNaN(yPos)) {
                console.error('Invalid coordinates for right-aligned text:', { xPos, yPos, text });
                return initialY; // Return original position if coordinates are invalid
            }
            
            // Draw the text
            page.drawText(text, {
                x: xPos,
                y: yPos,
                size: body_fontsize,
                font: font,
                color: color
            });
            
            // Return the new Y position
            return yPos;
        }
        
        // Function to draw publication entry
        function drawPublicationEntry(page, paper, yearKey, yPos) {
            // Store initial Y position for this entry
            const initialYPos = yPos;
            
            // Determine color based on paper type
            let paperColor;
            switch(paper.type) {
                case 'Journal':
                    paperColor = pdfLib.rgb(0, 0, 1); // Blue for journals
                    break;
                case 'Conference':
                    paperColor = pdfLib.rgb(1, 0, 0); // Red for conferences
                    break;
                case 'Workshop':
                    paperColor = pdfLib.rgb(0, 1, 0); // Green for workshops
                    break;
                case 'In submission':
                    paperColor = pdfLib.rgb(0, 0, 0); // Black for submissions
                    break;
                default:
                    paperColor = pdfLib.rgb(0, 0, 0); // Default black
            }
            
            // Draw bullet point
            page.drawText('- ', {
                x: 50,
                y: yPos,
                size: body_fontsize,
                font: RegularFont,
                color: paperColor
            });
            let xPos = 50 + RegularFont.widthOfTextAtSize('- ', body_fontsize);
            
            // Process the <u> tags in the author names and replace them with bold text
            let processedAuthors = paper.authors;
            const underlineRegex = /<u>(.*?)<\/u>/g;
            const matches = [...processedAuthors.matchAll(underlineRegex)];
            let authorsTextParts = [];
            let lastIndex = 0;

            for (const match of matches) {
                // Add the normal text before the <u> tag
                authorsTextParts.push({
                    text: processedAuthors.slice(lastIndex, match.index),
                    isBold: false
                });
                // Add the bold text inside the <u> tag
                authorsTextParts.push({
                    text: match[1],
                    isBold: true
                });
                lastIndex = match.index + match[0].length;
            }
            // Add the text after the last </u> tag
            authorsTextParts.push({
                text: processedAuthors.slice(lastIndex),
                isBold: false
            });
            
            // Store the position after the bullet point for wrapping
            const bulletEndX = xPos;
            
            // Draw authors with bold formatting
            for (const part of authorsTextParts) {
                const font = part.isBold ? BoldFont : RegularFont;
                const result = drawTextWithWrapping(page, part.text, font, xPos, yPos, 550, 15, paperColor, bulletEndX);
                xPos = result.x;
                yPos = result.y;
            }
            
            // Draw period after authors
            page.drawText('. ', {
                x: xPos,
                y: yPos,
                size: body_fontsize,
                font: RegularFont,
                color: paperColor
            });
            xPos += RegularFont.widthOfTextAtSize('. ', body_fontsize);
            
            // Draw paper title
            const titleResult = drawTextWithWrapping(page, paper.title, RegularFont, xPos, yPos, 550, 15, paperColor, bulletEndX);
            xPos = titleResult.x;
            yPos = titleResult.y;
            
            // Draw period after title
            page.drawText('. ', {
                x: xPos,
                y: yPos,
                size: body_fontsize,
                font: RegularFont,
                color: paperColor
            });
            xPos += RegularFont.widthOfTextAtSize('. ', body_fontsize);
            
            // Prepare the remaining paper information
            if (paper.type === 'In submission') {
                // Draw "Submitted to" in normal font
                const result1 = drawTextWithWrapping(page, 'Submitted to ', RegularFont, xPos, yPos, 550, 15, paperColor, bulletEndX);
                xPos = result1.x;
                yPos = result1.y;
                
                // Draw conference/journal in italic font
                const result2 = drawTextWithWrapping(page, paper.conference || paper.journal, ItalicFont, xPos, yPos, 550, 15, paperColor, bulletEndX);
                xPos = result2.x;
                yPos = result2.y;
                
                // Draw period in normal font
                page.drawText('.', {
                    x: xPos,
                    y: yPos,
                    size: body_fontsize,
                    font: RegularFont,
                    color: paperColor
                });
                xPos += RegularFont.widthOfTextAtSize('.', body_fontsize);
            } else {
                // Draw "In " in normal font
                const result1 = drawTextWithWrapping(page, 'In ', RegularFont, xPos, yPos, 550, 15, paperColor, bulletEndX);
                xPos = result1.x;
                yPos = result1.y;
                
                // Draw conference/journal in italic font
                const result2 = drawTextWithWrapping(page, paper.conference || paper.journal, ItalicFont, xPos, yPos, 550, 15, paperColor, bulletEndX);
                xPos = result2.x;
                yPos = result2.y;
                
                // Draw location in italic font if exists
                if (paper.location) {
                    // Draw comma and space in normal font
                    page.drawText(', ', {
                        x: xPos,
                        y: yPos,
                        size: body_fontsize,
                        font: RegularFont,
                        color: paperColor
                    });
                    xPos += RegularFont.widthOfTextAtSize(', ', body_fontsize);
                    
                    // Draw location in italic font
                    const result3 = drawTextWithWrapping(page, paper.location, ItalicFont, xPos, yPos, 550, 15, paperColor, bulletEndX);
                    xPos = result3.x;
                    yPos = result3.y;
                    
                    // Draw period in normal font
                    page.drawText('.', {
                        x: xPos,
                        y: yPos,
                        size: body_fontsize,
                        font: RegularFont,
                        color: paperColor
                    });
                    xPos += RegularFont.widthOfTextAtSize('.', body_fontsize);
                }
                
                // Draw volume in italic font if exists
                if (paper.volume) {
                    // Draw space in normal font
                    page.drawText(' ', {
                        x: xPos,
                        y: yPos,
                        size: body_fontsize,
                        font: RegularFont,
                        color: paperColor
                    });
                    xPos += RegularFont.widthOfTextAtSize(' ', body_fontsize);
                    
                    // Draw opening parenthesis in normal font
                    page.drawText('(', {
                        x: xPos,
                        y: yPos,
                        size: body_fontsize,
                        font: RegularFont,
                        color: paperColor
                    });
                    xPos += RegularFont.widthOfTextAtSize('(', body_fontsize);
                    
                    // Draw volume in italic font
                    const result4 = drawTextWithWrapping(page, paper.volume, ItalicFont, xPos, yPos, 550, 15, paperColor, bulletEndX);
                    xPos = result4.x;
                    yPos = result4.y;
                    
                    // Draw closing parenthesis and period in normal font
                    page.drawText(').', {
                        x: xPos,
                        y: yPos,
                        size: body_fontsize,
                        font: RegularFont,
                        color: paperColor
                    });
                    xPos += RegularFont.widthOfTextAtSize(').', body_fontsize);
                }
            }
            
            // Draw abbr on the right side in bold
                if (paper.abbr) {
                    const endLine = `${paper.abbr} ${yearKey}`;
                    const leftTextEndX = xPos; // Store the end position of the left text
                    yPos = drawRightAlignedText(page, endLine, BoldItalicFont, yPos, leftTextEndX, paperColor, initialYPos, false);
                }
            
            yPos -= 15; // Add space between papers
            return yPos;
        }
        
        // Function to draw patent entry
        function drawPatentEntry(page, patent, yPos) {
            // Draw bullet point
            page.drawText('- ', {
                x: 50,
                y: yPos,
                size: body_fontsize,
                font: RegularFont,
                color: pdfLib.rgb(0, 0, 0)
            });
            
            let xPos = 60; // Position after bullet point, reduced from 70 to 60
            let initialYPos = yPos; // Store initial Y position for this patent
            
            // Process the <u> tags in the author names and replace them with bold text
            let processedAuthors = patent.authors;
            const underlineRegex = /<u>(.*?)<\/u>/g;
            const matches = [...processedAuthors.matchAll(underlineRegex)];
            let authorsTextParts = [];
            let lastIndex = 0;

            for (const match of matches) {
                // Add the normal text before the <u> tag
                authorsTextParts.push({
                    text: processedAuthors.slice(lastIndex, match.index),
                    isBold: false
                });
                // Add the bold text inside the <u> tag
                authorsTextParts.push({
                    text: match[1],
                    isBold: true
                });
                lastIndex = match.index + match[0].length;
            }
            // Add the text after the last </u> tag
            authorsTextParts.push({
                text: processedAuthors.slice(lastIndex),
                isBold: false
            });
            
            // Store the position after the bullet point for wrapping
            const bulletEndX = xPos;
            
            // Draw authors with bold formatting
            for (const part of authorsTextParts) {
                const font = part.isBold ? BoldFont : RegularFont;
                const result = drawTextWithWrapping(page, part.text, font, xPos, yPos, 550, 15, pdfLib.rgb(0, 0, 0), bulletEndX);
                xPos = result.x;
                yPos = result.y;
            }
            
            // Draw period after authors
            page.drawText('. ', {
                x: xPos,
                y: yPos,
                size: body_fontsize,
                font: RegularFont,
                color: pdfLib.rgb(0, 0, 0)
            });
            xPos += RegularFont.widthOfTextAtSize('. ', body_fontsize);
            
            // Draw patent title
            const titleResult = drawTextWithWrapping(page, patent.title, RegularFont, xPos, yPos, 550, 15, pdfLib.rgb(0, 0, 0), bulletEndX);
            xPos = titleResult.x;
            yPos = titleResult.y;
            
            // Draw period after title
            page.drawText('. ', {
                x: xPos,
                y: yPos,
                size: body_fontsize,
                font: RegularFont,
                color: pdfLib.rgb(0, 0, 0)
            });
            xPos += RegularFont.widthOfTextAtSize('. ', body_fontsize);
            
            // Draw patent type in italic font
            const typeResult = drawTextWithWrapping(page, patent.type, ItalicFont, xPos, yPos, 550, 15, pdfLib.rgb(0, 0, 0), bulletEndX);
            xPos = typeResult.x;
            yPos = typeResult.y;
            
            // Draw comma after type
            page.drawText(', ', {
                x: xPos,
                y: yPos,
                size: body_fontsize,
                font: RegularFont,
                color: pdfLib.rgb(0, 0, 0)
            });
            xPos += RegularFont.widthOfTextAtSize(', ', body_fontsize);
            
            // Draw patent number
            const numberResult = drawTextWithWrapping(page, patent.number, RegularFont, xPos, yPos, 550, 15, pdfLib.rgb(0, 0, 0), bulletEndX);
            const leftTextEndX = numberResult.x; // Store the end position of the left text
            xPos = numberResult.x;
            yPos = numberResult.y;
            
            // Draw date on the right side (not italic)
            yPos = drawRightAlignedText(page, patent.date, BoldItalicFont, yPos, leftTextEndX, pdfLib.rgb(0, 0, 0), initialYPos, false);
            
            // Calculate how many lines this patent took
            const linesUsed = Math.ceil((initialYPos - yPos) / 15);
            // Set yPos for the next patent
            yPos = initialYPos - (linesUsed + 1) * 15;
            return yPos;
        }

        function drawTeachingEntry(page, detail, yPos) {
            // Store initial Y position for this entry
            const initialYPos = yPos;
            
            // Create identity line with identity, course code and course name
            const identityLine = `- ${detail.identity}`;
            const identityResult = drawTextWithWrapping(page, identityLine, BoldFont, 50, yPos, 550, 15, pdfLib.rgb(0, 0, 0), 60);
            yPos = identityResult.y;
            
            // Draw time on the right side
            const timeString = `${detail.season} ${detail.year}`;
            yPos = drawRightAlignedText(page, timeString, BoldItalicFont, yPos, identityResult.x, pdfLib.rgb(0, 0, 0), identityResult.originalY, identityResult.wasTruncated);
            
            // Draw school name on the next line
            yPos -= 15;
            const courseLine = `${detail.code}: ${detail.course}, ${detail.school}`;
            // Calculate the indentation to align with the text after the dash
            const identityWidth = BoldFont.widthOfTextAtSize("- ", 15);
            const courseResult = drawTextWithWrapping(page, courseLine, RegularFont, 50 + identityWidth, yPos, 550 - identityWidth, 15, pdfLib.rgb(0, 0, 0), 60);
            yPos = courseResult.y;
            
            return yPos;
        }

        function drawHonorEntry(page, detail, yPos) {
            // Store initial Y position for this entry
            const initialYPos = yPos;
            
            // Create honor line with award name
            const honorLine = `- ${detail.award}`;
            const honorResult = drawTextWithWrapping(page, honorLine, BoldFont, 50, yPos, 550, 15, pdfLib.rgb(0, 0, 0), 60);
            yPos = honorResult.y;
            
            // Draw time on the right side
            yPos = drawRightAlignedText(page, detail.time, BoldItalicFont, yPos, honorResult.x, pdfLib.rgb(0, 0, 0), honorResult.originalY, honorResult.wasTruncated);
            
            // Draw unit on the next line
            yPos -= 15;
            // Calculate the indentation to align with the text after the dash
            const honorWidth = BoldFont.widthOfTextAtSize("- ", 15);
            const unitResult = drawTextWithWrapping(page, detail.unit, RegularFont, 50 + honorWidth, yPos, 550 - honorWidth, 15, pdfLib.rgb(0, 0, 0), 60);
            yPos = unitResult.y;
            
            return yPos;
        }
        
        function drawReviewEntry(page, name, years, yPos) {
            // Store initial Y position for this entry
            const initialYPos = yPos;
            
            // Create review line with conference/journal name
            const reviewLine = `- ${name}`;
            const yearsText = years.join(' / ');
            const reviewResult = drawTextWithWrapping(page, reviewLine, BoldFont, 50, yPos, 550, 15, pdfLib.rgb(0, 0, 0), 60);
            yPos = reviewResult.y;
            
            // Draw years on the right side
            yPos = drawRightAlignedText(page, yearsText, BoldItalicFont, yPos, reviewResult.x, pdfLib.rgb(0, 0, 0), reviewResult.originalY, reviewResult.wasTruncated);
            
            return yPos;
        }
        
        function processReviewerData(reviewerData) {
            // Group reviewer entries by name and collect years
            const reviewerMap = new Map();
            for (const item of reviewerData) {
                const name = item.conference || item.journal;
                if (!reviewerMap.has(name)) {
                    reviewerMap.set(name, []);
                }
                reviewerMap.get(name).push(item.year);
            }

            // Sort years for each entry and then sort entries by name
            const sortedReviewers = [];
            for (const [name, years] of reviewerMap) {
                years.sort((a, b) => parseInt(a) - parseInt(b)); // Sort years in ascending order
                sortedReviewers.push({ name, years });
            }
            sortedReviewers.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
            
            return sortedReviewers;
        }
        
        // Education Section
        const educationResponse = await fetch('configs/en/education.json');
        const educationData = await educationResponse.json();

        // Add Education section only if there is data
        if (educationData && educationData.length > 0) {
            yPos = drawSectionTitle(page, 'Education Experiences', yPos);

            yPos -= 7.5; // Add space before the line 
            
            // Process each education entry
            for (const edu of educationData) {
                const school = edu.school;
                for (const detail of edu.details) {
                    yPos = drawEducationEntry(page, school, detail, yPos);
                    yPos -= 25; // Add space between education entries
                }
            }
        }

        // Employment Section
        const employmentResponse = await fetch('configs/en/employment.json');
        const employmentData = await employmentResponse.json();

        // Add Employment section only if there is data
        if (employmentData && employmentData.length > 0) {
            yPos = drawSectionTitle(page, 'Employment Experiences', yPos);

            yPos -= 7.5; // Add space before the line 

            // Process each employment entry
            for (const job of employmentData) {
                const company = job.company;
                for (const detail of job.details) {
                    yPos = drawEmploymentEntry(page, company, detail, yPos);
                    yPos -= 25; // Add space between employment entries
                }
            }
        }

        // Publications Section
        const publicationsResponse = await fetch('configs/en/papers.json');
        const publicationsData = await publicationsResponse.json();

        // Check if there are any publications
        const hasPublications = publicationsData && Object.keys(publicationsData).length > 0 && 
                               Object.values(publicationsData).some(papers => papers && papers.length > 0);

        // Add Publications section only if there is data
        if (hasPublications) {
            yPos = drawSectionTitle(page, 'Publications', yPos);

            // Add Publications Classification
            yPos = drawPublicationClassification(page, yPos);

            yPos -= 7.5; // Add space before the line 

            // Process each publication entry
            // publicationsData is an object with years as keys and paper arrays as values
            const years = Object.keys(publicationsData).sort((a, b) => parseInt(b) - parseInt(a)); // Sort years in descending order
            
            for (const yearKey of years) {
                const papers = publicationsData[yearKey]; // Get the papers array for this year

                for (const paper of papers){
                    yPos = drawPublicationEntry(page, paper, yearKey, yPos);
                }
            }
        }

        // Add patents sub-section which belongs to Publication section
        const patentsResponse = await fetch('configs/en/patents.json');
        const patentsData = await patentsResponse.json();
        
        // Add Patents subsection only if there is data
        if (patentsData && patentsData.patents && patentsData.patents.length > 0) {
            
            yPos -= 7.5; // Add space before the line

            yPos = drawSubsectionTitle(page, 'Patents', yPos);

            yPos -= 7.5; // Add space before the line 
            
            for (const patent of patentsData.patents) {
                yPos = drawPatentEntry(page, patent, yPos);
            }
        }

        // Add space before the line only if there were publications or patents
        if (hasPublications || (patentsData && patentsData.patents && patentsData.patents.length > 0)) {
            yPos -= 15; // Add space before the line
        }

        // Check if any Academic Service subsections have data
        const teachingResponse = await fetch('configs/en/teaching.json');
        const teachingData = await teachingResponse.json();
        
        const honorsResponse = await fetch('configs/en/honors.json');
        const honorsData = await honorsResponse.json();
        
        const reviewerResponse = await fetch('configs/en/reviewer.json');
        const reviewerData = await reviewerResponse.json();

        // Add academic service section only if there is data in any subsection
        if ((teachingData && teachingData.length > 0) || 
            (honorsData && honorsData.length > 0) || 
            (reviewerData && reviewerData.length > 0)) {
            
            yPos = drawSectionTitle(page, 'Academic Service', yPos);
            yPos -= 7.5; // Add space before the line 

            // Add teaching sub-section only if there is data
            if (teachingData && teachingData.length > 0) {
                yPos = drawSubsectionTitle(page, 'Teaching Experiences', yPos);

                yPos -= 7.5; // Add space before the line 

                // Process each teaching entry
                for (const teaching of teachingData) {
                    yPos = drawTeachingEntry(page, teaching, yPos);
                    yPos -= 25; // Add more space between teaching entries
                }

                yPos -= 7.5; // Add space before the line
            }

            // Add Honors subsection only if there is data
            if (honorsData && honorsData.length > 0) {
                yPos = drawSubsectionTitle(page, 'Honors and Awards', yPos);

                yPos -= 7.5; // Add space before the line 

                // Process each honor entry
                for (const honor of honorsData) {
                    yPos = drawHonorEntry(page, honor, yPos);
                    yPos -= 25; // Add more space between honor entries
                }

                yPos -= 7.5; // Add space before the line
            }

            // Add Review Experiences subsection only if there is data
            if (reviewerData && reviewerData.length > 0) {
                yPos = drawSubsectionTitle(page, 'Review Experiences', yPos);

                // Process reviewer data to merge entries and sort
                const sortedReviewers = processReviewerData(reviewerData);

                yPos -= 7.5; // Add space before the line 

                // Process each reviewer entry
                for (const reviewer of sortedReviewers) {
                    yPos = drawReviewEntry(page, reviewer.name, reviewer.years, yPos);
                    yPos -= 15; // Add more space between reviewer entries
                }
            }
        }


        return await pdfDoc.save();
    } catch (error) {
        console.error('Error generating PDF:', error);
        return null;
    }
}

// Open PDF in new tab with async processing
async function openPDF() {
    console.log('openPDF called');
    
    if (!pdfLib) {
        console.error('PDF library not loaded');
        alert('PDF library not loaded. Please try refreshing the page.');
        return;
    }
    
    // Show loading indicator
    const button = document.getElementById('generate-cv-btn');
    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Generating...';
        button.disabled = true;
        
        try {
            console.log('Generating PDF...');
            const pdfBytes = await generatePDF();
            
            if (!pdfBytes) {
                console.error('Failed to generate PDF bytes');
                alert('Failed to generate PDF. Please try again.');
                return;
            }
            
            console.log('PDF generated, creating blob...');
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            // Open PDF in new tab instead of downloading
            window.open(url, '_blank');
            
            console.log('PDF opened in new tab');
        } finally {
            // Restore button state
            button.textContent = originalText;
            button.disabled = false;
        }
    }
}

// Initialize
function initCVGenerator() {
    const button = document.getElementById('generate-cv-btn');
    if (button) {
        button.addEventListener('click', openPDF);
    }
}

// Start when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (initializePdfLib()) {
            initCVGenerator();
        } else {
            let attempts = 0;
            const checkInterval = setInterval(function() {
                attempts++;
                if (initializePdfLib()) {
                    clearInterval(checkInterval);
                    initCVGenerator();
                } else if (attempts >= 20) {
                    clearInterval(checkInterval);
                    initCVGenerator();
                }
            }, 1000);
        }
    });
} else {
    if (initializePdfLib()) {
        initCVGenerator();
    } else {
        let attempts = 0;
        const checkInterval = setInterval(function() {
            attempts++;
            if (initializePdfLib()) {
                clearInterval(checkInterval);
                initCVGenerator();
            } else if (attempts >= 20) {
                clearInterval(checkInterval);
                initCVGenerator();
            }
        }, 1000);
    }
}
