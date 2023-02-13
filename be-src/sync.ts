import { sequelize } from "./models/connection";
import { User, Pet, Auth, Report } from "./models";

Report.sequelize.sync({ force: true }).then((res) => {
  console.log(res);
  Report.findAll();
});
