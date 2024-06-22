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

const fetchPlaceDetailsFromGoogle = async (req, res) => {
  const { placeId } = req.query;

  if (!placeId) {
    return res.status(400).json({ error: 'placeId is required' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);

    const placeDetails = response.data.result;
    const place = {
      formatted_address: placeDetails.formatted_address || "",
      website: placeDetails.website || "",
      url: placeDetails.url || "",
      rating: placeDetails.rating || 0,
      user_ratings_total: placeDetails.user_ratings_total || 0,
      google_images: (placeDetails.photos || []).map(photo => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`),
      map: {
        lat: placeDetails.geometry.location.lat,
        lng: placeDetails.geometry.location.lng
      }
    };

    res.json(place);
  } catch (error) {
    console.error('Error fetching place details:', error);
    res.status(500).json({ error: 'Failed to fetch place details from Google Places API' });
  }
};

module.exports = { fetchPlacesFromGoogle, fetchPlaceDetailsFromGoogle };
