const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Create a storage client using the service account key file
const storage = new Storage({
  keyFilename: path.join(__dirname, '../../google-service-account-key.json'), // Adjusted path
  projectId: 'nearby-search-program',
});

const bucketName = 'events-app-bucket';
const bucket = storage.bucket(bucketName);

const uploadImage = async (file) => {
  const { originalname, buffer } = file;

  const blob = bucket.file(originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
    gzip: true,
  });

  return new Promise((resolve, reject) => {
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      resolve(publicUrl);
    })
    .on('error', (err) => {
      reject(err);
    })
    .end(buffer);
  });
};

module.exports = { uploadImage };
