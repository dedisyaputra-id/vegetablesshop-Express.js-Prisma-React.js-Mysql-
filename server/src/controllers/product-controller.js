import productService from "../service/product-service.js";

const get = async (req, res, next) => {
  try {
    const result = await productService.get();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const result = await productService.post(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  get,
  post,
};
