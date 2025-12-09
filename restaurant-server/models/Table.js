const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema(
  {
    value: { type: String, required: true, unique: true },
    lable: { type: String, required: true, unique: true },
    status: { type: String, enum: ['available', 'occupied'], default: 'available' },
  },
  {
    timestamps: true,
  },
  {
    collection: 'table',
  }
);

const Table = mongoose.model('Table', TableSchema);

module.exports = Table;
