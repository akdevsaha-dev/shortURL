import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/index.utils.js";
const prisma = new PrismaClient();
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Plese enter username and password",
      });
      return;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      if (user) {
        generateToken(user.id, res);
        res.status(201).json({
          id: user.id,
          email: user.email,
        });
        return;
      }
    } else {
      res.json({
        message: "User already exists!",
      });
      return;
    }
  } catch (error) {
    console.error(error);
    console.log("internal server error");
  }
};
