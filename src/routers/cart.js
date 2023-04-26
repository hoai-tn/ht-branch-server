const router = require('express').Router();
const { getCart, addToCart, removeCart } = require('../controllers/cart');
router.get('/:userId', getCart);
router.post('/add', addToCart);
router.post('/remove', removeCart);

module.exports = router;
