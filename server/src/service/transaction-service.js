import validation from "../validation/validation.js";
import trasactionValidation from "../validation/transaction-validation.js";
import prisma from "../app/database.js";

const post = async (request, productid) => {
  const validate = await validation(trasactionValidation, request);
  const productId = Number(productid);
  const isExistTransaction = await prisma.cart.findFirst({
    where: {
      AND: [
        {
          userid: validate.userid,
        },
        {
          productid: productId,
        },
      ],
    },
  });

  if (isExistTransaction) {
    const result = await prisma.cart.updateMany({
      where: {
        AND: [
          { userid: isExistTransaction.userid },
          { productid: isExistTransaction.productid },
        ],
      },
      data: {
        quantity: isExistTransaction.quantity + validate.quantity,
      },
    });

    return result;
  }

  const result = await prisma.cart.create({
    data: {
      ...validate,
      productid: productId,
    },
  });

  return result;
};

export default {
  post,
};
