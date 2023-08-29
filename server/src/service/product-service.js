import prisma from "../app/database.js";
import validation from "../validation/validation.js";
import producValidation from "../validation/product-validation.js";
import responseError from "../error/error.js";

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

const post = async (request, image) => {
  const validate = await validation(producValidation, request);
  const product = await prisma.product.findFirst({
    where: {
      name: validate.name,
    },
  });

  if (product) {
    throw new responseError(400, "duplicate name entry");
  }
  if (!image) {
    throw new responseError(400, "image is required");
  }
  const extension = path.extname(image.filename);
  if (extension === ".png" || extension === ".jpg") {
    const result = await prisma.product.create({
      data: {
        image: image.filename,
        ...validate,
      },
    });

    return result;
  } else {
    throw new responseError(400, "extension image must be png or jpg");
  }
};

const update = async (request, image, params) => {
  const validate = await validation(producValidation, request);
  const product = await prisma.product.findFirst({
    where: {
      name: params,
    },
  });

  if (!product) {
    throw new responseError(404, "product not found");
  }

  if (!image) {
    const result = await prisma.product.updateMany({
      where: {
        name: product.name,
      },
      data: {
        ...validate,
      },
    });
    return result;
  }

  const result = await prisma.product.update({
    where: {
      name: product.name,
    },
    data: {
      image: image.filename,
      ...validate,
    },
  });
  return result;
};

export default {
  get,
  post,
  update,
};
