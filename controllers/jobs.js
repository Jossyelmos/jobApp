const Job = require('../models/jobs');

// GET all jobs for logged-in user
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single job – only if belongs to user
const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user.userId });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE job – assign user
const createJob = async (req, res) => {
  try {
    const { jobTitle, company, jobLink, status, resume, coverLetter, dateApplied } = req.body;

    const job = new Job({
      user: req.user.userId,
      jobTitle,
      company,
      jobLink,
      status,
      resume,
      coverLetter,
      dateApplied,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE job – only own jobs
const updateJob = async (req, res) => {
  try {
    const updates = req.body;

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { $set: updates },
      { new: true }
    );

    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE job – only own jobs
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json({ msg: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};