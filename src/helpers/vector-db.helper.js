const { Client } = require('pg'); // For PostgreSQL
const { PineconeClient } = require('pinecone-client'); // For Pinecone

class VectorDBHelper {
    constructor(config) {
        this.config = config;
        this.pgClient = new Client(config.pg);
        this.pineconeClient = new PineconeClient(config.pinecone);
    }

    async connect() {
        try {
            await this.pgClient.connect();
            await this.pineconeClient.connect();
            console.log('Connected to both PostgreSQL and Pinecone');
        } catch (error) {
            console.error('Error connecting to databases:', error);
        }
    }

    async disconnect() {
        try {
            await this.pgClient.end();
            await this.pineconeClient.disconnect();
            console.log('Disconnected from both PostgreSQL and Pinecone');
        } catch (error) {
            console.error('Error disconnecting from databases:', error);
        }
    }

    async queryPostgres(query, params) {
        try {
            const res = await this.pgClient.query(query, params);
            return res.rows;
        } catch (error) {
            console.error('Error querying PostgreSQL:', error);
        }
    }

    async queryPinecone(index, queryVector) {
        try {
            const res = await this.pineconeClient.query(index, queryVector);
            return res;
        } catch (error) {
            console.error('Error querying Pinecone:', error);
        }
    }
}

module.exports = VectorDBHelper;