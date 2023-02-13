import { User } from "./user";
import { Pet } from "./pet";
import { Auth } from "./auth";
import { Report } from "./report";

User.hasMany(Pet);
Pet.belongsTo(User);

Auth.hasOne(User);
User.belongsTo(Auth);

Report.hasOne(Pet);
Pet.belongsTo(Report);

export { User, Pet, Auth, Report };
