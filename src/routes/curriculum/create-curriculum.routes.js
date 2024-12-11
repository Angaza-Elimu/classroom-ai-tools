const express = require('express');
const curriculumController = require('../../controllers/curriculum.controller');

const router = express.Router();

// Route to create a new curriculum
router.post('/create', curriculumController.createCurriculum);

module.exports = router;