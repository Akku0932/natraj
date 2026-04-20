// Build-time script: Reads SQLite database and generates static JSON files
// These JSON files are served by the API routes on Vercel (where SQLite is unavailable)
import { PrismaClient } from '@prisma/client';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function generateStaticData() {
  console.log('📦 Generating static data from database...');
  
  const dataDir = join(process.cwd(), 'public', 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // Generate categories data
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  const formattedCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    productCount: cat._count.products,
    order: cat.order,
  }));

  writeFileSync(
    join(dataDir, 'categories.json'),
    JSON.stringify(formattedCategories, null, 2)
  );
  console.log(`  ✅ categories.json (${formattedCategories.length} categories)`);

  // Generate products data (with category included)
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { order: 'asc' },
  });

  writeFileSync(
    join(dataDir, 'products.json'),
    JSON.stringify(products, null, 2)
  );
  console.log(`  ✅ products.json (${products.length} products)`);

  await prisma.$disconnect();
  console.log('📦 Static data generation complete!');
}

generateStaticData().catch((e) => {
  console.error('Error generating static data:', e);
  process.exit(1);
});
