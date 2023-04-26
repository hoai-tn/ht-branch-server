const Product = require('../models/product');
const { faker } = require('@faker-js/faker');

const createProducts = async () => {
  for (let i = 0; i < 50; i++) {
    await Product.create({
      title: faker.lorem.sentence(4),
      name: faker.commerce.productName(),
      image: faker.image.fashion(640, 480, true),
      price: faker.commerce.price(),
      color: [faker.color.human(), faker.color.human(), faker.color.human()],
      size: ['M', 'XL'],
      type: '1',
      detail: faker.lorem.paragraph(2),
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const result = await Product.find();
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id);
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = { getProducts, getProductByID };
