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

export default {
  get,
};
