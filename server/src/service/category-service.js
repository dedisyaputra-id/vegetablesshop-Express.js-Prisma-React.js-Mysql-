import prisma from "../app/database.js";
import validation from "../validation/validation.js";
import categoryValidation from "../validation/category-validation.js";

const post = async (request) => {
  const validate = await validation(categoryValidation, request);

  const result = await prisma.category.create({
    data: {
      ...validate,
    },
  });

  return result;
};

export default {
  post,
};
