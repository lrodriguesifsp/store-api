const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { Faker, pt_BR } = require("@faker-js/faker");
const faker = new Faker({ locale: [pt_BR] });
faker.seed(123);

async function main() {
  await prisma.product.deleteMany();

  const products = Array.from({ length: 10 }, () => ({
    name: faker.commerce.productName(),
    description: faker.helpers.maybe(
      () => faker.lorem.words({ min: 1, max: 10 }),
      { probability: 0.5 }
    ),
    price: parseFloat(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
    stock: faker.number.int({ min: 0, max: 10 }),
    image: faker.helpers.maybe(
      () => faker.image.urlPicsumPhotos({ width: 500, height: 500 }),
      { probability: 0.5 }
    ),
    createdAt: faker.date.past({ years: 3 }),
    updatedAt: faker.date.recent({ days: 10 }),
  }));

  await prisma.product.createMany({
    data: products,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
