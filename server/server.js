const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/static',
  express.static(path.resolve(__dirname, './../client/public'))
);

app.post('/upload', (req, res) => {});

app.listen(PORT, console.log(`Listening on PORT: ${PORT}...`));

module.exports = app;
