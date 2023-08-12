import transactionService from "../service/transaction-service.js";

const post = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const result = await transactionService.post(req.body, productId);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  post,
};
