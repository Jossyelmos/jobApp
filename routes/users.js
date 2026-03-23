const userController = require('../controllers/users');
const router = require('express').Router();
const userValdator = require("../middleware/userValidator");

router.use('/', require('./swagger'));

// Get all contacts
router.get('/', 
    // swagger.tag=['Hello Contacts]
    userController.getUsers);
router.get('/:id', userController.getSingleUser);
router.post("/", userValdator, userController.createUser);
router.put('/:id', userValdator, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;