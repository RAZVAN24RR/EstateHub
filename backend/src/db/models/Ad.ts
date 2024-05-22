import { DataTypes, Model, Optional } from "sequelize";
import sequelizeDB from "../config";

interface AdAttributes {
  id: number;
  name: string;
  userId: number;
  m2: number;
  address: string;
  image: string; // Adăugăm câmpul `image`
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface AdInput extends Optional<AdAttributes, "id"> {}
export interface AdOutput extends Required<AdAttributes> {}

class Ad extends Model<AdAttributes, AdInput> implements AdAttributes {
  public id!: number;
  public name!: string;
  public userId!: number;
  public m2!: number;
  public address!: string;
  public image!: string; // Adăugăm câmpul `image`

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Ad.init(
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    m2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeDB,
    paranoid: true,
  }
);

export default Ad;
