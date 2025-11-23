const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      unique: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: 'City',
  }
);

const City = mongoose.model('City', CitySchema);
module.exports = City;
