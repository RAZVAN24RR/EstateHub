import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../../konst";
const jwt = require("jsonwebtoken");
import { StatusCodes } from "http-status-codes";

interface DecodedJwt {
  userId: string;
}

const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).send();
      return;
    }

    const decodedJwt = jwt.verify(token, JWT_SECRET) as DecodedJwt;
    if (!decodedJwt) {
      res.status(StatusCodes.UNAUTHORIZED).send();
      return;
    }

    const { userId } = decodedJwt;
    if (userId) {
      res.locals.userId = userId;
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).send();
    }
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export default isAuth;
