const express = require('express');
const { register, login, setPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/set-password', setPassword);

module.exports = router;
