import * as userDal from "../../db/dal/user";
import { GetAllUsersFilters } from "../../db/dal/types";
import User, { UserInput, UserOutput } from "../../db/models/User";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../../konst.js");

const create = (payload: UserInput): Promise<UserOutput> => {
  payload.password = bcrypt.hashSync(payload.password, 10);
  const ok = userDal.create(payload);
  return ok;
};

const getById = (id: number): Promise<UserOutput> => {
  const ok = userDal.getById(id);
  return ok;
};

const deleteById = (id: number): Promise<boolean> => {
  const ok = userDal.deleteById(id);
  return ok;
};

const getUserByEmail = async (email: string): Promise<User> => {
  const ok = userDal.getUserByEmail(email);
  return ok;
};

const userService = {
  create,
  getById,
  deleteById,
  getUserByEmail,
};

export default userService;
