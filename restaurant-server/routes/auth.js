var express = require('express');
const register = require('../controller/register');
const login = require('../controller/login');
const profile = require('../controller/profile');
const authticate = require('../middleware/auth');
const router = express.Router();

// Create new account
router.post('/register', register);

// Login
router.post('/login', login);

// Get profile
router.get('/profile', authticate, profile);

module.exports = router;
