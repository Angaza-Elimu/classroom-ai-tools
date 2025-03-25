const { Configuration, OpenAI } = require('openai');

var openAI;
class LLMService {
    constructor(apiKey) {
        this.configuration = {
            apiKey: apiKey,
        };
        console.log(process.env.OPEN_AI_KEY);
        this.openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
    }

    async generateOutput(prompt) {
        try {
            // remove extra lines from prompt
            prompt = prompt.replace(/\n+/g, '\n');
            // trim to 4096 tokens
            const cleaned = prompt.substring(0, 2000);
            const response = await this.openai.completions.create({
                model: 'gpt-3.5-turbo-instruct',
                prompt: cleaned,
                max_tokens: 900,
                n: 1,
                stop: null,
                temperature: 0.7,
            });
            // concatenate all response choices to the text
            
            return response.choices[0].text;
        } catch (error) {
            console.error('Error generating output:', error);
            throw error;
        }
    }

    async createEmbedding(input) {
        try {
            console.log("Creating embedding");
            console.log(input);
            const response = await this.openai.embeddings.create({
                model: 'text-embedding-ada-002',
                input: input,
            });
            console.log(response.data);
            return response.data[0].embedding;
        } catch (error) {
            console.error('Error creating embedding:', error);
            throw error;
        }
    }
   
}

module.exports = LLMService;