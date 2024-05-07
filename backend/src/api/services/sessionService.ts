import * as userDal from "../../db/dal/user";
import { GetAllUsersFilters } from "../../db/dal/types";
import { UserInput, UserOutput } from "../../db/models/User";
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../../konst.js");
const { SALT } = require("../../konst.js");
import UserLogInInterface from "../../Interfaces/UserLogInInterface";
import userService from "./userService";

const createSession = async (email: string, password: string) => {
  try {
    const user = await userService.getUserByEmail(email);

    if (user) {
      const ok = bcrypt.compareSync(password, user.dataValues.password);
      if (ok) {
        const token = jwt.sign(
          {
            userId: user.dataValues.id,
          },
          JWT_SECRET
        );

        return token;
      } else return null;
    } else return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const SessionService = {
  createSession,
};
module.exports = SessionService;
