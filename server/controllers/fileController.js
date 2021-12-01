const fileController = {};
const File = require('./../models/fileModel');
const PORT = 3000;

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
            File.create({
              fileName: file.name,
              filePath: `uploads/${file.name}`,
              dateUploaded: Date(),
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
module.exports = fileController;
