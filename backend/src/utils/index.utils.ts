import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = async (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY as string, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
