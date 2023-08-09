import categoryService from "../service/category-service.js";

const post = async (req, res, next) => {
  try {
    const result = await categoryService.post(req.body);
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
