const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../models/fileModel.js')
const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description,taskId } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        taskId,
        file_path: path,
        file_mimetype: mimetype,
        
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

router.get('/:id', async (req, res) => {
  try {
    const files = await File.find({taskId: req.params.id});
    
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '../..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

router.delete('/delete/:id', async(req, res) => {
  try{
    const file = await File.findById(req.params.id)
    await file.remove()
    res.json({message: 'File removed'})

  }catch(error){
  throw new Error('File not found')

}})

module.exports = router;
