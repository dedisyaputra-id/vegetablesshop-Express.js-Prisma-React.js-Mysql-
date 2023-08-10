import validation from "../validation/validation.js";
import trasactionValidation from "../validation/transaction-validation.js";
import prisma from "../app/database.js";
const post = async (request) => {
  const validate = validation(trasactionValidation, request);

  const isExistUser = await prisma.transaction.findFirst({
    where: {
      userid: validate.userid,
    },
  });
  const isExistProduct = await prisma.transaction.findFirst({
    where: {
      productid: validate.productid,
    },
  });

  if (isExistUser && isExistProduct) {
    const result = await prisma.transaction.update({
      where: {
        order_number: validate.order_number,
      },
      data: {
        amount: isExistUserTransaction.amount + validate.amount,
      },
    });
    return result;
  }

  const result = await prisma.transaction.create({
    data: {
      ...validate,
    },
  });

  return result;
};
