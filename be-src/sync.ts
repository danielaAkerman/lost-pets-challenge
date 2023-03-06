import { sequelize } from "./models/connection";
import { User, Pet, Auth, Report } from "./models";

Pet.sequelize.sync({ alter: true }).then((res) => {
  console.log(res);
  Pet.findAll();
});
