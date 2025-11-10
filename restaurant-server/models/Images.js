const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    altText: { type: String, default: '' },
  },
  {
    collection: 'images-temporary',
  }
);

const ImageTemporary = mongoose.model('ImageTemporary', imageSchema);

module.exports = ImageTemporary;
