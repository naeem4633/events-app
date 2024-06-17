const Hall = require('../models/hallModel');

const createHall = async (req, res) => {
  try {
    const hall = new Hall(req.body);
    await hall.save();
    res.status(201).send(hall);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getHall = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id).populate('place');
    if (!hall) {
      return res.status(404).send();
    }
    res.send(hall);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllHalls = async (req, res) => {
  try {
    const halls = await Hall.find({}).populate('place');
    res.send(halls);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateHall = async (req, res) => {
  try {
    const hall = await Hall.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hall) {
      return res.status(404).send();
    }
    res.send(hall);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteHall = async (req, res) => {
  try {
    const hall = await Hall.findByIdAndDelete(req.params.id);
    if (!hall) {
      return res.status(404).send();
    }
    res.send(hall);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createHall,
  getHall,
  getAllHalls,
  updateHall,
  deleteHall,
};
