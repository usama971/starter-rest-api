const Mongoose = require("mongoose");

const address_schema = new Mongoose.Schema({ 
    
    address:{
        type: String
    },
  
    area_id:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'area'
      }
  
});

module.exports = Mongoose.model("address", address_schema);