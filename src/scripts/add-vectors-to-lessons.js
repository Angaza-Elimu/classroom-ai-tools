const LLMService =  require('../services/llm.service');

class AddVectorsToLessons {
    constructor() {}

    async getLessons() {
        console.log('Getting lessons');
        const client = global.pgClient;
        try {
            await client.connect();
            const res = await client.query('SELECT id, lesson_title FROM lessons');
            console.log('Query result:', res.rows);
            return res.rows;
        } catch (error) {
            console.error('Error fetching lessons:', error);
            throw error;
        } finally {
            await client.end();
        }
    }

    async updateLessonEmbedding(id, embedding) {
        const client = await global.pgClient;
        await client.connect();
        await client.query('UPDATE lessons SET embedding = $1 WHERE id = $2', [embedding, id]);
    }

    async addVectorsToLessons() {
        const client = await global.pgClient;
        const embeddingService = new LLMService(process.env.OPEN_AI_KEY);
        try {
            console.log('Adding embeddings to lessons');
            await client.connect();
            const res = await client.query('SELECT id, lesson_title FROM lessons');
            console.log('Query result:', res.rows);
            const lessons = res.rows;

            for (const lesson of lessons) {
                const embedding = await embeddingService.createEmbedding(lesson.lesson_title);
                await client.query('UPDATE lessons SET embedding = $1 WHERE id = $2', [`[${embedding.join(", ")}]`, lesson.id]);
            }

            console.log('Embeddings added to lessons successfully.');
            return lessons;
        } catch (error) {
            console.error('Error adding embeddings to lessons:', error);
        } finally {
            await client.end();
        }
    }

    async addVectorsToUnits() {
        const client = await global.pgClient;
        const embeddingService = new LLMService(process.env.OPEN_AI_KEY);
        try {
            await client.connect();
            const res = await client.query('SELECT id, unit_title FROM units');
            console.log('Query result:', res.rows);
            const units = res.rows;

            for (const unit of units) {
                const embedding = await embeddingService.createEmbedding(unit.unit_title);
                await client.query('UPDATE units SET embedding = $1 WHERE id = $2', [`[${embedding.join(", ")}]`, unit.id]);
            }

            console.log('Embeddings added to units successfully.');
            return units;
        } catch (error) {
            console.error('Error adding embeddings to units:', error);
        } finally {
            await client.end();
        }
    }
}

module.exports = new AddVectorsToLessons();