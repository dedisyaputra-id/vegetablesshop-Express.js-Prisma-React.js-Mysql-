import prisma from "../src/app/database.js";

const destroy = async () => {
  const result = await prisma.cart.deleteMany({
    where: {
      AND: [{ userid: 2 }, { productid: 47 }],
    },
  });

  return result;
};

export { destroy };
