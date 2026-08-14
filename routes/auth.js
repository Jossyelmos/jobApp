const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authController = require('../controllers/auth');
const userController = require('../controllers/users');
const authValidator = require('../middleware/authValidator');
const auth = require('../middleware/auth');

// =======================
// JWT AUTH ROUTES
// =======================

// Register user
router.post('/register', authValidator, userController.registerUser);

// Login user
router.post('/login', authValidator, authController.loginUser);

// Get current user (Protected)
router.get('/me', auth, authController.getUser);

// Logout (JWT - client-side)
router.post('/logout', auth, (req, res) => {
    res.json({
        message: 'User logged out successfully. Please remove token from client.'
    });
});


// =======================
// OAUTH (GITHUB)
// =======================

// Redirect to GitHub
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub callback
// router.get('/github/callback',
//     passport.authenticate('github', { failureRedirect: '/' }),
//     (req, res) => {
//         // Generate JWT for OAuth user
//         const token = jwt.sign(
//             { userId: req.user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '1d' }
//         );

//         // Send token and user info back
//         res.redirect(
//             `http://localhost:3000?token=${token}`
//         );
//     }
// );


router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
  
      console.log("CALLBACK HIT");
      console.log("USER:", req.user);
  
      const token = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      console.log("TOKEN GENERATED:", token);
  
      return res.redirect(
        `http://localhost:3000/?token=${token}`
      );
    }
  );
module.exports = router;