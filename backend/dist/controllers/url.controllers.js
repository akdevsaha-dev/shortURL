var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const baseurl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BASE62_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    function stringToNumber(str) {
        let num = BigInt(0);
        for (let i = 0; i < str.length; i++) {
            num = num * BigInt(256) + BigInt(str.charCodeAt(i));
        }
        return num;
    }
    const OUR_URL = "http://localhost:3000";
    function encodeBase62String(str) {
        let num = stringToNumber(str);
        let encoded = "";
        while (num > 0) {
            const index = Number(num % BigInt(62));
            encoded = BASE62_ALPHABET[index] + encoded;
            num = num / BigInt(62);
        }
        return encoded;
    }
    function decodeBase62String(encoded) {
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
        const existingUrl = yield prisma.url.findFirst({
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
        const newUrl = yield prisma.url.create({
            data: {
                baseURL,
                customURL: shortUrl,
                userId: userId,
            },
        });
        res.status(400).json({
            message: `${OUR_URL}/${newUrl.customURL}`,
        });
    }
    catch (error) {
        console.error(error);
        console.log("error in baseurl route");
        res.json({
            message: "Internal server error",
        });
    }
});
export const customurl = () => { };
