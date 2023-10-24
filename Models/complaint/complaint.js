const Mongoose= require('mongoose');

const complaint_schema= new Mongoose.Schema({
	complaint:{
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

module.exports= Mongoose.model('complaint', complaint_schema)