const natural = require("natural");
const { BM25 } = natural;

class VectorService {
  async insertVectorsIntoDatabase(userId, filePath, embeddings) {
    const client = await global.pgClient;
    try {
      await client.connect();
      await client.query("BEGIN");
      const insertQuery =
        "INSERT INTO vectors (userId, filePath, vectors) VALUES ($1, $2, $3) RETURNING *";
      console.log(Array.isArray(embeddings));
      console.log("Inserting vectors into database:", embeddings);
      const promises = await client.query(insertQuery, [
        1,
        filePath,
        `[${embeddings.join(", ")}]`,
      ]);
      await client.query("COMMIT");
    //   return item id
      return promises.rows[0].id;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error inserting vectors into database:", error);
      throw error;
    }
  }

  // vector query
  async findSimilarVectors(queryVector) {
    const client = await global.pgClient;
    try {
      await client.connect();
      await client.query("BEGIN");
      const result = await client.query(
        `
            SELECT id, vectors, filePath, vectors <-> $1 AS distance
            FROM vectors
            ORDER BY distance
            LIMIT 5;
            `,
        [`[${queryVector.join(", ")}]`]
      );

      console.log("Most similar vectors:", result.rows);
      return result.rows;
    } catch (err) {
      console.error("Error querying vectors:", err);
    }
  }

  async findSimilarUnits(queryVector, docId) {
    console.log(docId);
    const client = await global.pgClient;
    try {
      await client.connect();
      await client.query("BEGIN");
      // select from units after vector retrieved
      const result = await client.query(
        `
            SELECT id, embedding, unit_title, embedding <-> $1 AS distance
            FROM units
            ORDER BY distance
            LIMIT 3;
            `,
        [`[${queryVector.join(", ")}]`]
      );
      
      console.log("Most similar units:", result.rows);
    //   update vectors table under units with appended unit_title for all similar units by the docId
        const unitTitles = result.rows.map(row => row.unit_title).join(", ");
        await client.query(
        `
            UPDATE vectors
            SET units = $1
            WHERE id = $2;
            `,
        [unitTitles, docId]
        );
        await client.query("COMMIT");
      return result.rows;
    } catch (err) {
      console.error("Error querying units:", err);
      throw err;
    }
  }
}

module.exports = VectorService;
