const axios = require('axios');
const Vendor = require('../models/vendorModel');
const Place = require('../models/placeModel');
const mongoose = require('mongoose');

// Function to refresh access token
async function refreshAccessToken(vendor) {
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: vendor.refreshToken,
    grant_type: 'refresh_token',
  });

  const newAccessToken = response.data.access_token;
  vendor.accessToken = newAccessToken;
  await vendor.save();
  return newAccessToken;
}

// Function to fetch calendar events
async function fetchCalendarEvents(req, res) {
  try {
    const vendorId = req.params.id;
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    try {
      const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
        headers: {
          Authorization: `Bearer ${vendor.accessToken}`,
        },
      });

      return res.json(response.data.items);
    } catch (error) {
      if (error.response.status === 401) {
        // Token expired, refresh it
        const newAccessToken = await refreshAccessToken(vendor);
        const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        return res.json(response.data.items);
      }
      throw error;
    }
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return res.status(500).json({ error: 'Error fetching calendar events' });
  }
}

// Function to handle OAuth2 callback and store tokens
async function handleOAuth2Callback(req, res) {
  const { code } = req.query;
  const vendorId = req.params.id;

  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'YOUR_REDIRECT_URI',
      grant_type: 'authorization_code',
    });

    const { access_token, refresh_token } = response.data;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    vendor.accessToken = access_token;
    vendor.refreshToken = refresh_token;
    await vendor.save();

    res.redirect('/some-success-page');
  } catch (error) {
    console.error('Error handling OAuth2 callback:', error);
    res.status(500).json({ error: 'Error handling OAuth2 callback' });
  }
}

const createVendor = async (req, res) => {
  try {
    const existingVendor = await Vendor.findOne({ email: req.body.email });
    if (existingVendor) {
      return res.status(400).send({ error: 'Email already in use' });
    }

    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).send(vendor);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).send();
    }
    res.send(vendor);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({});
    res.send(vendors);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vendor) {
      return res.status(404).send();
    }
    res.send(vendor);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).send();
    }
    res.send(vendor);
  } catch (error) {
    res.status(500).send(error);
  }
};


// Function to check if an email belongs to a vendor
const checkIfVendor = async (req, res) => {
  const { email, firebase_id, name } = req.body;

  try {
    const place = await Place.findOne({ vendor_email: email });
    if (place) {
      let vendor = await Vendor.findOne({ email });

      if (!vendor) {
        // Create a new vendor if one doesn't exist
        vendor = new Vendor({
          firebase_id,
          name,
          email,
        });
        await vendor.save();
      }

      return res.json({ isVendor: true, vendorId: vendor.id });
    }
    return res.json({ isVendor: false });
  } catch (error) {
    console.error('Error checking if user is a vendor:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createVendor,
  getVendor,
  getAllVendors,
  updateVendor,
  deleteVendor,
  fetchCalendarEvents,
  handleOAuth2Callback,
  checkIfVendor
};
