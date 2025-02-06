import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
      res.status(201).json({
        message: "user not verified",
      });
      return;
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    console.log(decoded);
    if (!decoded) {
      res.status(401).json({
        message: "unauthorized-Invalid token",
      });
      return;
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
    return;
  }
};
