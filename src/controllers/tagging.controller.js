const { addVectorsToLessons, addVectorsToUnits} = require('../scripts/add-vectors-to-lessons');
class TaggingController {
    constructor(){}
    async tagLessons(req, res) {
        // try {
        //     console.log(req.body);
            const lessonVectors = await addVectorsToLessons();
            // const lessons = await lessonVectors.addVectorsToLessons;
            res.status(200).json(lessonVectors);
        // } catch (error) {
        //     res.status(500).json({ message: 'Error building vector query', error });
        // }
    }

    async tagUnits(req, res) {
        const unitVectors = await addVectorsToUnits();
        res.status(200).json(unitVectors);
    }
}

module.exports = new TaggingController();