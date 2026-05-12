const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },

  value: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    required: true,
  },
});

const Language = mongoose.model('Language', LanguageSchema);

module.exports = Language;
