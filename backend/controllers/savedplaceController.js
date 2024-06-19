const SavedPlace = require('../models/savedPlaceModel');
const Place = require('../models/placeModel');

// Save a place for a user
const savePlace = async (req, res) => {
    try {
        const { user_firebase_id, place_id } = req.body;

        // Check if the place exists
        const place = await Place.findOne({ id: place_id });
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        // Check if the place is already saved by the user
        const existingSavedPlace = await SavedPlace.findOne({ user_firebase_id, place: place_id });
        if (existingSavedPlace) {
            return res.status(400).json({ error: 'Place already saved by the user' });
        }

        // Create a new saved place
        const newSavedPlace = await SavedPlace.create({ user_firebase_id, place: place_id });
        res.status(201).json(newSavedPlace);
    } catch (error) {
        console.error('Error saving place:', error);
        res.status(500).json({ error: 'Error saving place' });
    }
};

// Get all saved places for a user
const getSavedPlaces = async (req, res) => {
    try {
        const { user_firebase_id } = req.params;
        const savedPlaces = await SavedPlace.find({ user_firebase_id }).populate('place');
        res.json(savedPlaces);
    } catch (error) {
        console.error('Error fetching saved places:', error);
        res.status(500).json({ error: 'Error fetching saved places' });
    }
};

// Remove a saved place for a user
const removeSavedPlace = async (req, res) => {
    try {
        const { user_firebase_id, place_id } = req.body;
        const deletedSavedPlace = await SavedPlace.findOneAndDelete({ user_firebase_id, place: place_id });
        if (!deletedSavedPlace) {
            return res.status(404).json({ error: 'Saved place not found' });
        }
        res.json(deletedSavedPlace);
    } catch (error) {
        console.error('Error removing saved place:', error);
        res.status(500).json({ error: 'Error removing saved place' });
    }
};

module.exports = {
    savePlace,
    getSavedPlaces,
    removeSavedPlace
};
