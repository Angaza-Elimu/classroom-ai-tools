const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const curriculumSchema = new Schema({
    strand: { type: String, required: true },
    subStrand: { type: String, required: true },
    lesson: { type: String, required: true },
    lessonObjective: { type: String, required: true },
    interactiveActivitiesGuide: { type: String, required: true },
    videoScript: { type: String, required: true },
    starterQuizz: { type: String, required: true },
    exitQuizz: { type: String, required: true },
    worksheets: { type: String, required: true },
    lessonNotes: { type: String, required: true },
    storiesForVocabularyEnhancement: { type: String, required: true },
    images: { type: String, required: true }
});

module.exports = mongoose.model('Curriculum', curriculumSchema);