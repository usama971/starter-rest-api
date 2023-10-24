const Joi = require("joi");

const addressSchema = (address) => {
  const schema = Joi.object({
    address: Joi.string(),
    area_id: Joi.string(),

  });
  return schema.validate(address);
};

module.exports = addressSchema;
