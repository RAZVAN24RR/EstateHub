import Ad from "./../models/Ad";
import { Op } from "sequelize";
import { AdInput, AdOutput } from "./../models/Ad";
import { getById } from "./user"; // Asigură-te că această funcție este definită corect

export default class AdDetail {
  public name!: string;
  public userId!: number;
  public m2!: number;
  public address!: string;
  public nameProp!: string;
  public image!: string;
  public description!: string;
  public price!: string;
}

export const create = async (payload: AdInput): Promise<AdOutput> => {
  const ad = await Ad.create(payload);
  return ad;
};

export const getAdById = async (id: string): Promise<AdDetail> => {
  try {
    const ad = await Ad.findByPk(Number(id));
    if (!ad) {
      throw new Error("eroare nu gaseste ad");
    }

    const user = await getById(ad.userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      name: ad.name,
      image: ad.image,
      m2: ad.m2,
      nameProp: user.name, // Asum că `user.name` este corect
      address: ad.address,
      userId: ad.userId,
      description: ad.description,
      price: ad.price,
    };
  } catch (err) {
    console.log(err);
    throw err; // Arunca eroarea pentru a putea fi gestionată de apelant
  }
};

export const getAdsByName = async (name: string): Promise<AdOutput[]> => {
  const ads = await Ad.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`, // Folosește LIKE pentru a căuta toate anunțurile care conțin `name`
      },
    },
  });

  return ads;
};

export const deleteById = async (id: string): Promise<boolean> => {
  const deleted = await Ad.destroy({
    where: { id },
  });
  return !!deleted;
};

export const getAllAds = async (): Promise<Ad[]> => {
  try {
    const ads = await Ad.findAll();
    return ads;
  } catch (error) {
    throw error;
  }
};
