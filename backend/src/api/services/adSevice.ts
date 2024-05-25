import Ad, { AdInput, AdOutput } from "../../db/models/Ad";
import * as adDal from "../../db/dal/ad";
import { decodeAndVerifyJWT } from "../../utils/decodeJWT";
import { calcPrice } from "../../../calcPrice";
import AdDetail from "../../db/dal/ad";
import truncateToThreeDecimals from "../../utils/truncPrice";

const create = async (payload: AdInput): Promise<AdOutput> => {
  payload.userId = await decodeAndVerifyJWT(String(payload.userId));

  const price = await calcPrice(
    Number(payload.m2),
    payload.description,
    Number(payload.rooms),
    Number(payload.floor)
  );

  payload.price = String(truncateToThreeDecimals(price));

  const ok = await adDal.create(payload);
  return ok;
};

const getAllAds = (): Promise<AdOutput[]> => {
  const ok = adDal.getAllAds();
  return ok;
};

const deleteAdByid = (id: string): Promise<boolean> => {
  const ok = adDal.deleteById(id);
  return ok;
};

const getAdByid = (id: string): Promise<AdDetail> => {
  const ok = adDal.getAdById(id);
  return ok;
};

const getAdsByName = (name: string): Promise<AdOutput[]> => {
  const ok = adDal.getAdsByName(name);
  return ok;
};

const adService = {
  create,
  getAllAds,
  deleteAdByid,
  getAdByid,
  getAdsByName,
};

export default adService;
