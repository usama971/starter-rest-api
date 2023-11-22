const Mongoose = require("mongoose");

const user_model = new Mongoose.Schema({ 
    
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String
    },
    password:{
        type: String
    },
    phone_number:{
        type: Number
    },
    account_type:{
        type: String        
    },
    terms_and_condition:{
        type: String
    },
    address_id:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'address'
      },
      
    roles:{
        User: {
            type:Number,
            required:false,

            // default:2001
        },
        Rider: {
            type:Number,
            required:false,
        },
        Admin: {
            type: Number,
            required:false
        },
        SuperAdmin: {
            type: Number,
            required:false
        }
    },
    refreshToken: {
        type: String,
        required:false
    }
    
});

module.exports = Mongoose.model("user", user_model);