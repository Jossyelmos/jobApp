const Job = require('../models/jobs');

const getJobs = async (req, res) => {
  // swagger.tag=[Contacts]
    try {
        const jobs = await Job.find();
        res.json(jobs);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};


const getSingleJob = async (req, res) => {
  // swagger.tag=['Hello Contacts]
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createJob = async(req, res) => {
    const {jobTitle, company, jobLink, status, resume, coverLetter, dateApplied} = req.body;

    let job = {};

    job.jobTitle = jobTitle;
    job.company = company;
    job.jobLink = jobLink;
    job.status = status;
    job.resume = resume;
    job.coverLetter = coverLetter;
    job.dateApplied = dateApplied;

    let jobModel = new Job(job);
    await jobModel.save();

    res.json(jobModel);
}


const updateJob = async (req, res) => {
  // swagger.tag=['Hello Contacts]
  const {jobTitle, company, jobLink, status, resume, coverLetter, dateApplied} = req.body;

  let job = {};

  if (jobTitle) job.jobTitle = jobTitle;
  if (company) job.company = company;
  if (jobLink) job.jobLink = jobLink;
  if (status) job.status = status;
  if (resume) job.resume = resume;
  if (coverLetter) job.coverLetter = coverLetter;
  if (dateApplied) job.dateApplied = dateApplied;
  try {
    let jobId = await Job.findById(req.params.id);

    if (!jobId) return res.status(404).json({ msg: "Job not found" });

    jobId = await Job.findByIdAndUpdate(req.params.id, { $set: job }, { new: true });

    res.json(jobId);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};


const deleteJob = async (req, res) => {
  // swagger.tag=['Hello Contacts]
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ msg: "Job not found..."});

    res.json({ msg: 'Job Deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
    getJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob
};