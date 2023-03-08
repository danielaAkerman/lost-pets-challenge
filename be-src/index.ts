import * as express from "express";
import * as path from "path";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as process from "process";
import * as cors from "cors";
import { User, Pet, Auth, Report } from "./models";
import { index } from "./lib/algolia";
import { cloudinary } from "./lib/cloudinary";
import {
  getUserFromToken,
  signUp,
  updateUser,
} from "./controllers/users-controller";
import { getAuth, signIn } from "./controllers/auth-controller";
import { updateNewPet } from "./controllers/pets-controller";
const sgMail = require("@sendgrid/mail");
// import {} from "./controllers/users-controller";
// import {} from "./controllers/auth-controller";

const port = process.env.PORT;
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const SECRET = process.env.SECRET;
const staticDirPath = path.resolve(__dirname, "../dist");

function getSHA(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// mantener sesion iniciada
app.get("/init/:token", async (req, res) => {
  const { token } = req.params;
  const user = await getUserFromToken(token);
  res.json(user);
});

// logIn
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const passHash = getSHA(password);
  const auth = await getAuth(email, passHash);
  res.json(auth);
});

// signUp
app.post("/auth", async (req, res) => {
  const { email, fullname, password } = req.body;
  const passHash = getSHA(password);
  const auth = await signUp(email, fullname, passHash);
  res.json(auth);
});

// signIn
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const passHash = getSHA(password);
  const auth = await signIn(email, passHash);
  res.json(auth);
});

app.post("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const passHash = getSHA(req.body.password);
  const updatedUser = await updateUser(id, req.body, passHash);
  res.json(updatedUser);
});

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

app.post("/new-pet", async (req, res) => {
  const newPet = await updateNewPet(req.body);
  res.json(newPet);
});

app.post("/new-report", async (req, res) => {
  const { reporter, phone_number, message, pet_id, pet_name } = req.body;

  const newReport = await Report.create(req.body);

  const reportedPet = await Pet.findByPk(pet_id);
  const ownerId = reportedPet.dataValues.userId;

  const owner = await User.findByPk(ownerId);
  const ownerEmail = owner.dataValues.email;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: ownerEmail,
    from: "daniela.akerman@outlook.com",
    subject: `Nuevo reporte de ${pet_name}`,
    text: `Hola!`,
    html: `<strong>LostPets</strong>
    Hola! Te contamos que ${reporter} vio a tu mascota ${pet_name}, 
    su número es ${phone_number} 
    y te dejó este mensaje: ${message}
    `,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.json({ message: `Reporte enviado a ${ownerEmail}` });
    })
    .catch((error) => {
      console.error(error);
      res.json("Error");
    });
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
  console.log("Corriendo en puerto " + port);
});
