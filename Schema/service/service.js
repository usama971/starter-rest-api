const Joi= require('joi');


const service_schema=(service)=>{

	const schema= Joi.object({
		service_type: Joi.string(),
		price: Joi.number()
	});
  return schema.validate(schema);
}

module.exports= service_schema;