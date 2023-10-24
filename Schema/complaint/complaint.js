const Joi = require("joi");

const complaintSchema = (complaint ) => {
  const schema = Joi.object({
    complaint : Joi.string(),
    user_id: Joi.string(),
	ordered_id: Joi.string()

  });
  return schema.validate(complaint );
};

module.exports = complaintSchema;
