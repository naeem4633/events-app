const mongoose = require('mongoose');

const savedPlaceSchema = new mongoose.Schema({
    user_firebase_id: { type: String, required: true },
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }
});

const SavedPlace = mongoose.model('SavedPlace', savedPlaceSchema);

module.exports = SavedPlace;
