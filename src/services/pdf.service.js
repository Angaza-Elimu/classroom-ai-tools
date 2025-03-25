const fs = require('fs');
const pdf = require('pdf-parse');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

class PDFService {
    async readPDF(filePath) {
        const dataBuffer = fs.readFileSync(filePath);
        try {
            const data = await pdf(dataBuffer);
            return data;
        } catch (error) {
            console.error('Error reading PDF:', error);
            throw error;
        }
    }

    async generatePDF(text) {
        const pdfDoc = await PDFDocument.create();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        
        // Page configuration
        const pageWidth = 612; // Standard US Letter width in points (8.5 x 72)
        const pageHeight = 792; // Standard US Letter height in points (11 x 72)
        const margin = 50;
        const fontSize = 11;
        const lineHeight = fontSize * 1.5;
        const maxWidth = pageWidth - (margin * 2);

        let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        let y = pageHeight - margin;

        // Split text into paragraphs based on newlines
        const paragraphs = text.split('\n');

        for (const paragraph of paragraphs) {
            // Split paragraph into words and create lines that fit within maxWidth
            const words = paragraph.trim().split(/\s+/);
            let currentLine = [];
            let currentLineWidth = 0;

            for (const word of words) {
                const wordWidth = font.widthOfTextAtSize(word + ' ', fontSize);
                
                if (currentLineWidth + wordWidth <= maxWidth) {
                    currentLine.push(word);
                    currentLineWidth += wordWidth;
                } else {
                    // Draw current line and start new line
                    if (y - lineHeight < margin) {
                        // Create new page if we're at the bottom
                        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                        y = pageHeight - margin;
                    }

                    const lineText = currentLine.join(' ');
                    currentPage.drawText(lineText, {
                        x: margin,
                        y: y,
                        size: fontSize,
                        font: font,
                        color: rgb(0, 0, 0)
                    });

                    y -= lineHeight;
                    currentLine = [word];
                    currentLineWidth = font.widthOfTextAtSize(word + ' ', fontSize);
                }
            }

            // Draw remaining text in the current line if any
            if (currentLine.length > 0) {
                if (y - lineHeight < margin) {
                    currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                    y = pageHeight - margin;
                }

                const lineText = currentLine.join(' ');
                currentPage.drawText(lineText, {
                    x: margin,
                    y: y,
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0)
                });

                y -= lineHeight;
            }

            // Add extra space between paragraphs
            y -= lineHeight * 0.5;

            // Start new page if not enough space for next paragraph
            if (y - lineHeight < margin) {
                currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                y = pageHeight - margin;
            }
        }

        // Ensure generated directory exists
        if (!fs.existsSync('generated')) {
            fs.mkdirSync('generated');
        }

        const pdfBytes = await pdfDoc.save();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filePath = `generated/file-${timestamp}.pdf`;
        fs.writeFileSync(filePath, pdfBytes);
        
        return `http://classroom-ai.kalamu.net/${filePath}`;
    }
}

module.exports = PDFService;