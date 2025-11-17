const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');
const manifestPath = path.join(__dirname, '..', 'manifest.json');

const manifest = {
  version: Date.now(),
  lastUpdated: new Date().toISOString(),
  cdnBase: 'https://cdn.jsdelivr.net/gh/TU_USUARIO/productos-imagenes@main/images', // CAMBIAR TU_USUARIO
  productos: {}
};

const files = fs.readdirSync(imagesDir);

for (const file of files) {
  if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
    const codigo = file.match(/^(\d+)/)?.[1];
    if (codigo) {
      manifest.productos[codigo] = {
        archivo: file
      };
    }
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Manifest generado: ${Object.keys(manifest.productos).length} productos`);
