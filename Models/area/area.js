const Mongoose = require("mongoose");

const area_schema = new Mongoose.Schema({ 
    
    area_name:{
        type: String
    },
  
  
});

module.exports = Mongoose.model("area", area_schema);