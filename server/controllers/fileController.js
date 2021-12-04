const fileController = {};
const File = require('./../models/fileModel');
const PORT = 3000;
const fs = require('fs');

fileController.getFiles = (req, res, next) => {
  File.find({})
    .then((data) => {
      res.locals.fileInfo = data;
      return next();
    })
    .catch((err) => {
      if (err)
        return next({
          log: `Error with fileController.getFiles Error: ${err}`,
          message: {
            err: 'fileController.getFiles ERROR: Check server logs for details',
          },
        });
    });
};

fileController.uploadFile = (req, res, next) => {
  if (req.files === null) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  //   console.log(req.files);
  const { file } = req.files;
  File.findOne({ fileName: file.name })
    .then((data) => {
      if (data === null) {
        const filePath = `${__dirname}/../../client/public/uploads/${file.name}`;
        file
          .mv(filePath)
          .then(() => {
            const today = new Date().toString();
            File.create({
              fileName: file.name,
              filePath: `uploads/${file.name}`,
              dateUploaded: today,
            });
            res.locals.fileData = {
              fileName: file.name,
              filePath: `http://localhost:${PORT}/static/uploads/${file.name}`,
            };
            return next();
          })
          .catch((err) => {
            if (err) {
              return next({
                log: `Error with fileController.uploadFile file path Error: ${err}`,
                message: {
                  err: 'fileController.uploadFile ERROR: Check server logs for details',
                },
              });
            }
          });
      } else {
        res.locals.fileData = {
          fileName: data.fileName,
          filePath: `http://localhost:${PORT}/static/${data.filePath}`,
        };
        return next();
      }
    })
    .catch((err) => {
      if (err) {
        return next({
          log: `Error with fileController.uploadFile findOne Error: ${err}`,
          message: {
            err: 'fileController.uploadFile ERROR: Check server logs for details',
          },
        });
      }
    });
};

fileController.deleteFile = (req, res, next) => {
  // console.log(req.body);
  const { fileName } = req.body;
  File.deleteOne({ fileName })
    .then((success) => {
      if (success.deletedCount === 1) res.locals.success = true;
      else res.locals.success = false;
      fs.unlink(
        `${__dirname}/../../client/public/uploads/${fileName}`,
        (err) => {
          if (err)
            return next({
              log: `Error with fileController.deleteFile unlink method Error: ${err}`,
              message: {
                err: 'fileController.deleteFile ERROR: Check server logs for details',
              },
            });
        }
      );

      return next();
    })
    .catch((err) => {
      if (err)
        return next({
          log: `Error with fileController.deleteFile Error: ${err}`,
          message: {
            err: 'fileController.deleteFile ERROR: Check server logs for details',
          },
        });
    });
};
module.exports = fileController;
