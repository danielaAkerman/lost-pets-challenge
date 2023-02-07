import { User, Product } from "../models";

async function createProduct(userId, productData) {
  if (!userId) {
    throw "Error, userId es necesario";
  }
  const user = await User.findByPk(userId);
  if (user) {
    const product = await Product.create({
      ...productData,
      UserId: userId,
    });
    return product;
  } else {
    throw "Error, user not found";
  }
}

export { createProduct };
