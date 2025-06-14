// Similar a los anteriores, solo cambia la extensión
const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'public/' });

router.post('/html-to-pdf', upload.single('file'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = path.join('public', `${req.file.filename}.pdf`);

  exec(`pandoc ${inputPath} -o ${outputPath}`, (error) => {
    if (error) return res.status(500).send('Error al convertir HTML.');

    res.download(outputPath, 'pagina.pdf', () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

module.exports = router;

// This code defines an Express route for converting HTML files to PDF using Pandoc.
// It uses multer for file uploads and the exec function to run the Pandoc command.