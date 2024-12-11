const { Pool } = require('pg');
const { toPgVector } = require('pgvector');


async function tagAndStoreDataWithPgVector(subject, unit, lesson, textInputVectors) {
    try {
        const pool = await global.pgClient;
        await pool.connect();
        // Fetch data from PostgreSQL
        const res = await pool.query(
            'SELECT * FROM lessons WHERE subject = $1 AND unit = $2 AND lesson = $3',
            [subject, unit, lesson]
        );

        if (res.rows.length === 0) {
            throw new Error('No data found for the given subject, unit, and lesson');
        }

        const lessonData = res.rows[0];

        // Convert text input vectors to pgvector format
        const pgVectors = textInputVectors.map(vector => toPgVector(vector));

        // Find top 3 similar units using pgvector
        const topUnitsRes = await pool.query(
            `SELECT unit FROM units ORDER BY content <-> $1 LIMIT 3`,
            [pgVectors]
        );

        const topUnits = topUnitsRes.rows.map(row => row.unit);

        // Store tagged data back in PostgreSQL
        await pool.query(
            'INSERT INTO tagged_lessons (subject, unit, lesson, tags, content) VALUES ($1, $2, $3, $4, $5)',
            [subject, unit, lesson, topUnits, lessonData.content]
        );

        console.log('Data tagged and stored successfully');
    } catch (err) {
        console.error('Error tagging and storing data:', err);
    }
}

module.exports = {
    tagAndStoreDataWithPgVector,
};
