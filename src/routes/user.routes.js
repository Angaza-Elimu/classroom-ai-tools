const express = require('express');
const multer = require('multer');
const path = require('path');
const {uploadUserInfo, queryUserInfo} = require('../controllers/user.controller');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to upload user specific info based on user id
router.post('/upload/:userId', upload.single('file'), uploadUserInfo);
router.post('/query', queryUserInfo);

module.exports = router;