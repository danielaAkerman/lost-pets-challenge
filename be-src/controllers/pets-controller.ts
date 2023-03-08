import { Pet, User } from "../models";

import { cloudinary } from "../lib/cloudinary";
import { index } from "../lib/algolia";

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
