const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    strand: {
        type: String,
        required: true
    },
    substrand: {
        type: String,
        required: true
    },
    lessonName: {
        type: String,
        required: true
    },
    lessonObjective: {
        type: String,
        required: true
    },
    activityId: {
        type: String,
        required: true
    },
    videoScripts: {
        type: [String],
        required: true
    },
    worksheets: {
        type: [String],
        required: true
    },
    lessonNotes: {
        type: String,
        required: true
    },
    imagesDescription: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Lesson', lessonSchema);