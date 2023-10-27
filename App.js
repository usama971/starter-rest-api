
const Express = require('express');
var cors = require('cors');
const App = Express();
App.use(Express.json());
App.use(cors());
let cookieParser = require('cookie-parser');

const { logger, errorHandler } = require('./middleWare/logger');
const verifyJWT = require('./middleWare/verifyJWT');

//^thing we require for Backend other then routs

const Mongoose = require("mongoose");
const url = "mongodb://127.0.0.1/dhobi_online";
// const url = "mongodb+srv://admin:admin1234@dhobionline.agzb49y.mongodb.net/";


Mongoose.connect(url, { useNewUrlParser: true });
const Mongo = Mongoose.connection;

Mongo.on("open", () => {
  console.log("MongoDB Connected!");
});
App.use(cookieParser());
App.use(logger);


App.get('/api', (req, res) => {
  res.send('Hello, This is React Backend!');
});

//User Authentication
App.use("/api/user_auth", require('./Route/auth/auth'));

//User Token Refreshing 
App.use('/api/refresh', require('./Route/auth/refresh'));

//User user logout 
App.use('/api/logout', require('./Route/auth/logout'));

//User user logout 
App.use('/api/product', require('./Route/product/product'));


// userprofile
const userprofile_path = require("./Route/user_profile/user_profile");
App.use("/api/userprofile", userprofile_path);

// userprofile
const riderprofile_path = require("./Route/rider_profile/rider_profile");
App.use("/api/riderprofile", riderprofile_path);

App.use(verifyJWT);

// user
const user_path = require("./Route/user/user");
App.use("/api/user", user_path);

// shop
const shop_path = require("./Route/shop/Shop");
App.use("/api/shop", shop_path);

// area
const area_path = require("./Route/area/area");
App.use("/api/area", area_path);


// address
const address_path = require("./Route/address/address");
App.use("/api/address", address_path);



const port = process.env.PORT || 7000;
App.listen(port, () => {
  console.log("Server Running on port:",port);
});


