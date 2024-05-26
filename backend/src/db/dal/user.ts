import { Op } from "sequelize";
import User from "../models/User";
import { UserInput, UserOutput } from "../models/User";
import { GetAllUsersFilters } from "./types";
import Favorit, { FavoritOutput } from "../models/Favorit";
import dataFormat from "../../utils/dataFormat";

export class FavoritDataOut {
  id!: number;
  adId!: number;
  userId!: number;
  name!: string;
  price!: string;
  image!: string;
}

export default class UserDataOut {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public isAdmin!: boolean; // Make isAdmin non-optional
  public image!: string;
  public adsFav!: FavoritDataOut[];
}

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const user = await User.create(payload);
  return user;
};

export const getById = async (id: number): Promise<UserDataOut> => {
  const user = await User.findByPk(id);

  if (!user) {
    // @todo throw custom error
    throw new Error("user not found");
  }

  let adsFavData: Favorit[] = await Favorit.findAll({
    where: {
      userId: user.id,
    },
  });

  const adsFavDataValues = adsFavData.map((item) => item.dataValues);

  if (!adsFavData) {
    // @todo throw custom error
    throw new Error("data not found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isAdmin: user.isAdmin,
    image: user.image,
    adsFav: adsFavDataValues,
  };
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
