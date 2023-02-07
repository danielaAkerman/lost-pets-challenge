import { User, Product } from "../models";
import { cloudinary } from "../lib/cloudinary";

export async function updateProfile(userId, updateData) {
  if (updateData.pictureURL) {
    const imagen = await cloudinary.uploader.upload(updateData.pictureURL, {
      resource_type: "image",
      discard_original_filename: true,
      width: 1000,
    });

    const updateDataComplete = {
      fullname: updateData.fullname,
      bio: updateData.bio,
      pictureURL: imagen.secure_url,
    };

    await User.create(updateDataComplete);
    // await User.update(updateDataComplete, { where: { id: userId } });

    return updateDataComplete;
  } else {
    console.log("No hay imagen adjunta");
  }
}

export async function getProfile(userId) {
  const userProfile = await User.findByPk(userId);
  return userProfile;
}

export async function getEveryProfiles() {
  const profiles = await User.findAll();
  return profiles;
}
