const Joi = require("joi");

const shipping_schema = (shipping) => {
  const schema = Joi.object({
    shipping_type: Joi.string(),
    price: Joi.number(),

  });
  return schema.validate(shipping);
};

module.exports = shipping_schema;
