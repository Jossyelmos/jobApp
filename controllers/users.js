// const User = require('../models/users');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const getUsers = async (req, res) => {
//   // swagger.tag=[Contacts]
//     try {
//         const users = await User.find();
//         res.json(users);
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
// };


// const getSingleUser = async (req, res) => {
//   // swagger.tag=['Hello Contacts]
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User does not exists" });
//     }

//     res.json(user);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     let user = await User.findOne({ email });

//     if (user) {
//         return res.status(400).json({ msg: 'User already exists' });
//     }

//     user = new User({
//       name,
//       email,
//       password
//     });

//     const salt = await bcrypt.genSalt(10);

//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     const payload = {
//         user: {
//             userId: user.id
//         }
//     }

//     jwt.sign(
//         payload,
//         process.env.JWT_SECRET,
//         {
//             expiresIn: 360000
//         },
//         (err, token) => {
//             if(err) throw err;
//             res.json({ message: "User registered successfully", token });
//         }
//     );

//     res.status(201).json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };


// const updateUser = async (req, res) => {
//   // swagger.tag=['Hello Contacts]
//   const {name, email, password, date} = req.body;

//   let user = {};

//   if (name) user.name = name;
//   if (email) user.email = email;
//   if (password) user.password = password;
//   if (date) user.date = date;
//   try {
//     let userId = await User.findById(req.params.id);

//     if (!userId) return res.status(404).json({ msg: "User does not exist" });

//     userId = await User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true });

//     res.json(userId);
//   } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//   }
// };


// const deleteUser = async (req, res) => {
//   // swagger.tag=['Hello Contacts]
//   try {
//     const deleted = await User.findByIdAndDelete(req.params.id);

//     if (!deleted) return res.status(404).json({ msg: "User not found..."});

//     res.json({ msg: 'User Deleted' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// };


// module.exports = {
//     getUsers,
//     getSingleUser,
//     createUser,
//     updateUser,
//     deleteUser
// };


const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create JWT payload
    const payload = { userId: user.id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    // Return token + user info
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// GET all users – Admin only (optional)
const getUsers = async (req, res) => {
  try {
    // Only show current user info
    const user = await User.find().select('-password');
    console.log(req.user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single user – only self
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE user – only self
const updateUser = async (req, res) => {
  const { name, email, password, date } = req.body;
  const updates = {};

  if (name) updates.name = name;
  if (email) updates.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(password, salt);
  }
  if (date) updates.date = date;

  try {
    const user = await User.findByIdAndUpdate(req.user.userId, { $set: updates }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// DELETE user – only self
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  registerUser,
  getUsers,
  getCurrentUser,
  updateUser,
  deleteUser,
};