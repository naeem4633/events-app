const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price_per_head: { type: Number, default: 0 },
    seating_capacity: { type: Number, default: 0 },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    }
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;