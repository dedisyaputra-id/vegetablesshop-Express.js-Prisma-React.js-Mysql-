import Joi from "joi";

const validate = Joi.object({
  name: Joi.string().min(4).max(100).required(),
  stock: Joi.number().required(),
  price: Joi.number().required(),
  category_id: Joi.number().max(11).required(),
});

export default validate;
