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

  // カテゴリーの作成
  const categories = [
    { name: '伝統的', description: '日本の伝統的なデザインのうちわ' },
    { name: 'モダン', description: '現代的なデザインのうちわ' },
    { name: 'アート', description: 'アーティストによるデザインのうちわ' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // サンプル商品の作成
  const products = [
    {
      name: 'シンプルうちわ',
      description: '伝統的な日本の技術と現代的なデザインを組み合わせた、シンプルで美しいうちわです。',
      price: 1200,
      stock: 100,
      image: '/products/simple-uchiwa.webp',
      categoryName: '伝統的',
    },
    {
      name: '和風うちわ',
      description: '日本の伝統的な模様をあしらった、趣のある和風うちわです。',
      price: 1500,
      stock: 50,
      image: '/products/japanese-uchiwa.webp',
      categoryName: '伝統的',
    },
    {
      name: 'アーティストうちわ',
      description: '現代アーティストとのコラボレーションによる、アート作品のようなうちわです。',
      price: 2000,
      stock: 30,
      image: '/products/artist-uchiwa.webp',
      categoryName: 'アート',
    },
    {
      name: 'モダンうちわ',
      description: '現代的なデザインと機能性を追求した、スタイリッシュなうちわです。',
      price: 1800,
      stock: 40,
      image: '/products/modern-uchiwa.webp',
      categoryName: 'モダン',
    },
    {
      name: '季節の花うちわ',
      description: '四季折々の花々をモチーフにした、華やかなうちわです。',
      price: 1300,
      stock: 60,
      image: '/products/flower-uchiwa.webp',
      categoryName: '伝統的',
    },
    {
      name: 'ポップうちわ',
      description: 'カラフルでポップなデザインの、楽しい気分になれるうちわです。',
      price: 1600,
      stock: 45,
      image: '/products/pop-uchiwa.webp',
      categoryName: 'アート',
    },
  ];

  for (const product of products) {
    const category = await prisma.category.findUnique({
      where: { name: product.categoryName },
    });

    if (!category) {
      console.error(`Category ${product.categoryName} not found`);
      continue;
    }

    const { categoryName, ...productData } = product;
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name },
    });

    if (existingProduct) {
      await prisma.product.update({
        where: { id: existingProduct.id },
        data: {
          ...productData,
          categoryId: category.id,
        },
      });
    } else {
      await prisma.product.create({
        data: {
          ...productData,
          categoryId: category.id,
        },
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