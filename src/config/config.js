const dotenv = require('dotenv');

dotenv.config();

const config = {
    oakAcademyEndpoint: process.env.OAK_ACADEMY_ENDPOINT,
    anotherServiceEndpoint: process.env.ANOTHER_SERVICE_ENDPOINT,
    yetAnotherServiceEndpoint: process.env.YET_ANOTHER_SERVICE_ENDPOINT,
    oakAPIKey: process.env.OAK_API_KEY,
};

module.exports = config;