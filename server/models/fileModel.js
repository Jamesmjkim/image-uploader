const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost/image-uploader';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  dateUploaded: { type: Date, required: true },
  fileSize: Number,
});

module.exports = mongoose.model('file', fileSchema);
