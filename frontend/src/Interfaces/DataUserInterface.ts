import FavoritDataOut from "../../../backend/src/db/dal/user";

export default interface DataUserInterface {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  image: string;
  adsFav: FavoritDataOut[];
}
