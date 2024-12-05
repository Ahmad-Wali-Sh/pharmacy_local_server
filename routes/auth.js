const express = require('express');
const router = express.Router();
const { setDjangoToken, loginController} = require('../controllers/authController');
const authenticate = require('../middlewares/authenticate');


router.post('/set-token', setDjangoToken)
router.post('/login', loginController)
router.post('/protected', authenticate, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, you are authenticated.`})
})

module.exports = router;