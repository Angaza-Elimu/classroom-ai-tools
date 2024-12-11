const fs = require('fs');
const csv = require('csv-parser');
const Curriculum = require('../models/curriculum'); // Assuming you have a Curriculum model defined

const processCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

const createCurriculum = async (req, res) => {
    try {
        const filePath = req.file.path; // Assuming the CSV file is uploaded and available in req.file
        const csvData = await processCsv(filePath);

        const curriculumData = csvData.map(row => ({
            // Map your CSV data to the Curriculum model structure
            name: row.name,
            description: row.description,
            // Add other fields as necessary
        }));

        const curriculum = await Curriculum.create(curriculumData);
        res.status(201).json(curriculum);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCurriculum,
};