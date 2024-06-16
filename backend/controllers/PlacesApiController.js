const axios = require('axios');

const fetchPlacesFromGoogle = async (req, res) => {
  const { placeName, currentLocation } = req.body;

  if (!placeName || !currentLocation) {
    return res.status(400).json({ error: 'placeName and currentLocation are required' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const apiUrl = 'https://places.googleapis.com/v1/places:searchText';

  try {
    const response = await axios.post(
      apiUrl,
      {
        textQuery: `${placeName} near ${currentLocation}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress'
        }
      }
    );

    const gyms = response.data.places.map(place => ({
      name: place.displayName.text,
      address: place.formattedAddress,
    }));

    res.json(gyms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from Google Places API' });
  }
};

module.exports = { fetchPlacesFromGoogle };
