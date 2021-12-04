const express = require('express');
const fileController = require('./../controllers/fileController');

const router = express.Router();

const { uploadFile, getFiles, deleteFile } = fileController;

router.get('/', getFiles, (req, res) => {
  return res.status(200).json(res.locals.fileInfo);
});

router.post('/', uploadFile, (req, res) => {
  return res.status(200).json(res.locals.fileData);
});

router.delete('/', deleteFile, (req, res) => {
  return res.status(200).json(res.locals.success);
});

module.exports = router;
