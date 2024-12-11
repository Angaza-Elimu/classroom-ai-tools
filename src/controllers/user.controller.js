const express = require('express');
const VectorService = require('../services/vector.service');
const DatabaseHelper = require('../helpers/database.helper');
const LLMService = require('../services/llm.service');
const PDFService = require('../services/pdf.service');
const router = express.Router();

// Function to vectorize user info
async function vectorizeUserInfo(userText) {
    // LLM service to vectorize uploaded file
    const llmService = new LLMService(process.env.OPENAI_API_KEY);
    const embeddings = await llmService.createEmbedding(userText);
    return {
        embeddings: embeddings,
        vectorized: true
    };
}
class UserController {
    async uploadUserInfo(req, res) {
        console.log("HHit");
        try {
            console.log(req.file);
            const userId = req.params.userId;
            const userInfo = req.body;
            // read file and use service to transform it into text
            
            const pdfRead = new PDFService
            const pdfText = await pdfRead.readPDF(req.file.path);
            // Vectorize user info
            const vectorizedUserInfo = await vectorizeUserInfo(pdfText.text);
            // console.log("vectorizedUserInfo", vectorizedUserInfo.embeddings);
            const vectorService = new VectorService();
            const vectorInsert = await vectorService.insertVectorsIntoDatabase(userId, req.file.path, vectorizedUserInfo.embeddings);
            // add tags to the user info
            console.log(vectorInsert);
            const similarUnits = await vectorService.findSimilarUnits(vectorizedUserInfo.embeddings, vectorInsert);
            // write unit ti
            const result = await (userId, vectorizedUserInfo);

            res.status(200).json({ message: 'User info uploaded successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading user info', error: error.message });
        }
    }

    async queryUserInfo(req, res) {
        try {
            const query = req.body.query;
            console.log("Querying user info" + query);
            const vectorizedUserInfo = await vectorizeUserInfo(query);
            const vectorService = new VectorService();
            const result = await vectorService.findSimilarVectors(vectorizedUserInfo.embeddings);
            console.log("Result", result);
            // Call LLM service to generate output after fetching the pdf text and giving it as context
            const pdfRead = new PDFService();
            let pdfText = '';
            if (result.length > 0) {
                // const BM25Service = new BM25Service();
                // order results by distance
                result.sort((a, b) => a.distance - b.distance);
                pdfText = await pdfRead.readPDF(result[0].filepath);
            } else {
                throw new Error('No valid file path found in the result');
            }
            if (pdfText) {
                const llmService = new LLMService(process.env.OPENAI_API_KEY);
                const prompt = `You are an educational assistant that can generate any of the following according to the query, - answers, lesson plans for teachers, quizzes for students and creates activities for students while creating new content similar to the context Here is a document with the curriculum: ${pdfText.text}, Come up with new creative items from the query: ${query}`;
                console.log("Prompt", prompt);
                const output = await llmService.generateOutput(prompt);
                const pdfLink = await pdfRead.generatePDF(output);
                res.status(200).json({ message: 'Query processed successfully', data: output, documentLink: pdfLink });
            } else {
                res.status(500).json({ message: 'Error querying user info', error: 'No valid PDF text found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error querying user info', error: error.message });
        }
    }
}

module.exports = new UserController();

exports.uploadUserInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userInfo = req.body;
        console.log("Uploading user info");
        
        // Store file and id in Database
        const dbHelper = new DatabaseHelper();
        // await dbHelper.insertUserInfo(userId, req.file.path);
        res.status(200).json({ message: 'User info uploaded successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading user info', error: error.message });
    }
}
// Controller to upload user info
