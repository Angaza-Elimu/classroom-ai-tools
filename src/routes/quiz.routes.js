const express = require('express');
const axios = require('axios');

const router = express.Router();

// Replace with your OakAI API base URL
const OAKAI_API_BASE_URL = 'https://api.oakai.com';

// Endpoint to retrieve quizzes based on subject_id and grade
router.get('/quizzes', async (req, res) => {
    const { subject_id, grade } = req.query;

    if (!subject_id || !grade) {
        return res.status(400).json({ error: 'subject_id and grade are required' });
    }

    try {
        const response = await axios.get(`${OAKAI_API_BASE_URL}/quizzes`, {
            params: { subject_id, grade }
        });

        const quizzes = response.data;
        res.json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});

// Endpoint to retrieve activities for teachers
router.get('/activities', async (req, res) => {
    const { subject_id, grade } = req.query;

    if (!subject_id || !grade) {
        return res.status(400).json({ error: 'subject_id and grade are required' });
    }

    try {
        const response = await axios.get(`${OAKAI_API_BASE_URL}/activities`, {
            params: { subject_id, grade }
        });

        const activities = response.data;
        res.json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});

module.exports = router;