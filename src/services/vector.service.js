const natural = require("natural");
const { BM25 } = natural;

class VectorService {
  constructor() {
    this.pool = global.pgClient; // Use the pool instead of creating new connections
  }

  async insertVectorsIntoDatabase(userId, filePath, embeddings) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const insertQuery =
        "INSERT INTO vectors_units (userId, filePath, vectors) VALUES ($1, $2, $3) RETURNING *";
      console.log(Array.isArray(embeddings));
      console.log("Inserting vectors into database:", embeddings);
      const promises = await client.query(insertQuery, [
        1,
        filePath,
        `[${embeddings.join(", ")}]`,
      ]);
      await client.query("COMMIT");
      return promises.rows[0].id;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error inserting vectors into database:", error);
      throw error;
    } finally {
      client.release(); // Release the client back to the pool
    }
  }

  // vector query
  async findSimilarVectors(queryVector) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `
            SELECT id, vectors, filePath, vectors <-> $1 AS distance
            FROM vectors_units
            ORDER BY distance
            LIMIT 5;
            `,
        [`[${queryVector.join(", ")}]`]
      );

      console.log("Most similar vectors:", result.rows);
      return result.rows;
    } catch (err) {
      console.error("Error querying vectors:", err);
      return []; // Return empty array on error to maintain return type
    } finally {
      client.release(); // Release the client back to the pool
    }
  }

  async findSimilarUnits(queryVector, docId) {
    console.log(docId);
    const client = await this.pool.connect();
    try {
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
      await client.query("ROLLBACK");
      console.error("Error querying units:", err);
      return []; // Return empty array on error to maintain return type
    } finally {
      client.release(); // Release the client back to the pool
    }
  }
}

module.exports = VectorService;
