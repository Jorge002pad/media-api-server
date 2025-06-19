const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'public/' });

router.post('/compress-image', upload.single('image'), (req, res) => {
  
  //const input = req.file.path;
  const input = `${req.file.path}.jpg`;
  const output = `compress-${input}`;
  console.log(`Comprimindo imagem: ${input} para ${output}`);

  exec(`convert ${input} -quality 50 ${output}`, (err) => {
    if (err) return res.status(500).send('Error al comprimir imagen.');

    res.download(output, 'comprimida.jpg', () => {
      fs.unlinkSync(input);
      fs.unlinkSync(output);
    });
  });
});

module.exports = router;
// This code defines an Express route for compressing images using the `convert` command from ImageMagick.
// It uses `multer` for file uploads, and `exec` to run the compression command.