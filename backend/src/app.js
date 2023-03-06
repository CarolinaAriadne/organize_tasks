const express = require('express')
const router = require('./routes/router');
const err = require('./middlewares/middlewareError');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);
app.use(err);

module.exports = app;
