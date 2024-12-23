import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (data) => {
  const { password, passwordConfirmation, ...userData } = data;
  if (password !== passwordConfirmation) {
    throw new Error("Passwords do not match.", { cause: "conflict" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  try {
    let user;
    if (existingUser && existingUser.deletedAt) {
      user = await prisma.user.update({
        where: { email: userData.email },
        data: {
          ...userData,
          password: hashedPassword,
          deletedAt: null,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });
    return { access_token: token };
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Email already in use.", { cause: "conflict" });
    }
    throw error;
  }
};

const login = async (data) => {
  const { email, password } = data;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email, deletedAt: null },
    });
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      return { access_token: token };
    } else {
      throw new Error("Wrong password.", { cause: "bad_request" });
    }
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Email not found.", { cause: "not_found" });
    } else throw error;
  }
};

export { login, register };
