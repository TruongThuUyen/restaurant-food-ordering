const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema(
  {
    tableNumber: { type: Number, required: true, unique: true },
    status: { type: String, enum: ['available', 'occupied'], default: 'available' },
  },
  {
    timestamps: true,
  },
  {
    collection: 'products',
  }
);

const Table = mongoose.model('Table', TableSchema);

module.exports = Table;
