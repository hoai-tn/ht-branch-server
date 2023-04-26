const router = require('express').Router();
const { getProducts,getProductByID } = require('../controllers/product');

router.get('/', getProducts);
router.get('/:id', getProductByID);

module.exports = router;
