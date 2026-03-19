const Validator = require('validatorjs');

const validateJob = (req, res, next) => {
  const data = req.body;

  if (req.body.jobLink && !req.body.jobLink.startsWith('http')) {
    req.body.jobLink = 'https://' + req.body.jobLink;
  }

  const rules = {
    jobTitle: 'required|string|min:2|max:50',
    company: 'required|string|min:2|max:50',
    jobLink: 'required|url',
    status: 'in:applied,interview,rejected,offer',
    resume: 'required|string',
    coverLetter: 'string',
    dateApplied: 'date'
  };

  const validation = new Validator(data, rules);

  if (validation.fails()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: validation.errors.all()
    });
  }

  next(); // move to controller if validation passes
};

module.exports = validateJob;