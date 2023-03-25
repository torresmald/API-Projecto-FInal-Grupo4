const mongoose = require('mongoose');

const resourcesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, required: true, enum: [
        'books',
        'stories',
        'songs',
        'logical math activities',
        'reading and writing activities',
        'english activities',
        'thematic programming',
        ]},
    buy: String
    },
    {
        timestamps: true
    }
);
const Resource = mongoose.model('Resource', resourcesSchema);

module.exports = Resource;
