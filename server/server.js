const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

const PORT = 3000;
const app = express();

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadRouter = require('./routes/upload.js');

app.use(
  '/static',
  express.static(path.resolve(__dirname, './../client/public'))
);

app.use('/upload', uploadRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred ' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, console.log(`Listening on PORT: ${PORT}...`));

module.exports = app;
