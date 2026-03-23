const jobController = require('../controllers/jobs');
const router = require('express').Router();
const jobValdator = require("../middleware/validator");

// router.use('/', require('./swagger'));

// Get all contacts
router.get('/', 
    // swagger.tag=['Hello Contacts]
    jobController.getJobs);
router.get('/:id', jobController.getSingleJob);
router.post("/", jobValdator, jobController.createJob);
router.put('/:id', jobValdator, jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;