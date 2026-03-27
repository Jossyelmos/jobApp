const Validator = require('validatorjs');

const validateUser = (req, res, next) => {
  const data = req.body;

  const rules = {
    name: 'required|string|min:5|max:50',
    email: 'required|email',
    password: 'required|string|min:6',
    date: 'date'
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

module.exports = validateUser;