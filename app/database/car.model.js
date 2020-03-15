const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    topTenWords: { type: [String] },
});

module.exports = mongoose.model('car', carSchema);