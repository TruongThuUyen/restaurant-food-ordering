const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
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

const Branch = mongoose.model('Branch', BranchSchema);

module.exports = Branch;
