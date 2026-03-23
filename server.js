require('dotenv').config();
const express = require('express');
const connectDb = require('./database/db');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

connectDb();

app.use(cors());
app.use(express.json({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Job Application where you store and track your jobs applications." });
  });

  
app.use('/jobs', require('./routes/jobs'));
app.use('/users', require('./routes/users'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server started on " + port));