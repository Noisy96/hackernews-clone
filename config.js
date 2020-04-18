const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    databaseToken: process.env.DB_TOKEN,
    jwtToken: process.env.JWT_TOKEN
};