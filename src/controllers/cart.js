const Cart = require('../models/cart');

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Cart.findOne({ userId });
    if (!result) res.status(400).json({ message: 'Could not found userID.' });
    else res.status(200).send({ result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const exitingCart = await Cart.findOne({ userId });
    let result = {};
    if (exitingCart) {
      const update = { productIds: [...exitingCart.productIds, productId] };
      await Cart.updateOne({ ...exitingCart }, update);
      result = { ...exitingCart._doc, ...update };
    } else {
      result = await Cart.create({ userId, productIds: [productId] });
    }
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const removeCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const findCartByUser = await Cart.findOne({ userId });
    if (!findCartByUser) {
      res.status(400).json({ message: 'Could not found userID.' });
    } else {
      const findProductsById = findCartByUser.productIds.findIndex((e) => e === productId);
      findCartByUser.productIds.splice(findProductsById, 1);

      const update = { productIds: [...findCartByUser.productIds] };

      await Cart.updateOne({ userId }, update);
      const result = { ...findCartByUser._doc, ...update };
      res.status(200).send({ result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
module.exports = {
  getCart,
  addToCart,
  removeCart,
};
