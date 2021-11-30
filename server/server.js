const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

const PORT = 3000;
const app = express();

app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/static',
  express.static(path.resolve(__dirname, './../client/public'))
);

app.post('/upload', (req, res) => {
  //   console.log(req.files);
  //   console.log(req);
  if (req.files === null) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/../client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({
      fileName: file.name,
      filePath: `http://localhost:${PORT}/static/uploads/${file.name}`,
    });
  });
  //   return res.sendStatus(200);
});

app.listen(PORT, console.log(`Listening on PORT: ${PORT}...`));

module.exports = app;
