const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
    expiresIn:'60d',
    algorithm: 'HS256',
};

const generateJwt = (email) => {
    const token = jwt.sign({data: {email}}, process.env.JWT_SECRET, jwtConfig)

    return token
};

module.exports = {
    generateJwt
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiam9hb0Bqb2FvLmNvbSJ9LCJpYXQiOjE2Njc2NTkzOTUsImV4cCI6MTY3Mjg0MzM5NX0.JHMkZhoKvwrk2s83RXIn-QFMD-W9Ow00A63RENRhkr8