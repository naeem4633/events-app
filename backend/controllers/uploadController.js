const { uploadImage } = require('../utils/upload-utility');

const uploadImageController = async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file);
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
};

module.exports = { uploadImageController };
