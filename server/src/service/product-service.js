import prisma from "../app/database.js";

const get = async () => {
  const result = await prisma.product.findMany();

  return result;
};

export default {
  get,
};
