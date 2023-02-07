import * as express from "express";
import * as path from "path";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as process from "process";
import { User, Product, Auth } from "./models";
import {
  updateProfile,
  getProfile,
  getEveryProfiles,
} from "./controllers/users-controller";
import { createProduct } from "./controllers/products-controller";
import {} from "./controllers/auth-controller";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json({ limit: "50mb" }));

const SECRET = process.env.SECRET;
const staticDirPath = path.resolve(__dirname, "../fe-dist");

function getSHA256ofJSON(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// LA RECEPCIÓN DE LOS DATOS (body, params, etc) SE CHEQUEA EN ESTA INSTANCIA

app.get("/environment", (req, res) => {
  res.json({ message: process.env.environment });
});

app.post("/profile", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Falta el body",
    });
  }
  console.log("el body del endpoint es", req.body);
  const newProfile = await updateProfile(1, req.body);
  console.log("desde back", newProfile);
  res.json(newProfile);
});

app.get("/profile", async (req, res) => {
  const newProfile = await getProfile(1);
  console.log("desde back", newProfile);
  res.json(newProfile);
});

app.get("/profiles", async (req, res) => {
  const profiles = await getEveryProfiles();

  res.json(profiles);
});

// // signUp
// app.post("/auth", async (req, res) => {
//   const { email, name, birthdate, password } = req.body;
//   const [user, created] = await User.findOrCreate({
//     where: {
//       email: req.body.email,
//     },
//     defaults: {
//       email,
//       name,
//       birthdate,
//     },
//   });

//   const [auth, authCreated] = await Auth.findOrCreate({
//     where: {
//       user_id: user.dataValues.id,
//     },
//     defaults: {
//       email,
//       password: getSHA256ofJSON(password),
//       user_id: user.dataValues.id,
//     },
//   });
//   console.log({ authCreated, auth });
//   res.json(auth);
// });

// // signIn
// app.post("/auth/token", async (req, res) => {
//   const { email, password } = req.body;
//   const passHash = getSHA256ofJSON(password);
//   const auth = await Auth.findOne({
//     where: {
//       email,
//       password: passHash,
//     },
//   });
//   const token = jwt.sign({ id: auth.dataValues.user_id }, SECRET);
//   // Si no hay registro de ese usuario y esa contraseña, devuelve null
//   if (auth) {
//     res.json({ token });
//   } else {
//     res.status(401).json({ messaje: "not found" });
//   }
// });

// async function authMiddleware(req, res, next) {
//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     const data = jwt.verify(token, SECRET);
//     req._user = data;
//     next();
//   } catch (e) {
//     res.status(401).json({ error: true });
//   }
// }

// app.get("/me", authMiddleware, async (req, res) => {
//   const foundId = req._user.id;
//   // const foundUser = await User.findOne({ where: { id: foundId } });
//   const foundUser = await User.findByPk(req._user.id);
//   res.json(foundUser);
// });

app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
  res.sendFile(staticDirPath + "/index.html");
});

app.listen(port, () => {
  console.log("Corriendo en puerto http://localhost:" + port);
});
