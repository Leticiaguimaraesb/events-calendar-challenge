import { PrismaClient } from "@prisma/client";
import { seedEvents } from "./events.js";
import { seedUsers } from "./users.js";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$transaction(async (transaction) => {
      await seedUsers(transaction);
      await seedEvents(transaction);
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
