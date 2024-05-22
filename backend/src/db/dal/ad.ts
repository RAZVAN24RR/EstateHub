import Ad from "./../models/Ad";
import { Op } from "sequelize";
import { AdInput, AdOutput } from "./../models/Ad";

export const create = async (payload: AdInput): Promise<AdOutput> => {
  const ad = await Ad.create(payload);
  return ad;
};

export const getAdById = async (id: string): Promise<AdOutput> => {
  const ad = await Ad.findByPk(id);
  if (!ad) {
    throw new Error("not found");
  }
  return ad;
};

export const getAdsByName = async (name: string): Promise<AdOutput[]> => {
  const ads = await Ad.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`, // Folosește LIKE pentru a căuta toate anunțurile care conțin `name`
      },
    },
  });

  if (!ads || ads.length === 0) {
    throw new Error("No ads found");
  }

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
