const Mongoose = require( 'mongoose');


const service_schema= new Mongoose.Schema({

	service_type:{
		type: String
	},

	price:{
		type: Number
	}
});

module.exports = Mongoose.model("service", service_schema)