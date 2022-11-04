import { sign } from 'jsonwebtoken';
require('dotenv').config();

const jwtConfig = {
    expiresIn = '100d',
    algorithm: 'HS256',
};

const generateJwt = (email) => {
    const token = sign({data: {email}}, process.env.JWT_SECRET, jwtConfig)

    return token
};

module.exports = {
    generateJwt
};