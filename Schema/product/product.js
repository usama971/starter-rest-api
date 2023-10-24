const Joi = require("joi");

const productSchema = (product) => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
	price: Joi.number()

  });
  return schema.validate(product);
};

module.exports = productSchema;
