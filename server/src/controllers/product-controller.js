import productService from "../service/product-service.js";
import responseError from "../error/error.js";

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
    const result = await productService.post(req.body, req.file);
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
