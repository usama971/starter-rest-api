const Mongoose = require("mongoose");

const rider_schema = new Mongoose.Schema({

	name:{
		type: String
	},
	age:{
		type: Number
	},
	national_id_card:{
		type: Number
	},

	national_license:{
		type: Number
	},

	address_id :{
		type: Mongoose.Schema.Types.ObjectId,
		ref: 'address'

	}


});

module.exports = Mongoose.model("rider", rider_schema)