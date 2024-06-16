const express = require('express');
const { fetchPlacesFromGoogle } = require('./controllers/PlacesApiController');
const { createPlace, getPlace, updatePlace, deletePlace, getAllPlaces, createMultiplePlaces, createPlaceFromGoogleApi, createMultiplePlacesFromGoogleApi, getPlacesByUserId, deleteMultipleById} = require('./controllers/placeController.js');
const router = express.Router();

// Place routess
router.post('/place', createPlaceFromGoogleApi)
router.post('/places', createMultiplePlacesFromGoogleApi)
router.post('/placeNormal', createPlace)
router.post('/placesNormal', createMultiplePlaces)
router.get('/places/:id', getPlace)
router.get('/places', getAllPlaces)
router.delete('/places/:id', deletePlace)
router.delete('/places', deleteMultipleById)
router.put('/places/:id', updatePlace)
router.get('/places/by-user/:user_id', getPlacesByUserId)


router.post('/fetch-places-from-google', fetchPlacesFromGoogle);



module.exports = router;