const Place = require('../models/placeModel');

// Get featured venues
const getFeaturedVenues = async (req, res) => {
  try {
    const featuredPlaces = await Place.find({ featured: true }).populate('halls');
    res.json(featuredPlaces);
  } catch (error) {
    console.error('Error fetching featured venues:', error);
    res.status(500).json({ error: 'Error fetching featured venues' });
  }
};

// Existing functions
const createPlaceFromGoogleApi = async (req, res) => {
  try {
      const { id, vendor_email } = req.body;
      
      // Check if a place with the same ID and vendor email already exists
      const existingPlace = await Place.findOne({ id, vendor_email });
      if (existingPlace) {
          return res.status(400).json({ error: 'Place already exists' });
      }

      // Create a new place
      const newPlace = await Place.create(req.body);
      res.status(201).json(newPlace);
  } catch (error) {
      console.error('Error creating place:', error);
      res.status(500).json({ error: 'Error creating place' });
  }
};

const createMultiplePlacesFromGoogleApi = async (req, res) => {
  try {
      const { places } = req.body;
      const createdPlaces = [];

      for (const placeData of places) {
          const { id, vendor_email } = placeData;
          
          // Check if a place with the same ID and vendor email already exists
          const existingPlace = await Place.findOne({ id, vendor_email });
          if (existingPlace) {
              return res.status(400).json({ error: 'Place already exists' });
          }

          // Create a new place
          const createdPlace = await Place.create(placeData);
          createdPlaces.push(createdPlace);
      }

      res.json({ places: createdPlaces });
  } catch (error) {
      console.error('Error creating places:', error);
      res.status(500).json({ error: 'Error creating places' });
  }
};

const createPlace = async (req, res) => {
  try {
      const { id, vendor_email } = req.body;
      
      // Check if a place with the same ID and vendor email already exists
      const existingPlace = await Place.findOne({ id, vendor_email });
      if (existingPlace) {
          return res.status(400).json({ error: 'Place already exists' });
      }

      // Create a new place
      const newPlace = await Place.create(req.body);
      res.status(201).json(newPlace);
  } catch (error) {
      console.error('Error creating place:', error);
      res.status(500).json({ error: 'Error creating place' });
  }
};

const createMultiplePlaces = async (req, res) => {
  try {
    const { places } = req.body;
    const createdPlaces = [];

    for (const placeData of places) {
      const { id, vendor_email } = placeData;

      try {
        // Check if a place with the same ID and vendor email already exists
        const existingPlace = await Place.findOne({ id, vendor_email });
        if (existingPlace) {
          // Skip this place and continue to the next iteration
          console.log(`Place with ID ${id} already exists. Skipping.`);
          continue;
        }

        // Create a new place
        const createdPlace = await Place.create(placeData);
        createdPlaces.push(createdPlace);
      } catch (error) {
        // Log the error and continue to the next iteration
        console.error(`Error creating place with ID ${id}:`, error);
        continue;
      }
    }

    res.json({ places: createdPlaces });
  } catch (error) {
    console.error('Error creating places:', error);
    res.status(500).json({ error: 'Error creating places' });
  }
};

const deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findOneAndDelete({ id: req.params.id });
    if (!deletedPlace) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.json(deletedPlace);
  } catch (error) {
    console.error('Error deleting place:', error);
    res.status(500).json({ error: 'Error deleting place' });
  }
};  

const deleteMultipleById = async (req, res) => {
  try {
      const { ids } = req.body;

      // Delete multiple objects based on the provided IDs
      const deletedObjects = await Promise.all(ids.map(async (id) => {
          const deletedObject = await Place.findOneAndDelete({ id });
          return deletedObject;
      }));

      // Check if any object was deleted
      if (deletedObjects.some(object => !object)) {
          return res.status(404).json({ error: 'Some objects not found' });
      }

      res.json(deletedObjects);
  } catch (error) {
      console.error('Error deleting objects:', error);
      res.status(500).json({ error: 'Error deleting objects' });
  }
};

const updatePlace = async (req, res) => {
  const { id } = req.params; // Corrected to use 'id'
  const updateData = req.body;

  try {
    const place = await Place.findByIdAndUpdate(id, updateData, { new: true });
    if (!place) {
      return res.status(404).send({ message: 'Place not found' });
    }
    res.status(200).send(place);
  } catch (error) {
    res.status(400).send({ message: 'Error updating place', error });
  }
};

const getPlace = async (req, res) => {
  try {
    const place = await Place.findOne({ id: req.params.id });
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    console.error('Error fetching place:', error);
    res.status(500).json({ error: 'Error fetching place' });
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Error fetching places' });
  }
};

const getPlacesByUserEmail = async (req, res) => {
  try {
      const { vendor_email } = req.params;
      const places = await Place.find({ vendor_email });
      if (places.length === 0) {
          return res.status(404).json({ message: 'No places found for user' });
      }
      res.json(places);
  } catch (error) {
      console.error('Error fetching places by user email:', error);
      res.status(500).json({ error: 'Error fetching places by user email' });
  }
};

const searchPlaces = async (req, res) => {
  try {
    const { address } = req.body;

    // Extract the city from the address (second last part of the address)
    const addressParts = address.split(',').map(part => part.trim());
    const city = addressParts.length > 1 ? addressParts[addressParts.length - 2] : '';

    // Query to find places with matching city in the address and populate the halls field
    const places = await Place.find({
      address: new RegExp(city, 'i'),
    }).populate('halls'); // Assuming halls is the field that references the Hall collection

    if (places.length === 0) {
      return res.status(404).json({ message: 'No places found matching the criteria' });
    }

    res.json(places);
  } catch (error) {
    console.error('Error searching for places:', error);
    res.status(500).json({ error: 'Error searching for places' });
  }
};

module.exports = {
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
};
