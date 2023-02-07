import { sequelize } from "./models/connection";
import { User, Product } from "./models";

User.sequelize.sync({ force: true }).then((res) => {
  console.log(res);
  User.findAll()
});