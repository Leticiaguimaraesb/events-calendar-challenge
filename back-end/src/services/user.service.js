import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userSelectFields = {
  id: true,
  name: true,
  email: true,
  password: false,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  userEvents: true,
};

const findManyUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: { deletedAt: null },
      select: userSelectFields,
    });
    return users;
  } catch (error) {
    throw error;
  }
};

const findUserById = async (id) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id, deletedAt: null },
      select: userSelectFields,
    });
    return user;
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("User not found.", { cause: "not_found" });
    } else throw error;
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await prisma.user.update({
      where: { id, deletedAt: null },
      data,
      select: userSelectFields,
    });
    return user;
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Email already in use.", { cause: "conflict" });
    } else if (error.code === "P2025") {
      throw new Error("User not found.", { cause: "not_found" });
    } else throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await prisma.user.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("User not found.", { cause: "not_found" });
    } else throw error;
  }
};

export { findManyUsers, findUserById, updateUser, deleteUser };
