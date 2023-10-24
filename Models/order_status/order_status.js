const Mongoose= require('mongoose');

const order_status_schema= new Mongoose.Schema({

	status:{
		type: String
	}
});

module.exports= Mongoose.model("order_status", order_status_schema)