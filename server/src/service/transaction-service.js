import validation from "../validation/validation.js";
import {
  validate as transactionValidation,
  validationUpdate,
} from "../validation/transaction-validation.js";
import prisma from "../app/database.js";
import responseError from "../error/error.js";

const post = async (request, productid) => {
  const validate = await validation(transactionValidation, request);
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

const get = async () => {
  const result = await prisma.cart.findMany({
    include: {
      user: {
        select: {
          username: true,
          name: true,
        },
      },
      product: {
        select: {
          name: true,
          stock: true,
          price: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return result;
};

const update = async (request, ordernumber) => {
  const validate = await validation(validationUpdate, request);
  const orderNumber = Number(ordernumber);
  const isExistTransaction = await prisma.cart.findUnique({
    where: {
      order_number: orderNumber,
    },
  });

  if (!isExistTransaction) {
    throw new responseError(404, "not found transaction");
  }

  const result = await prisma.cart.update({
    where: {
      order_number: isExistTransaction.order_number,
    },
    data: {
      quantity: validate.quantity + isExistTransaction.quantity,
    },
  });

  return result;
};

const destroy = async (request) => {
  const orderNumber = Number(request);
  const transaction = await prisma.cart.findUnique({
    where: {
      order_number: orderNumber,
    },
  });

  if (!transaction) {
    throw new responseError(404, "transaction not found");
  }

  const result = await prisma.cart.delete({
    where: {
      order_number: transaction.order_number,
    },
  });

  return result;
};

const checkout = async (request) => {
  const orderNumber = Number(request);
  const transaction = await prisma.cart.findUnique({
    where: {
      order_number: orderNumber,
    },
  });

  if (!transaction) {
    throw new responseError(404, "transaction not found");
  }

  const result = await prisma.cart.update({
    where: {
      order_number: transaction.order_number,
    },
    data: {
      status: "checkout",
    },
  });

  return result;
};

export default {
  post,
  get,
  update,
  destroy,
  checkout,
};
