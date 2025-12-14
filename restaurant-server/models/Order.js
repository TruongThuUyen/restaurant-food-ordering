const mongoose = require('mongoose');
const { OrderStatus, ProductSize } = require('./utils');

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: String,
      require: true,
    },
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        foodName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        size: { type: String, enum: ProductSize, require: true },
      },
    ],
    status: {
      type: String,
      enum: OrderStatus,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: 'order',
  }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
