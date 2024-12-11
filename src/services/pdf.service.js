const fs = require('fs');
const pdf = require('pdf-parse');
const pdflib = require('pdf-lib');
class PDFService {
    async readPDF(filePath) {
        const dataBuffer = fs.readFileSync(filePath);
        try {
            const data = await pdf(dataBuffer);
            console.log(data.text); // This will output the text content of the PDF
            return data;
        } catch (error) {
            console.error('Error reading PDF:', error);
        }
    };

    async generatePDF(text) {
        const pdfDoc = await pdflib.PDFDocument.create();
        const page = pdfDoc.addPage([500, 500]);
        const lines = text.split('\n');
        let y = 450;
        for (const line of lines) {
            page.drawText(line, {
            x: 80,
            y: y,
            size: 6,
            maxWidth: 400, // Set a maximum width for the text
            wordBreaks: [' '], // Allow breaking lines at spaces
            });
            y -= 25; // Adjust the line height as needed
        }
        if (y < 50) {
            y = 450;
            const newPage = pdfDoc.addPage([500, 500]);
            for (const line of lines) {
            newPage.drawText(line, {
                x: 80,
                y: y,
                size: 6,
                maxWidth: 400,
                wordBreaks: [' '],
            });
            y -= 25;
            if (y < 50) {
                y = 450;
                pdfDoc.addPage([500, 500]);
            }
            }
        }
        const pdfBytes = await pdfDoc.save();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        fs.writeFileSync(`generated/file-${timestamp}.pdf`, pdfBytes);
        const filePath = `generated/file-${timestamp}.pdf`;
        return `http://localhost:3000/${filePath}`;
    }
}

module.exports = PDFService;