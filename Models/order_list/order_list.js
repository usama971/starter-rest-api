const Mongoose= require('mongoose');

const order_list_schema= new Mongoose.Schema({

	pickup_time:{
		type: String
	},
	shipping_time:{
		type:String
	},
	delivery_type:{
		type: String
	},
	quantity:{
		type: Number
	},
	total_cost:{
		type: Number
	},
	array_of_product:{
		type: Array,
		
	},
	user_id:{
		type: Mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	shop_id:{
		type: Mongoose.Schema.Types.ObjectId,
		ref:'shop'
	},
	
	service_id:{
		type: Mongoose.Schema.Types.ObjectId,
		ref: 'service'
	},
	order_status_id:{
		type: Mongoose.Schema.Types.ObjectId,
		ref: 'order_status'
	},
	shipping_id:{
		type: Mongoose.Schema.Types.ObjectId,
		ref: 'shipping'
	}
});

module.exports= Mongoose.model("order_list", order_list_schema)