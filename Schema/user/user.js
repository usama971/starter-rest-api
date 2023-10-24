const Joi = require("joi");

const userSchema = (user) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().required(),
    phone_number: Joi.number().required(),
    account_type: Joi.string().required(),
    terms_and_condition: Joi.string().required(),
    address_id: Joi.string().required(),
    
  });
  return schema.validate(user);
};

module.exports = userSchema;
