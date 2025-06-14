const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'public/' });

router.post('/resize-image', upload.single('image'), (req, res) => {
  const input = req.file.path;
  const output = `${input}-resized.jpg`;

  exec(`convert ${input} -resize 800x600 ${output}`, (err) => {
    if (err) return res.status(500).send('Error al redimensionar imagen.');

    res.download(output, 'redimensionada.jpg', () => {
      fs.unlinkSync(input);
      fs.unlinkSync(output);
    });
  });
});

module.exports = router;
// This code defines an Express route for resizing images using the `convert` command from ImageMagick.
// It uses `multer` for file uploads, and `exec` to run the resizing command.