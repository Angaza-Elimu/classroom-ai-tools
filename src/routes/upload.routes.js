const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const mongoose = require('mongoose');

// Add File model schema
const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  originalName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  grade: { type: String, required: true },
  subject: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Helper function to generate unique filename
const generateUniqueFileName = (originalName) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
};

// Upload file route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { grade, subject } = req.body;

    if (!grade || !subject) {
      return res.status(400).json({ error: 'Grade and subject are required' });
    }

    const uniqueFileName = generateUniqueFileName(req.file.originalname);
    const key = `${grade}/${subject}/${uniqueFileName}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    // Create new file document in database
    const fileDoc = await File.create({
      fileName: uniqueFileName,
      originalName: req.file.originalname,
      fileUrl: fileUrl,
      grade: grade,
      subject: subject,
      mimeType: req.file.mimetype,
      size: req.file.size
    });

    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl,
      fileName: uniqueFileName,
      fileId: fileDoc._id
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Add route to get files by grade and subject
router.get('/files', async (req, res) => {
  try {
    const { grade, subject } = req.query;
    const query = {};
    
    if (grade) query.grade = grade;
    if (subject) query.subject = subject;

    const files = await File.find(query).sort({ uploadedAt: -1 });
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Error fetching files' });
  }
});

module.exports = router;
