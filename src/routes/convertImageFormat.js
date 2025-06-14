const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'public/' });

router.post('/convert-image', upload.single('image'), (req, res) => {
  const input = req.file.path;
  const output = `${input}-converted.jpg`;

  exec(`convert ${input} ${output}`, (err) => {
    if (err) return res.status(500).send('Error al convertir formato.');

    res.download(output, 'convertida.jpg', () => {
      fs.unlinkSync(input);
      fs.unlinkSync(output);
    });
  });
});

module.exports = router;
// This code defines an Express route for converting image formats using the `convert` command from ImageMagick.
// It uses `multer` for file uploads, and `exec` to run the conversion command.