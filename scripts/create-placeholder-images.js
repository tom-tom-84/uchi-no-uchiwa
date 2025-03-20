const fs = require('fs');
const { createCanvas } = require('canvas');

const images = [
  { name: 'japanese-uchiwa', text: 'Japanese Uchiwa' },
  { name: 'artist-uchiwa', text: 'Artist Uchiwa' },
  { name: 'simple-uchiwa', text: 'Simple Uchiwa' }
];

const width = 800;
const height = 600;

images.forEach(({ name, text }) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 白い背景
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);

  // テキスト
  ctx.fillStyle = 'black';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // 画像を保存
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(`public/products/${name}.jpg`, buffer);
}); 