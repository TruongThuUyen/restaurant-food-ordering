const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: true,
    },
    orderId: {
      type: String | Number,
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
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'on_the_way', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
  {
    collection: 'order',
  }
);

const Order = mongoose.model('Order', ProductSchema);

module.exports = Order;
