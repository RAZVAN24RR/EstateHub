import Favorit, { FavoritInput, FavoritOutput } from "../../db/models/Favorit";
import * as favoriteDal from "../../db/dal/favorit";

const create = async (payload: FavoritInput): Promise<FavoritOutput> => {
  const ok = await favoriteDal.create(payload);
  return ok;
};

const deleteById = async (id: string): Promise<boolean> => {
  const ok = await favoriteDal.deleteById(Number(id));
  return ok;
};

const favoriteService = {
  create,
  deleteById,
};

export default favoriteService;
