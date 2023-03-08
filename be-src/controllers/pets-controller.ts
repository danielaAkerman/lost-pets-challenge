import { Pet, User, Report } from "../models";
import { cloudinary } from "../lib/cloudinary";
import { index } from "../lib/algolia";
const sgMail = require("@sendgrid/mail");

export async function updateNewPet(updateData) {
  const {
    name,
    status,
    last_location_lat,
    last_location_lng,
    imagen_data,
    ubication,
  } = updateData;

  const imagen = await cloudinary.uploader.upload(imagen_data, {
    resource_type: "image",
    discard_original_filename: true,
    width: 1000,
  });
  updateData.picture_url = imagen.secure_url;

  const newPet = await Pet.create(updateData);

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
  return newPet;
}

export async function newReport(reportData) {
  const { reporter, phone_number, message, pet_id, pet_name } = reportData;

  const newReport = await Report.create(reportData);

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
      console.log( `Reporte enviado a ${ownerEmail}`)
      return {message: "Reporte enviado"} ;
    })
    .catch((error) => {
      console.error(error);
      return {message: "Error"};
    });
}

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

export async function editPet(petId, petData) {
  if (petData.imagen_data) {
    const { imagen_data } = petData;

    const imagen = await cloudinary.uploader.upload(imagen_data, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });
    petData.picture_url = imagen.secure_url;
  }

  const editedPet = await Pet.update(petData, { where: { id: petId } });
  if (
    petData.name ||
    petData.status ||
    petData.ubication ||
    petData.picture_url ||
    (petData.last_location_lat && petData.last_location_lng)
  ) {
    const indexItem = bodyToIndex(petData, petId);
    const algoliaRes = await index.partialUpdateObject(indexItem);
  }
  return editedPet;
}

export async function deletePet(petId, petData) {
  const deletedPet = await Pet.update(petData, { where: { id: petId } });
  petData.objectID = petId;
  const algoliaRes = await index.partialUpdateObject(petData);
  return {deletePet};
}

export async function getOnePet(petId) {
  const pet = await Pet.findByPk(petId);
  return pet;
}

export async function getMyPets(userId) {
  const pets = await Pet.findAll({ where: { userId, status: "lost" } });
  return pets;
}

export async function petsNearMe(lat, lng) {
  const pets = await index.search("lost", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 10000,
  });
  return pets;
}
