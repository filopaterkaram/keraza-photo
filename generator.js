const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'assets');

if (!fs.existsSync(baseDir)) {
  console.error('❌ المجلد assets غير موجود!');
  process.exit(1);
}

const shows = fs.readdirSync(baseDir).filter(folder =>
  fs.statSync(path.join(baseDir, folder)).isDirectory()
);

if (shows.length === 0) {
  console.error('⚠️ لا يوجد مجلدات عروض داخل assets.');
  process.exit(1);
}

let galleryHtml = '';

shows.forEach(show => {
  const folderPath = path.join(baseDir, show);
  const images = fs.readdirSync(folderPath).filter(file =>
    /\.(jpe?g|png|gif)$/i.test(file)
  );

  if (images.length === 0) return;

  galleryHtml += `<section id="${show.replace(/\s+/g, '-')}">\n`;
  galleryHtml += `  <h2>${show}</h2>\n`;
  galleryHtml += `  <div class="image-grid">\n`;

  images.forEach(img => {
    const imgSrc = `assets/${encodeURIComponent(show)}/${encodeURIComponent(img)}`;
    galleryHtml += `    <div class="img-card">\n`;
    galleryHtml += `      <img src="${imgSrc}" alt="${img}">\n`;
    galleryHtml += `      <a href="${imgSrc}" download>تحميل</a>\n`;
    galleryHtml += `    </div>\n`;
  });

  galleryHtml += `  </div>\n</section>\n\n`;
});

fs.writeFileSync('gallery.html', galleryHtml, 'utf-8');
console.log('✅ تم إنشاء ملف gallery.html بنجاح!');
