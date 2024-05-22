import User from "../db/models/User";
import Ad from "./models/Ad";

// const isDev = process.env.NODE_ENV === "development";
const isDev = true;
const dbInit = () => {
  User.sync({ alter: isDev });
  Ad.sync({ alter: isDev });
};
export default dbInit;
