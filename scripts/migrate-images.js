const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'C:/PROYECTOS/SISTEMA_AP/public/Productos';
const TARGET_DIR = path.join(__dirname, '..', 'images');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

let count = 0;

function scanAndCopy(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      scanAndCopy(fullPath);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(item.name)) {
      const codigo = item.name.match(/^(\d+)/)?.[0];
      if (codigo) {
        const ext = path.extname(item.name).toLowerCase();
        const newName = `${codigo}${ext}`;
        const targetPath = path.join(TARGET_DIR, newName);

        if (!fs.existsSync(targetPath)) {
          fs.copyFileSync(fullPath, targetPath);
          console.log(`${item.name} -> ${newName}`);
          count++;
        }
      }
    }
  }
}

scanAndCopy(SOURCE_DIR);
console.log(`\nTotal: ${count} imagenes migradas`);
