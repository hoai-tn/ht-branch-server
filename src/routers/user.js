const router = require('express').Router();
const { signIn, signUp, createShippingAddress, authGoogle, getShippingAddress } = require('../controllers/user');
router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.post('/shipping-address/create', createShippingAddress);
router.get('/shipping-address/get/:userId', getShippingAddress);
router.post('/auth-google', authGoogle);

module.exports = router;
