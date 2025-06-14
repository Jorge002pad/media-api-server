# Imagen base oficial con Node.js
FROM node:18

# Instalar herramientas necesarias
RUN apt-get update && apt-get install -y \
  pandoc \
  texlive \
  texlive-latex-extra \
  imagemagick \
  ffmpeg \
  && apt-get clean

# Crear carpeta de trabajo
WORKDIR /app

# Copiar y preparar dependencias de Node
COPY package.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Crear carpeta pública para archivos
RUN mkdir -p /app/public

# Exponer el puerto 3000
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["node", "src/index.js"]
