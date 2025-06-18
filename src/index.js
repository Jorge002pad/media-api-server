const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
//agregar cors
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use(require('./routes/convertMarkdown'));
app.use(require('./routes/convertDocx'));
app.use(require('./routes/convertHtml'));
app.use(require('./routes/compressImage'));
app.use(require('./routes/resizeImage'));
app.use(require('./routes/convertImageFormat'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// This code sets up an Express server that listens on a specified port and serves static files from the 'public' directory.
// It also imports and uses various routes for converting file formats, compressing images, and resizing images.