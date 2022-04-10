import { PrismaClient } from '@prisma/client';
import { meals } from '../data/meals';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'patryk_2@test.com',
      role: 'ADMIN',
    }
  });

  await prisma.meal.createMany({
    data: meals,
  });
}

main()
  .catch((e) => {
    console.log('ERROR:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
