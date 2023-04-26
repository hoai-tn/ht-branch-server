const mongoose = require('mongoose');

const cart = mongoose.Schema({
  userId: { type: String, required: true },
  productIds: { type: [String], required: true },
});

module.exports = mongoose.model('Cart', cart);
