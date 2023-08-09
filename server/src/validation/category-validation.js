import Joi from "joi";

const validate = Joi.object({
  name: Joi.string().required(),
});

export default validate;
