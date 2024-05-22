import Ad, { AdInput, AdOutput } from "../../db/models/Ad";
import * as adDal from "../../db/dal/ad";
import { decodeAndVerifyJWT } from "../../utils/decodeJWT";

const create = (payload: AdInput): Promise<AdOutput> => {
  payload.userId = decodeAndVerifyJWT(String(payload.userId));
  const ok = adDal.create(payload);
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

const getAdByid = (id: string): Promise<AdOutput> => {
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
