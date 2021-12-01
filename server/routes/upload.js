const express = require('express');
const fileController = require('./../controllers/fileController');

const router = express.Router();

router.post('/', fileController.uploadFile, (req, res) => {
  return res.status(200).json(res.locals.fileData);
});

module.exports = router;
