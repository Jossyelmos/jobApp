const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "JobApps Api",
        description: "Job Application Api"
    },
    host: "localhost:3000",
    schemes: ["http", "https"]
};

const outputFile = './swagger.json';
const endpointsFile = ['./server.js'];

swaggerAutogen(outputFile, endpointsFile, doc);