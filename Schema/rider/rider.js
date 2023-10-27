const Joi= require('joi');

const rider_schema=(rider)=>{
	const schema= Joi.object({
	name:Joi.string(),
	age: Joi.number(),
	national_id_card: Joi.number(),
	national_license: Joi.number(),
	phone_number: Joi.number(),
	address_id: Joi.string()

	});

	return schema.validate(rider)
};

module.exports= rider_schema ;