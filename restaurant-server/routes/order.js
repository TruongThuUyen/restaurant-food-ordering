const express = require('express');
var router = express.Router();
const {
  insertOrderItem,
  updateOrderStatus,
  getOrdersListByUserID,
} = require('../controller/order');

/* GET list of orders */
router.get('/users/:id', getOrdersListByUserID);

router.post('/', insertOrderItem);

router.patch('/:id', updateOrderStatus);

module.exports = router;
