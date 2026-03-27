const express = require('express');
const router = express.Router();
const userValidator = require('../middleware/userValidator');
const auth = require('../middleware/auth');
const userController = require('../controllers/users');

router.post("/", userValidator, userController.registerUser); // public

// All routes protected by JWT
router.get('/', auth, userController.getUsers);
router.get('/me', auth, userController.getCurrentUser); // current user
router.put('/', auth, userValidator, userController.updateUser);
router.delete('/', auth, userController.deleteUser);

module.exports = router;