const Vendor = require('../models/vendorModel');

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

module.exports = {
  createVendor,
  getVendor,
  getAllVendors,
  updateVendor,
  deleteVendor,
};
