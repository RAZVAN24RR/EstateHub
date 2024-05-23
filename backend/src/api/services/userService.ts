import * as userDal from "../../db/dal/user";
import { GetAllUsersFilters } from "../../db/dal/types";
import User, { UserInput, UserOutput } from "../../db/models/User";
import { SALT_ROUNDS } from "../../konst";
const bcrypt = require("bcrypt");

const create = (payload: UserInput): Promise<UserOutput> => {
  payload.password = bcrypt.hashSync(payload.password, 10);
  const ok = userDal.create(payload);
  return ok;
};

const createAdmin = (payload: UserInput): Promise<UserOutput> => {
  payload.password = bcrypt.hashSync(payload.password, 10);
  payload.isAdmin = true;
  const ok = userDal.create(payload);
  return ok;
};

const getById = async (id: number): Promise<UserOutput> => {
  const ok = await userDal.getById(id);
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
  createAdmin,
};

export default userService;
