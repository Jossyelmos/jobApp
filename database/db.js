const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;

const connectDb = async () => {
    await mongoose.connect(URL);
    console.log('MongoDB Connected...');
};

module.exports = connectDb;