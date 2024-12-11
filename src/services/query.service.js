// import llm service and vector service
const llmService = require('./llm.service');
const vectorService = require('./vector.service');

class QueryService {
    constructor(vectorService, llmService) {
        this.vectorService = vectorService;
        this.llmService = llmService;
    }

    async handleInput(input) {
        try {
            // Call vector service to search
            const vectorResults = await this.vectorService.search(input);

            // Call LLM service to humanify the answer
            const humanifiedAnswer = await this.llmService.process(vectorResults);

            return humanifiedAnswer;
        } catch (error) {
            console.error('Error handling input:', error);
            throw error;
        }
    }
}

module.exports = QueryService;