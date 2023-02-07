import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class User extends Model {}
User.init(
  {
    fullname: { type: DataTypes.STRING },
    bio: { type: DataTypes.STRING },
    pictureURL: { type: DataTypes.STRING }
  },
  { sequelize, modelName: "user" }
);
