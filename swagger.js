require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === "production";

const doc = {
    info: {
        title: "JobApps Api",
        description: "Job Application Api"
    },
    host: process.env.BASE_URL || "localhost:3000",
    schemes: isProduction ? ["https"] : ["http"]
};

const outputFile = './swagger.json';
const endpointsFile = [
    './server.js',
    './routes/jobs.js',
    './routes/users.js'
  ];

swaggerAutogen(outputFile, endpointsFile, doc);