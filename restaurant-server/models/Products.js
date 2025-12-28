const mongoose = require('mongoose');
const { ProductSize } = require('./utils');

const ProductSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: [true, 'The foodname is required'],
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'The price is required'],
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      required: [true, 'The price is required'],
      trim: true,
    },
    altText: {
      type: String,
      default: '',
      trim: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    options: {
      type: [
        {
          title: {
            type: String,
            required: true,
            enum: ProductSize,
          },
          additionalPrice: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
  {
    collection: 'products',
  }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
