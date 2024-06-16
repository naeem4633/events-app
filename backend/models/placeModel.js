const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    id: { type: String, required: true, primaryKey: true },
    displayName: { type: String, required: true },
    internationalPhoneNumber: { type: String, default: '' },
    formattedAddress: { type: String, required: true },
    websiteUri: { type: String, default: '' },
    googleMapsUri: { type: String, default: '' },
    businessStatus: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    userRatingCount: { type: Number, default: 0 },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    seating_capacity: { type: Number, default: 0 }, 
    price_per_head: { type: Number, default: 0 },
    type: { type: String, default: '' },
    halls: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hall'
        }
    ]
});
