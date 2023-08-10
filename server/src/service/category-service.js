import prisma from "../app/database.js";
import validation from "../validation/validation.js";
import categoryValidation from "../validation/category-validation.js";
import responseError from "../error/error.js";

const post = async (request) => {
  const validate = await validation(categoryValidation, request);

  const isExistCategory = await prisma.category.findFirst({
    where: {
      name: validate.name,
    },
  });

  if (isExistCategory) {
    throw new responseError(400, "category name already exist");
  }

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
