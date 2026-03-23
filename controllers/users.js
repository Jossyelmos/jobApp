const User = require('../models/users');

const getUsers = async (req, res) => {
  // swagger.tag=[Contacts]
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};


const getSingleUser = async (req, res) => {
  // swagger.tag=['Hello Contacts]
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User does not exists" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createUser = async (req, res) => {
  try {
    const { name, email, password, date } = req.body;

    const user = {
      name,
      email,
      password,
      date
    };

    const userModel = new User(user);
    await userModel.save();

    res.status(201).json(userModel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const updateUser = async (req, res) => {
  // swagger.tag=['Hello Contacts]
  const {name, email, password, date} = req.body;

  let user = {};

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.password = password;
  if (date) user.date = date;
  try {
    let userId = await User.findById(req.params.id);

    if (!userId) return res.status(404).json({ msg: "User does not exist" });

    userId = await User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true });

    res.json(userId);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};


const deleteUser = async (req, res) => {
  // swagger.tag=['Hello Contacts]
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ msg: "User not found..."});

    res.json({ msg: 'User Deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};