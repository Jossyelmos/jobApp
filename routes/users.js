const express = require('express');
const router = express.Router();
const userValidator = require('../middleware/userValidator');
const auth = require('../middleware/auth');
const userController = require('../controllers/users');

router.post("/", userValidator, userController.registerUser); // public

// All routes protected by JWT
router.get('/all', auth, userController.getUsers);
router.get('/single', auth, userController.getCurrentUser); // current user
router.put('/update', auth, userValidator, userController.updateUser);
router.delete('/delete', auth, userController.deleteUser);

module.exports = router;