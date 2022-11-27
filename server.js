const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const Api = require('./task1/src/api');
dotenv.config();
const verifyRequestSignature = require('./task1/src/middleware/auth-middleware');

const app = express().use(bodyParser.json());

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 8090;
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {
    console.log('Database Connected to chat bot App');
  })
  .catch((err) => console.log('connection error occurred:', err));
  app.use('/', verifyRequestSignature, Api);

  const server = app.listen(PORT, (req) => {
    console.log('Server is running on port', server.address().port);
  });
    
