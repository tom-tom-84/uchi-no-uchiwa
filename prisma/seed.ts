const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 管理者ユーザーの作成
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: '管理者',
      password: hashedPassword,
    },
  });

  console.log({ admin });

  // サンプル商品の作成
  const products = [
    {
      name: 'シンプルうちわ',
      description: 'シンプルで使いやすいうちわです。',
      price: 1500,
      stock: 100,
      image: '/products/simple-uchiwa.jpg',
    },
    {
      name: '和風うちわ',
      description: '伝統的な和柄のうちわです。',
      price: 2000,
      stock: 50,
      image: '/products/japanese-uchiwa.jpg',
    },
    {
      name: 'アーティストうちわ',
      description: 'アーティストがデザインしたうちわです。',
      price: 3000,
      stock: 30,
      image: '/products/artist-uchiwa.jpg',
    },
  ];

  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name },
    });

    if (existingProduct) {
      await prisma.product.update({
        where: { id: existingProduct.id },
        data: product,
      });
    } else {
      await prisma.product.create({
        data: product,
      });
    }
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 