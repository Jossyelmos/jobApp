// const Job = require('../models/jobs');

// const getJobs = async (req, res) => {
//   // swagger.tag=[Contacts]
//     try {
//         const jobs = await Job.find({ user: req.user.userId });
//         res.json(jobs);
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
// };


// const getSingleJob = async (req, res) => {
//   // swagger.tag=['Hello Contacts]
//   try {
//     const job = await Job.findById(req.params.id);

//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     res.json(job);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const createJob = async (req, res) => {
//   try {
//     const { jobTitle, company, jobLink, status, resume, coverLetter, dateApplied } = req.body;

//     const job = ({
//       user: req.user.userId,
//       jobTitle,
//       company,
//       jobLink,
//       status,
//       resume,
//       coverLetter,
//       dateApplied,
//     });

//     const jobModel = new Job(job);
//     await jobModel.save();

//     res.status(201).json(jobModel);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };


// const updateJob = async (req, res) => {
//   // swagger.tag=['Hello Contacts]
//   const {jobTitle, company, jobLink, status, resume, coverLetter, dateApplied} = req.body;

//   let job = {};

//   if (jobTitle) job.jobTitle = jobTitle;
//   if (company) job.company = company;
//   if (jobLink) job.jobLink = jobLink;
//   if (status) job.status = status;
//   if (resume) job.resume = resume;
//   if (coverLetter) job.coverLetter = coverLetter;
//   if (dateApplied) job.dateApplied = dateApplied;
//   try {
//     let jobId = await Job.findById(req.params.id);

//     if (!jobId) return res.status(404).json({ msg: "Job not found" });

//     jobId = await Job.findByIdAndUpdate(req.params.id, { $set: job }, { new: true });

//     res.json(jobId);
//   } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//   }
// };


// const deleteJob = async (req, res) => {
//   // swagger.tag=['Hello Contacts]
//   try {
//     const deleted = await Job.findByIdAndDelete(req.params.id);

//     if (!deleted) return res.status(404).json({ msg: "Job not found..."});

//     res.json({ msg: 'Job Deleted' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// };


// module.exports = {
//     getJobs,
//     getSingleJob,
//     createJob,
//     updateJob,
//     deleteJob
// };


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