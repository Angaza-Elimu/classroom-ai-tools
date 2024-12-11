const express = require('express');
const multer = require('multer');
const CurriculumModel = require('../models/curriculum.model');
const csv = require('csv-parser');
const fs = require('fs');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

module.exports = router;
router.post('/process-csv', upload.single('csv'), (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                // Process the CSV data and transform it into the curriculum model
                const curriculum = new CurriculumModel({
                    content: JSON.stringify(results),
                    // Add other fields and transformations as needed
                });

                await curriculum.save();
                res.status(200).json({ message: 'CSV processed and curriculum model created successfully', curriculum });
            } catch (error) {
                res.status(500).json({ message: 'Error processing CSV', error });
            }
        });
});