const vectorService = require('../services/vector.service');

class VectorController {
    async buildVectorQuery(req, res) {
        try {
            const { query } = req.body;
            const vectorQuery = await vectorService.buildQuery(query);
            res.status(200).json(vectorQuery);
        } catch (error) {
            res.status(500).json({ message: 'Error building vector query', error });
        }
    }

    async callVectorDbService(req, res) {
        try {
            const { query } = req.body;
            const result = await vectorService.callDbService(query);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error calling vector DB service', error });
        }
    }
}

module.exports = new VectorController();