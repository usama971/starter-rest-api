const Joi = require("joi");

const areaSchema = (area) => {
  const schema = Joi.object({
    area_name: Joi.string().required()
  });
  return schema.validate(area);
};

module.exports = areaSchema;
