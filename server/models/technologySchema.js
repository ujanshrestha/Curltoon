const mongoose = require('mongoose');
const TechnologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    featured_image: {
        type: String,
        // required: true
    },

    status: {
        type: String,
    },
    date: {
        type: Date,
        default:
        Date.now
    }
});


const Technology = mongoose.model('TECHNOLOGY', TechnologySchema);

module.exports = Technology;