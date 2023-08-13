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

const get = async (req, res, next) => {
  try {
    const result = await transactionService.get();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const orderNumber = req.params.orderNumber;
  try {
    const result = await transactionService.update(req.body, orderNumber);
    res.status(204).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await transactionService.destroy(req.params.orderNumber);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  post,
  get,
  update,
  destroy,
};
