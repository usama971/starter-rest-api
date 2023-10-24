const Joi = require("joi");

const userSchema = (Client) => {
  const schema = Joi.object({
    name: Joi.string(),
    phone_number: Joi.number(),
    address_id: Joi.string(),

    

  });
  return schema.validate(Client);
};

module.exports = userSchema;
