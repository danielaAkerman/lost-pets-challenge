import * as express from "express";
import * as path from "path";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as process from "process";
import * as cors from "cors";
import { User, Pet, Auth, Report } from "./models";
import { index } from "./lib/algolia";
import { cloudinary } from "./lib/cloudinary";
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

// logIn
app.post("/login", async (req, res) => {
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
    const id = auth.dataValues.user_id;
    const token = jwt.sign({ id }, SECRET);
    const user = await User.findByPk(id);
    res.json({ token, user });
  } else {
    res.status(401).json({ message: "not found" });
  }
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

app.post("/update-user/:id", async (req, res) => {
  const { id } = req.params;

  const updatedUser = await User.update(req.body, { where: { id } });
  if (req.body.password) {
    const passHash = getSHA(req.body.password);
    req.body.password = passHash;
    await Auth.update(req.body, { where: { id } });
  }
  res.json(updatedUser);
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
  const {
    name,
    status,
    last_location_lat,
    last_location_lng,
    imagen_data,
    ubication,
  } = req.body;

  const imagen = await cloudinary.uploader.upload(imagen_data, {
    resource_type: "image",
    discard_original_filename: true,
    width: 1000,
  });
  req.body.picture_url = imagen.secure_url;

  const newPet = await Pet.create(req.body);

  const algoliaRes = await index.saveObject({
    objectID: newPet.get("id"),
    name,
    ubication,
    status: "lost",
    picture_url: imagen.secure_url,
    _geoloc: {
      lat: last_location_lat,
      lng: last_location_lng,
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
  if (body.ubication) {
    respuesta.ubication = body.ubication;
  }
  if (body.picture_url) {
    respuesta.picture_url = body.picture_url;
  }
  if (body.last_location_lat && body.last_location_lng) {
    respuesta._geoloc = {
      lat: body.last_location_lat,
      lng: body.last_location_lng,
    };
  }
  return respuesta;
}

app.post("/edit-pet/:id", async (req, res) => {
  const { id } = req.params;

  if (req.body.imagen_data) {
    const { imagen_data } = req.body;

    const imagen = await cloudinary.uploader.upload(imagen_data, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });
    req.body.picture_url = imagen.secure_url;
  }

  const editedPet = await Pet.update(req.body, { where: { id } });
  if (
    req.body.name ||
    req.body.status ||
    req.body.ubication ||
    req.body.picture_url ||
    (req.body.last_location_lat && req.body.last_location_lng)
  ) {
    const indexItem = bodyToIndex(req.body, id);
    const algoliaRes = await index.partialUpdateObject(indexItem);
  }
  res.json(editedPet);
});

app.post("/delete-pet/:id", async (req, res) => {
  const { id } = req.params;

  const deletedPet = await Pet.update(req.body, { where: { id } });

  req.body.objectID = id;

  // const indexItem = bodyToIndex(req.body, id);
  const algoliaRes = await index.partialUpdateObject(req.body);

  res.json(deletedPet);
});

app.get("/pets", async (req, res) => {
  const pets = await Pet.findAll();
  res.json(pets);
});

app.get("/pet/:id", async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findByPk(id);
  res.json(pet);
});

app.get("/my-pets/:userId", async (req, res) => {
  const { userId } = req.params;
  const pets = await Pet.findAll({ where: { userId, status: "lost" } });
  res.json(pets);
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/pets-near-me", async (req, res) => {
  const { lat, lng } = req.query;
  const { hits } = await index.search("lost", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 10000,
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
