const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = './images';
const CATEGORIES = fs.readdirSync(IMAGES_DIR)
  .filter(f => fs.statSync(path.join(IMAGES_DIR, f)).isDirectory());

(async () => {
  for (const category of CATEGORIES) {
    const categoryDir = path.join(IMAGES_DIR, category);
    const thumbDir = path.join(categoryDir, 'thumbs');
    const fullDir = path.join(categoryDir, 'full');

    fs.mkdirSync(thumbDir, { recursive: true });
    fs.mkdirSync(fullDir, { recursive: true });

    const files = fs.readdirSync(categoryDir)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

    for (const file of files) {
      const input = path.join(categoryDir, file);
      const name = path.parse(file).name;

      await sharp(input)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(path.join(thumbDir, `${name}.webp`));

      await sharp(input)
        .resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 88 })
        .toFile(path.join(fullDir, `${name}.webp`));

      console.log(`✓ ${category}/${file}`);
    }
  }

  console.log('All done!');
})();