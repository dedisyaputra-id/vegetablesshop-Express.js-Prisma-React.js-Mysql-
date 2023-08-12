import Joi from "joi";

const validate = Joi.object({
  order_number: Joi.number().required(),
  userid: Joi.number().required(),
  quantity: Joi.number().required(),
});

export default validate;
