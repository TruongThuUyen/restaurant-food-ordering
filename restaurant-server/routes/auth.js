var express = require('express');
const register = require('../controller/register');
const login = require('../controller/login');
const router = express.Router();

// Create new account
router.post('/register', register);

router.post('/login', login);

module.exports = router;
