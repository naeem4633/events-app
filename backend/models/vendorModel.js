const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  firebase_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  accessToken: { type: String, required: false },
  refreshToken: { type: String, required: false },
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
