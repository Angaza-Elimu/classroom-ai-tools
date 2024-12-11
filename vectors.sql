CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE vectors (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NULL,
    grade VARCHAR(50) NULL,
    vectors vector(1536) NULL, -- Adjusted dimension for OpenAI embeddings
    userId INTEGER NULL
);