const express = require('express');
const router = express.Router();
// const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const { body, validationResult } = require('express-validator');

const User = require('../models/users');

// @routes    GET api/auth
// @desc      Get logged in user
// @access    Private

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');

        res.json({message: "Access granted", user: user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @routes    POST api/auth
// @desc      Auth user & Get token
// @access    Public

const loginUser = async (req, res) => {
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const payload = {userId: user.id}

            jwt.sign(
                payload, 
                process.env.JWT_SECRET, 
                { 
                    expiresIn: 360000 
                }, 
                (err, token) => {
                    if(err) throw err;
                    res.json({ 
                        message: "Login Successful",
                        token
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
};

module.exports = {
    getUser,
    loginUser
};