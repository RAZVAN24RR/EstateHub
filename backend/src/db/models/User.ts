import { DataTypes, Model, Optional } from "sequelize";
import sequelizeDB from "../config";

interface UserAtributes {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput extends Optional<UserAtributes, "id"> {}
export interface UserOutput extends Required<UserAtributes> {}

class User extends Model<UserAtributes, UserInput> implements UserAtributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeDB,
    paranoid: true,
  }
);

export default User;
