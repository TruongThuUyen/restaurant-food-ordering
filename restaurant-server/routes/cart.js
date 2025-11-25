var express = require('express');
const { getCart, mergeCart } = require('../controller/cart');
var router = express.Router();

/* Get carts */
router.post('/', getCart);

router.post('/merge', mergeCart);

module.exports = router;
