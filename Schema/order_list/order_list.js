const Joi = require("joi");

const order_listSchema = (order_list) => {
  const schema = Joi.object({
    pickup_time: Joi.string(),
    shipping_time: Joi.string(),
	delivery_type: Joi.string(),
    quantity: Joi.number(),
	total_cost: Joi.number(),
    user_id: Joi.string(),
	shop_id: Joi.string(),
    product_id: Joi.string(),
	service_id: Joi.string(),
    order_status_id: Joi.string(),
	shipping_id: Joi.string()

  });
  return schema.validate(order_list);
};

module.exports = order_listSchema;
