const Mongoose= require('mongoose');


const product_schema= new Mongoose.Schema({
	
	name:{
		type: String
	},

	description:{
		type: String
	},

	price:{
		type: Number
	}

})

module.exports= Mongoose.model("product", product_schema)