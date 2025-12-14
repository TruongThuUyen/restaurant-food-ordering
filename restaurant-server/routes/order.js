const express = require('express');
var router = express.Router();
const { insertOrderItem, updateOrderStatus } = require('../controller/order');

/* GET list of orders */
router.get('/');

router.post('/', insertOrderItem);

router.patch('/:id', updateOrderStatus);

module.exports = router;
