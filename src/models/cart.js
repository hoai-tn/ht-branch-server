const mongoose = require('mongoose');

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User',
    },
    products: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        image: String,
        quantity: Number,
        price: Number,
        color: String,
        size: String,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
