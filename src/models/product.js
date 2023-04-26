const mongoose = require('mongoose');

const product = mongoose.Schema({
  title: String,
  name: String,
  image: String,
  tags: [String],
  price: Number,
  color: [String],
  size: [String],
  type: String,
  detail: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [Object],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Product', product);
