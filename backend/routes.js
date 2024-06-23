const express = require('express');
const multer = require('multer');

const {
  fetchPlacesFromGoogle, fetchPlaceDetailsFromGoogle
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
  getPlacesByUserEmail,
  deleteMultipleById,
  searchPlaces,
  getFeaturedVenues
} = require('./controllers/placeController');
const {
  createVendor,
  getVendor,
  updateVendor,
  deleteVendor,
  getAllVendors,
  fetchCalendarEvents,
  handleOAuth2Callback,
  checkIfVendor
} = require('./controllers/vendorController');
const {
  createHall,
  getHall,
  updateHall,
  deleteHall,
  getAllHalls,
} = require('./controllers/hallController');
const { savePlace, getSavedPlaces, removeSavedPlace } = require('./controllers/savedplaceController');
const { uploadImageController } = require('./controllers/uploadController');


const router = express.Router();
const upload = multer();

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
router.get('/places/by-user/:user_email', getPlacesByUserEmail);
router.post('/fetch-places-from-google', fetchPlacesFromGoogle);
router.get('/place-details-from-google', fetchPlaceDetailsFromGoogle);
router.get('/featured-places', getFeaturedVenues);
//search places against search terms in loacl database
router.post('/search-places', searchPlaces);

// Vendor routes
router.post('/vendor', createVendor);
router.get('/vendors/:id', getVendor);
router.get('/vendors', getAllVendors);
router.put('/vendors/:id', updateVendor);
router.delete('/vendors/:id', deleteVendor);
// New routes for OAuth2 and calendar events
router.get('/vendors/:id/oauth2callback', handleOAuth2Callback);
router.get('/vendors/:id/calendar-events', fetchCalendarEvents);
router.post('/vendor/check', checkIfVendor);

// Hall routes
router.post('/hall', createHall);
router.get('/halls/:id', getHall);
router.get('/halls', getAllHalls);
router.put('/halls/:id', updateHall);
router.delete('/halls/:id', deleteHall);

// Saved Place routes
router.post('/saved-places', savePlace);
router.get('/saved-places/:user_firebase_id', getSavedPlaces);
router.delete('/saved-places', removeSavedPlace);

//Upload image routes
router.post('/upload-image', upload.single('file'), uploadImageController);

module.exports = router;
