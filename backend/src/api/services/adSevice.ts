import Ad, { AdInput, AdOutput } from "../../db/models/Ad";
import * as adDal from "../../db/dal/ad";

const create = (payload: AdInput): Promise<AdOutput> => {
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

const adService = {
  create,
  getAllAds,
  deleteAdByid,
};

export default adService;
