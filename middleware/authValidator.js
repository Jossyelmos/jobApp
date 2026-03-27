const Validator = require('validatorjs');

const validateAuth = (req, res, next) => {
  const data = req.body;

  const rules = {
    email: 'required|email',
    password: 'required|string|min:6'
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

module.exports = validateAuth;