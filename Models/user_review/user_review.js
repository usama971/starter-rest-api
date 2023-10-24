const Mongoose= require('mongoose');

const user_review_schema= new Mongoose.Schema({

	rating_value:{
		type: Number
	},
	comment:{
		type: String
	},
	user_id:{
		type: Mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},

	ordered_id:{
		type: Mongoose.Schema.Types.ObjectId,
		ref: 'order_list'
	}

});

module.exports= Mongoose.model("user_review", user_review_schema)