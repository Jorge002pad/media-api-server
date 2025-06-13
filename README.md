# Media API Server (Docker + Node.js)

Servidor API para procesar archivos Markdown, imágenes, audio y video usando herramientas como Pandoc, ImageMagick y ffmpeg.

## Instrucciones

```bash
# Construir imagen Docker
docker build -t media-api-server .

# Correr el contenedor
docker run -p 3000:3000 -v $(pwd)/public:/app/public media-api-server

