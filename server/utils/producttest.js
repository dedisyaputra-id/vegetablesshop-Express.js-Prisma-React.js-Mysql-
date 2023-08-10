import prisma from "../src/app/database.js";

const create = async () => {
  const result = await prisma.product.create({
    data: { name: "mangga", stock: 10, price: 10000, category_id: 2 },
  });

  return result;
};

const destroy = async () => {
  const result = await prisma.product.deleteMany({
    where: {
      name: "mangga",
    },
  });

  return result;
};

export { create, destroy };
