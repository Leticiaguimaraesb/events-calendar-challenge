import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function seedUsers(prisma) {
  const users = [
    { name: "João Silva", email: "joao.silva@example.com", password: "senha1" },
    {
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      password: "senha2",
    },
    {
      name: "Pedro Santos",
      email: "pedro.santos@example.com",
      password: "senha3",
    },
  ];

  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );

  await prisma.user.createMany({ data: hashedUsers });
}
