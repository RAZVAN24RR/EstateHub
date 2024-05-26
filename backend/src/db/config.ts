import { Sequelize } from "sequelize-typescript";
const sequelizeDB = new Sequelize({
  database: "estateHub",
  username: "razvan",
  password: "razvan",
  host: "localhost",
  dialect: "mysql",
  models: ["/models"],
});

export default sequelizeDB;
