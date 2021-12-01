const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const File = require('./models/fileModel');

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
  if (req.files === null) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  //   console.log(req.files);
  const { file } = req.files;
  File.findOne({ fileName: file.name }).then((data) => {
    if (data === null) {
      const filePath = `${__dirname}/../client/public/uploads/${file.name}`;
      file.mv(filePath, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        File.create({
          fileName: file.name,
          filePath: `uploads/${file.name}`,
          dateUploaded: Date(),
        });
        res.status(200).json({
          fileName: file.name,
          filePath: `http://localhost:${PORT}/static/uploads/${file.name}`,
        });
      });
    } else {
      res.status(200).json({
        fileName: data.fileName,
        filePath: `http://localhost:${PORT}/static/${data.filePath}`,
      });
    }
  });
});

app.listen(PORT, console.log(`Listening on PORT: ${PORT}...`));

module.exports = app;
