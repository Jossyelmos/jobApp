const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  jobTitle: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  jobLink: {
    type: String
  },
  status: {
    type: String,
    enum: ['applied', 'interview', 'rejected', 'offer'],
    default: 'applied'
  },
  resume: {
    type: String // link or text
  },
  coverLetter: {
    type: String
  },
  dateApplied: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('jobApplications', JobApplicationSchema);