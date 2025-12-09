var express = require('express');
var router = express.Router();
const { getTableAvailable, updateTableStatus } = require('../controller/table.js');

router.get('/available', getTableAvailable);

router.patch('/', updateTableStatus);

module.exports = router;
