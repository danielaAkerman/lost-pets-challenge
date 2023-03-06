import { Pet, User } from "../models";

import { cloudinary } from "../lib/cloudinary";

export async function updateNewPet(userId, updateData) {
  if (updateData.pictureURL) {
    const imagen = await cloudinary.uploader.upload(updateData.pictureURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });

    const updateDataComplete = {
      name: updateData.name,
      status: updateData.status,
      picture_url: imagen.secure_url,

    //   last_location_lat: ,
    //   last_location_lng: ,
    };

    await Pet.create(updateDataComplete);
    // await User.update(updateDataComplete, { where: { id: userId } });

    return updateDataComplete;
  } else {
    console.log("No hay imagen adjunta");
  }
}
