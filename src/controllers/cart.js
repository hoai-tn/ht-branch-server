const { default: mongoose } = require('mongoose');
const Cart = require('../models/cart');
const Product = require('../models/product');

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const exitingCart = await Cart.findOne({ userId });
    if (!exitingCart) res.status(200).json({ message: 'Could not found userID.' });
    else {
      res.status(200).send({ result: exitingCart });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
const addToCart = async (req, res) => {
  try {
    const { userId, product } = req.body;
    const exitingCart = await Cart.findOne({ userId });
    let result = {};
    if (exitingCart) {
      const getProduct = exitingCart.products.find((item) => item._id.equals(product._id));
      // update quantity of product
      if (getProduct) {
        result = await Cart.findOneAndUpdate(
          { 'products._id': product._id },
          {
            $set: {
              'products.$.quantity': getProduct.quantity + product.quantity,
            },
          },
          {
            returnOriginal: false,
          }
        );
      } else {
        // insert product
        result = await Cart.findOneAndUpdate(
          { userId: userId },
          {
            $set: {
              products: [...exitingCart.products, product],
            },
          },
          {
            returnOriginal: false,
          }
        );
      }
    } else {
      result = await Cart.create({ userId, products: [product] });
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const removeCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const findCartByUser = await Cart.findOne({ userId });
    if (!findCartByUser) {
      res.status(400).json({ message: 'Could not found userID.' });
    } else {
      const findProductById = findCartByUser.products.find((e) => e._id.equals(productId));
      let result;
      if (quantity > 0) {
        result = await Cart.findOneAndUpdate(
          { 'products._id': findProductById._id },
          {
            $set: {
              'products.$.quantity': quantity,
            },
          },
          {
            returnOriginal: false,
          }
        );
      } else {
        const deleteProduct = findCartByUser.products.filter((e) => !e._id.equals(productId));
        result = await Cart.findOneAndUpdate(
          { userId: userId },
          {
            $set: {
              products: deleteProduct,
            },
          },
          {
            returnOriginal: false,
          }
        );
      }
      res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const productsByProductIds = async (ids) => {
  console.log({ ids });

  const unqId = {};

  ids.forEach((e) => {
    const i = 1;
    unqId[e] = i + 1;
  });

  const countIds = Object.keys(unqId).map((uId) => {
    const count = ids.filter((id) => id === uId).length;
    return { id: uId, count };
  });
  const products = countIds.map(async (e) => {
    const records = await Product.findById(e.id);
    return { ...records, count: e.count };
  });
  // const records = await Product.find({
  //   _id: {
  //     $in: [...ids.map((e) => new mongoose.Types.ObjectId(e))],
  //   },
  // });
  console.log({ products });
  return products;
};
module.exports = {
  getCart,
  addToCart,
  removeCart,
};
