const mongoose = require('mongoose');

const shippingAddressSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  fullName: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('ShippingAddress', shippingAddressSchema);
