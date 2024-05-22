import Ad from "./../models/Ad";
import { AdInput, AdOutput } from "./../models/Ad";

export const create = async (payload: AdInput): Promise<AdOutput> => {
  const ad = await Ad.create(payload);
  return ad;
};

export const getAdById = async (id: number): Promise<AdOutput> => {
  const ad = await Ad.findByPk(id);
  if (!ad) {
    throw new Error("not found");
  }
  return ad;
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
