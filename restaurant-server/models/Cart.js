const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cartNumber: {
      type: String,
      required: true,
    },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      },
    ],
    serviceCost: {
      type: Number,
      required: true,
    },
    deliveryCost: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  },
  {
    collection: 'cart',
  }
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
