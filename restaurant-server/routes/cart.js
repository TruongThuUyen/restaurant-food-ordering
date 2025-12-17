var express = require('express');
const {
  getCart,
  mergeCart,
  removeItem,
  decreaseItemQuantity,
  removeAllItemInCart,
} = require('../controller/cart');
var router = express.Router();

/* Get carts */
router.post('/', getCart);

router.post('/merge', mergeCart);

router.post('/items/decrease', decreaseItemQuantity);

router.post('/items/remove', removeItem);

router.post('/remove-all', removeAllItemInCart);

module.exports = router;
