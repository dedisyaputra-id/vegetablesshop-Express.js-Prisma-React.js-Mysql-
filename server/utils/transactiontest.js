import prisma from "../src/app/database.js";

const destroy = async () => {
  const result = await prisma.cart.deleteMany({
    where: {
      userid: 2,
    },
  });

  return result;
};

const create = async () => {
  const result = await prisma.cart.create({
    data: {
      order_number: 1,
      userid: 2,
      productid: 47,
      quantity: 1,
    },
  });

  return result;
};

export { destroy, create };
