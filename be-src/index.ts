import * as express from "express";
import * as path from "path";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as process from "process";
import * as cors from "cors";
import { User, Pet, Auth, Report } from "./models";
// import {
//   updateProfile,
//   getProfile,
//   getEveryProfiles,
// } from "./controllers/users-controller";
// import { createProduct } from "./controllers/products-controller";
// import {} from "./controllers/auth-controller";

const port = process.env.PORT;
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const SECRET = process.env.SECRET;
const staticDirPath = path.resolve(__dirname, "../front-dist");

function getSHA(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// LA RECEPCIÓN DE LOS DATOS (body, params, etc) SE CHEQUEA EN ESTA INSTANCIA

app.get("/environment", (req, res) => {
  res.json({ message: process.env.environment });
});

// ver si existe un mail
app.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({
    where: { email },
  });
  res.json(foundUser); // Si no existe devuelve null
});

// signUp
app.post("/auth", async (req, res) => {
  const { email, fullname, password } = req.body;
  const user = await User.create({
    email,
    fullname,
  });

  const auth = await Auth.create({
    email,
    password: getSHA(password),
    user_id: user.dataValues.id,
  });

  res.json(auth);
});

// signIn
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const passHash = getSHA(password);
  const auth = await Auth.findOne({
    where: {
      email,
      password: passHash,
    },
  });
  // Si no hay registro de ese usuario y esa contraseña, devuelve null
  if (auth) {
    const token = jwt.sign({ id: auth.dataValues.user_id }, SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: "not found" });
  }
});

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data;
    next();
  } catch (e) {
    res.status(401).json({ error: true });
  }
}

app.get("/me", authMiddleware, async (req, res) => {
  const foundId = req._user.id;
  // const foundUser = await User.findOne({ where: { id: foundId } });
  const foundUser = await User.findByPk(req._user.id);
  res.json(foundUser);
});

app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
  res.sendFile(staticDirPath + "/index.html");
});

app.listen(port, () => {
  console.log("Corriendo en puerto http://localhost:" + port);
});
