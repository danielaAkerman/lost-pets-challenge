import * as express from "express";
import * as path from "path";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as process from "process";
import * as cors from "cors";
import { User, Pet, Auth, Report } from "./models";
import { index } from "./lib/algolia";
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

// app.get("/environment", (req, res) => {
//   res.json({ message: process.env.environment });
// });

// ver si existe un mail
// app.post("/check-email", async (req, res) => {
//   const { email } = req.body;
//   const foundUser = await User.findOne({
//     where: { email },
//   });
//   res.json(foundUser); // Si no existe devuelve null
// });

// mantener sesion iniciada
app.get("/init/:token", async (req, res) => {
  const { token } = req.params;
  const tokenData = jwt.verify(token, SECRET);
  const userId = tokenData.id;
  const user = await User.findByPk(userId);

  res.json(user);
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

app.post("/new-pet", async (req, res) => {
  // const { name, last_location_lat, last_location_lng, status } = req.body;

  const newPet = await Pet.create(req.body);

  const algoliaRes = await index.saveObject({
    objectID: newPet.get("id"),
    name: newPet.get("name"),
    status: newPet.get("status"),
    _geoloc: {
      lat: newPet.get("last_location_lat"),
      lng: newPet.get("last_location_lng"),
    },
  });
  res.json(newPet);
});

app.post("/new-report", async (req, res) => {
  // const { reporter, phone_number, message, pet_id } = req.body;

  const newReport = await Report.create(req.body);
  res.json({ message: "Reporte enviado" });
});

app.get("/reports/:pet_id", async (req, res) => {
  const { pet_id } = req.params;
  const reports = await Report.findAll({
    where: {
      pet_id,
    },
  });
  res.json(reports);
});

function bodyToIndex(body, id) {
  const respuesta: any = {};
  respuesta.objectID = id;
  if (body.name) {
    respuesta.name = body.name;
  }
  if (body.status) {
    respuesta.status = body.status;
  }
  if (body.last_location_lat && body.last_location_lng) {
    respuesta._geoloc = {
      lat: body.last_location_lat,
      lng: body.last_location_lng,
    };
  }
  return respuesta;
}

app.put("/edit-pet/:id", async (req, res) => {
  const { id } = req.params;
  const editedPet = await Pet.update(req.body, { where: { id } });
  if (
    req.body.name ||
    req.body.status ||
    (req.body.last_location_lat && req.body.last_location_lng)
  ) {
    const indexItem = bodyToIndex(req.body, id);
    const algoliaRes = await index.partialUpdateObject(indexItem);
  }
  res.json(editedPet);
});

app.get("/pets", async (req, res) => {
  const pets = await Pet.findAll();
  res.json(pets);
});

app.get("/my-pets/:userId", async (req, res) => {
  const { userId } = req.params;
  const pets = await Pet.findAll({ where: { userId } });
  res.json(pets);
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/pets-near-me", async (req, res) => {
  const { lat, lng } = req.query;
  const { hits } = await index.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 3000,
  });
  res.json(hits);
});

app.use(express.static(staticDirPath));

app.get("*", function (req, res) {
  res.sendFile(staticDirPath + "/index.html");
});

app.listen(port, () => {
  console.log("Corriendo en puerto http://localhost:" + port);
});
