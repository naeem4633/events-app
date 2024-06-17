const express = require('express');
const {
  fetchPlacesFromGoogle,
} = require('./controllers/PlacesApiController');
const {
  createPlace,
  getPlace,
  updatePlace,
  deletePlace,
  getAllPlaces,
  createMultiplePlaces,
  createPlaceFromGoogleApi,
  createMultiplePlacesFromGoogleApi,
  getPlacesByUserId,
  deleteMultipleById,
} = require('./controllers/placeController');
const {
  createVendor,
  getVendor,
  updateVendor,
  deleteVendor,
  getAllVendors,
} = require('./controllers/vendorController');
const {
  createHall,
  getHall,
  updateHall,
  deleteHall,
  getAllHalls,
} = require('./controllers/hallController');

const router = express.Router();

// Place routes
router.post('/place', createPlaceFromGoogleApi);
router.post('/places', createMultiplePlacesFromGoogleApi);
router.post('/placeNormal', createPlace);
router.post('/placesNormal', createMultiplePlaces);
router.get('/places/:id', getPlace);
router.get('/places', getAllPlaces);
router.delete('/places/:id', deletePlace);
router.delete('/places', deleteMultipleById);
router.put('/places/:id', updatePlace);
router.get('/places/by-user/:user_id', getPlacesByUserId);
router.post('/fetch-places-from-google', fetchPlacesFromGoogle);

// Vendor routes
router.post('/vendor', createVendor);
router.get('/vendors/:id', getVendor);
router.get('/vendors', getAllVendors);
router.put('/vendors/:id', updateVendor);
router.delete('/vendors/:id', deleteVendor);

// Hall routes
router.post('/hall', createHall);
router.get('/halls/:id', getHall);
router.get('/halls', getAllHalls);
router.put('/halls/:id', updateHall);
router.delete('/halls/:id', deleteHall);

module.exports = router;
