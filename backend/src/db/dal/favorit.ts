import Favorit, { FavoritInput, FavoritOutput } from "../models/Favorit";
import { decodeAndVerifyJWT } from "../../utils/decodeJWT";

export const create = async (payload: FavoritInput): Promise<FavoritOutput> => {
  payload.adId = Number(payload.adId);
  payload.userId = await decodeAndVerifyJWT(String(payload.userId));
  const favorit = await Favorit.create(payload);
  return favorit;
};
export const deleteById = async (id: number): Promise<boolean> => {
  const ok = await Favorit.destroy({
    where: { id },
  });
  return !!ok;
};
