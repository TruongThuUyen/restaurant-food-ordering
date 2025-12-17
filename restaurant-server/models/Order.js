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
    table: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
      value: { type: String, required: false },
      label: { type: String, required: false },
      status: { type: String, enum: ['available', 'occupied'] },
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
        productImage: { type: String, require: false },
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
