const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Place = require('./models/placeModel');
const Hall = require('./models/hallModel');
const Vendor = require('./models/vendorModel');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Events-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateSampleData = async () => {
  try {
    // Create 10 vendors
    const vendors = [];
    for (let i = 0; i < 10; i++) {
      const vendor = new Vendor({
        id: uuidv4(),
        firebase_id: uuidv4(),
        name: `Vendor ${i + 1}`,
        email: `vendor${i + 1}@example.com`,
      });
      vendors.push(vendor);
      await vendor.save();
    }

    // Possible cities
    const cities = ['Islamabad', 'Lahore', 'Karachi'];

    // Create 10 places and 1-3 halls for each place
    for (let i = 0; i < 10; i++) {
      // Randomly select a city
      const city = cities[Math.floor(Math.random() * cities.length)];
      
      const place = new Place({
        id: uuidv4(),
        name: `Place ${i + 1}`,
        address: `123 Main St, ${city}`,
        website_uri: `http://place${i + 1}.com`,
        google_maps_uri: `http://maps.google.com/?q=Place+${i + 1}`,
        vendor: vendors[i]._id,
        seating_capacity: Math.floor(Math.random() * 100) + 50,
        price_per_head: Math.floor(Math.random() * 100) + 20,
        type: 'Restaurant',
        images: [`http://place${i + 1}.com/image1.jpg`, `http://place${i + 1}.com/image2.jpg`],
      });

      const halls = [];
      const numberOfHalls = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numberOfHalls; j++) {
        const hall = new Hall({
          name: `Hall ${j + 1} of Place ${i + 1}`,
          price_per_head: Math.floor(Math.random() * 100) + 20,
          seating_capacity: Math.floor(Math.random() * 100) + 50,
          images: [`http://place${i + 1}.com/hall${j + 1}_image1.jpg`, `http://place${i + 1}.com/hall${j + 1}_image2.jpg`],
          place: place._id,
        });
        halls.push(hall);
        await hall.save();
      }

      place.halls = halls.map(hall => hall._id);
      await place.save();
    }

    console.log('Sample data created successfully!');
  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    mongoose.connection.close();
  }
};

generateSampleData();
