import { DataTypes, Model, Optional } from "sequelize";
import sequelizeDB from "../config";

interface FavoritAtributes {
  id: number;
  userId: number;
  adId: number;
  name: string;
  price: string;
  image: string;
}

export interface FavoritInput extends Optional<FavoritAtributes, "id"> {}
export interface FavoritOutput extends Required<FavoritAtributes> {}

class Favorit
  extends Model<FavoritAtributes, FavoritInput>
  implements FavoritAtributes
{
  public id!: number;
  public userId!: number;
  public adId!: number;
  name!: string;
  price!: string;
  image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Favorit.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    adId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeDB,
    paranoid: false,
  }
);

export default Favorit;
