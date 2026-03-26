const authController = require('../controllers/auth');
const router = require('express').Router();
const authValdator = require("../middleware/authValidator");
const auth = require('../middleware/auth');

router.use('/', require('./swagger'));

// Protected route (to test token)
router.post("/login", authValdator, authController.loginUser);

// Login
router.get('/', auth,
    // swagger.tag=['Hello User]
    authController.getUser);

router.post('/logout', auth, (req, res) => {
    // JWT is stateless; instruct client to delete token
    res.json({ message: 'User logged out successfully. Please remove token from client.' });
    });

module.exports = router;