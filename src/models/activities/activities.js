const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({ 
    strand: {
        type: Schema.Types.ObjectId,
        ref: 'Strand',
        required: true
    },
    substrand: {
        type: Schema.Types.ObjectId,
        ref: 'Substrand',
        required: true
    },
    images: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    video_url: {
        type: String
    },
    objective: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', ActivitySchema);