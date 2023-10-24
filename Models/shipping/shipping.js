const Mongoose= require('mongoose');

const shipping_schema= new Mongoose.Schema({

	shipping_type:{
		type: String
	},
	price:{
		type: Number
	}
});

module.exports= Mongoose.model("shipping", shipping_schema)