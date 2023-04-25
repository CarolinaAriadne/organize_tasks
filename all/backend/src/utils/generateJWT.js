const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '60d',
  algorithm: 'HS256',
};

const generateJwt = email => {
  const token = jwt.sign(
    { data: { email } },
    process.env.JWT_SECRET,
    jwtConfig,
  );
  return token;
};
module.exports = {
  generateJwt,
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibGFpc0BsYWlzLmNvbSJ9LCJpYXQiOjE2Nzg5ODAzNTIsImV4cCI6MTcxMDA4NDM1Mn0.tSuKFrRUl6Ib5cv5TPuCSGfrRGkPix8zgUCHiX3RbfI

// token da Lais, lais@lais.com senha lala