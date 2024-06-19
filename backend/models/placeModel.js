const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    id: { type: String, required: true, primaryKey: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    website_uri: { type: String, default: '' },
    google_maps_uri: { type: String, default: '' },
    vendor_email: { type: String, default: '' },
    seating_capacity: { type: Number, default: 0 },
    price_per_head: { type: Number, default: 0 },
    type: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    userRatingCount: { type: Number, default: 0 },
    halls: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hall'
        }
    ],
    google_images: { type: [String], default: [] },
    images: { type: [String], default: [] } 
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
