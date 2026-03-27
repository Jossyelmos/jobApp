const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/users');
const jwt = require('jsonwebtoken');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Get email from profile or fallback
        const email = profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : `${profile.username}@github.com`;

        // Check if user exists
        let user = await User.findOne({ email });

        // Create new user if not exists
        if (!user) {
            user = await User.create({
                name: profile.username || profile.displayName,
                email: email,
                password: 'oauth_user_no_password' // placeholder to satisfy schema
            });
        }

        return done(null, user);
    } catch (err) {
        console.error('OAuth Error:', err);
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;