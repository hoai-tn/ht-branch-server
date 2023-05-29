const User = require('../models/user');
const ShippingAddress = require('../models/shippingAddress');
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

    return res.status(200).json({ token, result: exitingUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const exitingUser = await User.findOne({ email });
    if (exitingUser) return res.status(404).json({ message: 'User already exits.' });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashPassword,
      name,
      picture:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      google,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
      expiresIn: '1h',
    });

    return res.status(200).json({ token, result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
const authGoogle = async (req, res) => {
  try {
    const { id, email, name, picture } = req.body;
    let result = null;
    let token = null;
    const exitingUser = await User.findOne({ ggId: id });
    if (exitingUser) {
      token = jwt.sign({ email: exitingUser.email, id: exitingUser._id }, 'auth', {
        expiresIn: '1h',
      });
      result = exitingUser;
    } else {
      result = await User.create({
        email,
        name,
        picture,
        ggId: id,
      });
      token = jwt.sign({ email: result.email, id: result._id }, 'auth', {
        expiresIn: '1h',
      });
    }

    return res.status(200).json({ token, result });
  } catch (error) {}
};
const createShippingAddress = async (req, res) => {
  try {
    const { userId, country, fullName, address, city, state, zip, phoneNumber } = req.body;
    const exitingUser = await User.findById(userId);
    if (!exitingUser) return res.status(404).json({ message: 'User does not exits.' });
    const result = await ShippingAddress.create({
      userId,
      country,
      fullName,
      address,
      city,
      state,
      zip,
      phoneNumber,
    });
    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
  }
};

const getShippingAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    const exitingUser = await ShippingAddress.find({ userId });
    if (!exitingUser) return res.status(404).json({ message: 'User does not exits.' });

    return res.status(200).json({ result: exitingUser });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  signIn,
  signUp,
  createShippingAddress,
  getShippingAddress,
  authGoogle,
};
