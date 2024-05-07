import User from "../db/models/User";

// const isDev = process.env.NODE_ENV === "development";
const isDev = true;
const dbInit = () => {
  User.sync({ alter: isDev });
};
export default dbInit;
