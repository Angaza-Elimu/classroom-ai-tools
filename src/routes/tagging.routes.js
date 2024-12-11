const express = require('express');
const multer = require('multer');
const path = require('path');
const { tagLessons, tagUnits } = require('../controllers/tagging.controller');
const fs = require('fs');

const router = express.Router();
router.post('/vectorize/lessons', tagLessons);
router.post('/vectorize/units', tagUnits);
module.exports = router;