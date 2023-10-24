const Joi = require("joi");

const user_reviewSchema = (user_review) => {
  const schema = Joi.object({
    rating_value: Joi.number(),
    comment: Joi.string(),
    user_id: Joi.string(),
    ordered_id: Joi.number() 
  });
  return schema.validate(user_review);
};

module.exports = user_reviewSchema;
