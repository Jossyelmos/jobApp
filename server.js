require('dotenv').config();
const express = require('express');
const connectDb = require('./database/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');


const app = express();

connectDb();

app.set('trust proxy', 1);
app.use(session({
    secret: 'oauth-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

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
app.use('/auth', require('./routes/auth'));


const swaggerRouter = require('./routes/swagger');

app.use('/api-docs', swaggerRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server started on " + port));