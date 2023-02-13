import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Report extends Model {}
Report.init(
  {
    reporter: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.INTEGER },
    message: { type: DataTypes.STRING },
    pet_id: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "report" }
);
