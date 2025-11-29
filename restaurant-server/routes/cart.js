var express = require('express');
const { getCart, mergeCart, removeItem, decreaseItemQuantity } = require('../controller/cart');
var router = express.Router();

/* Get carts */
router.post('/', getCart);

router.post('/merge', mergeCart);

router.post('/items/decrease', decreaseItemQuantity);

router.post('/items/remove', removeItem);

module.exports = router;
