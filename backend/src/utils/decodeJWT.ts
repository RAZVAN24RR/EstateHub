const jwt = require("jsonwebtoken");
import { JWT_SECRET } from "../konst";

const secretKey = JWT_SECRET;

export const decodeAndVerifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
