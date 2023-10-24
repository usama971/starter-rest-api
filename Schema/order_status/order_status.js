const Joi = require("joi");

const order_statusSchema = (order_status) => {
  const schema = Joi.object({
    status: Joi.string()

  });
  return schema.validate(order_status);
};

module.exports = order_statusSchema;
