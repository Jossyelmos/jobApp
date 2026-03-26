// const jobController = require('../controllers/jobs');
// const router = require('express').Router();
// const jobValdator = require("../middleware/validator");
// const auth = require('../middleware/auth');

// router.use('/', require('./swagger'));

// // Get all contacts
// router.get('/', auth,
//     // swagger.tag=['Hello Contacts]
//     jobController.getJobs);
// router.get('/:id', auth, jobController.getSingleJob);
// router.post("/", auth, jobValdator, jobController.createJob);
// router.put('/:id', auth, jobValdator, jobController.updateJob);
// router.delete('/:id', auth, jobController.deleteJob);

// module.exports = router;


const express = require('express');
const router = express.Router();
const jobValidator = require('../middleware/validator');
const auth = require('../middleware/auth');
const jobController = require('../controllers/jobs');

// All routes protected
router.get('/', auth, jobController.getJobs);
router.get('/:id', auth, jobController.getSingleJob);
router.post('/', auth, jobValidator, jobController.createJob);
router.put('/:id', auth, jobValidator, jobController.updateJob);
router.delete('/:id', auth, jobController.deleteJob);

module.exports = router;