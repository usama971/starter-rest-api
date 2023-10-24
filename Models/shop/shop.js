const Mongoose = require("mongoose");

const shop_schema = new Mongoose.Schema({ 
    
    name:{
        type: String
    },
    phone_number:{
        type: Number
    },
    address_id:{
        type:Mongoose.Schema.Types.ObjectId,
        ref: 'address'
      }
  
});

module.exports = Mongoose.model("shop", shop_schema);