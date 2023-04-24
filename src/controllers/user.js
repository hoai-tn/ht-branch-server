const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exitingUser = await User.findOne({ email });

    if (!exitingUser) return res.status(404).json({ message: 'User does not exits.' });

    const isCorrectPassword = await bcrypt.compare(password, exitingUser.password);
    if (!isCorrectPassword) return res.status(404).json({ message: 'Invalid password.' });

    const token = jwt.sign({ email, id: exitingUser._id }, 'test', {
      expiresIn: '1h',
    });

    return res.status(200).json({ token, exitingUser });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const exitingUser = await User.findOne({ email });
    if (exitingUser) return res.status(404).json({ message: 'User already exits.' });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashPassword, name });

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
      expiresIn: '1h',
    });

    return res.status(200).json({ token, result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
module.exports = {
  signIn,
  signUp,
};
