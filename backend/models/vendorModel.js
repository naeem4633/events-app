const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    id: { type: String, required: true, primaryKey: true },
    firebase_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
