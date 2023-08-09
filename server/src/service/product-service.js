import prisma from "../app/database.js";
import validation from "../validation/validation.js";
import producValidation from "../validation/product-validation.js";

const get = async () => {
  const result = await prisma.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return result;
};

const post = async (request) => {
  const validate = await validation(producValidation, request);

  const result = await prisma.product.create({
    data: {
      ...validate,
    },
  });

  return result;
};

export default {
  get,
  post,
};
