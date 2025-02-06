import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
export const baseurl = async (req: Request, res: Response) => {
  const BASE62_ALPHABET =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  function stringToNumber(str: string) {
    let num = BigInt(0);
    for (let i = 0; i < str.length; i++) {
      num = num * BigInt(256) + BigInt(str.charCodeAt(i));
    }
    return num;
  }
  const OUR_URL = "http://localhost:3000";
  function encodeBase62String(str: string) {
    let num = stringToNumber(str);
    let encoded = "";
    while (num > 0) {
      const index = Number(num % BigInt(62));
      encoded = BASE62_ALPHABET[index] + encoded;
      num = num / BigInt(62);
    }
    return encoded;
  }
  function decodeBase62String(encoded: string) {
    let num = BigInt(0);
    for (let i = 0; i < encoded.length; i++) {
      num = num * BigInt(62) + BigInt(BASE62_ALPHABET.indexOf(encoded[i]));
    }

    let str = "";
    while (num > 0) {
      str = String.fromCharCode(Number(num % BigInt(256))) + str;
      num = num / BigInt(256);
    }
    return str;
  }

  try {
    const { baseURL } = req.body;
    const existingUrl = await prisma.url.findFirst({
      where: {
        baseURL,
      },
    });
    if (existingUrl) {
      res.json({
        message: `${OUR_URL}/${existingUrl.customURL}`,
      });
      return;
    }
    //@ts-ignore
    const userId = req.user.userId;
    const shortUrl = encodeBase62String(baseURL);
    const newUrl = await prisma.url.create({
      data: {
        baseURL,
        customURL: shortUrl,
        userId: userId,
      },
    });
    res.status(400).json({
      message: `${OUR_URL}/${newUrl.customURL}`,
    });
  } catch (error) {
    console.error(error);
    console.log("error in baseurl route");
    res.json({
      message: "Internal server error",
    });
  }
};

export const customurl = () => {};
