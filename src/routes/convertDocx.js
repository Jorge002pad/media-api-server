const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'public/' });

router.post('/docx-to-pdf', upload.single('file'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = path.join('public', `${req.file.filename}.pdf`);

  exec(`pandoc ${inputPath} -o ${outputPath}`, (error) => {
    if (error) return res.status(500).send('Error al convertir documento.');

    res.download(outputPath, 'documento.pdf', () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

module.exports = router;

// This code defines an Express route for converting DOCX files to PDF using Pandoc.
// It uses multer for file uploads and the exec function to run the Pandoc command.