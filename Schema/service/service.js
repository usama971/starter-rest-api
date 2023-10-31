const Joi= require('joi');


const service_schema=(service)=>{
console.log(service)
	const schema= Joi.object({
		service_option: Joi.string(),
		price: Joi.number()
	});
  return schema.validate(service);
}

module.exports= service_schema;