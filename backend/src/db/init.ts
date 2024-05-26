import User from "../db/models/User";
import Ad from "./models/Ad";
import Favorit from "./models/Favorit";

// const isDev = process.env.NODE_ENV === "development";
const isDev = true;
const dbInit = () => {
  User.sync({ alter: isDev });
  Ad.sync({ alter: isDev });
  Favorit.sync({ alter: isDev });
};
export default dbInit;
