const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  ggId: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  picture: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);
