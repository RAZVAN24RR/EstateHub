import { Op } from "sequelize";
import User from "../models/User";
import { UserInput, UserOutput } from "../models/User";
import { GetAllUsersFilters } from "./types";

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const user = await User.create(payload);
  return user;
};

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id);

  if (!user) {
    // @todo throw custom error
    throw new Error("not found");
  }
  return user;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedUserCount = await User.destroy({
    where: { id },
  });
  return !!deletedUserCount;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const user: User | null = await User.findOne({ where: { email } });
  if (!user) throw new Error("not found");
  return user;
};
