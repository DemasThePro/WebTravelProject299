const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    destination: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    description: String,
});

module.exports = mongoose.model('Travel', travelSchema);