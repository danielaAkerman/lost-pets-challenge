import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Pet extends Model {}
Pet.init(
  {
    name: { type: DataTypes.STRING },
    ubication: { type: DataTypes.STRING },
    last_location_lat: { type: DataTypes.FLOAT },
    last_location_lng: { type: DataTypes.FLOAT },
    status: { type: DataTypes.STRING },
    picture_url: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "pet" }
);
