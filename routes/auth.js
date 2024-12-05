const express = require('express');
const router = express.Router();
const { setToken} = require('../controllers/authController')


router.post('/set-token', setToken)

module.exports = router;