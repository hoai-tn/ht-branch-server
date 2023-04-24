const mongoose = require('mongoose');

const cart = mongoose.Schema({
  id: { type: String },
  userId: { type: String, required: true },
  product: { type: [String], required: true },
});

module.exports = mongoose.model('Cart', cart);
