
const Express = require('express');
var cors = require('cors');
const App = Express();
App.use(Express.json());
App.use(cors());

const Mongoose = require("mongoose");
const url = "mongodb+srv://admin:admin1234@dhobionline.agzb49y.mongodb.net/";

Mongoose.connect(url, { useNewUrlParser: true });
const Mongo = Mongoose.connection;

Mongo.on("open", () => {
  console.log("MongoDB Connected!");
});


App.get('/api', (req, res) => {
  res.send('Hello, This is React Backend!');
});

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

// userprofile
const userprofile_path = require("./Route/user_profile/user_profile");
App.use("/api/userprofile", userprofile_path);






const port = process.env.PORT || 3000;
App.listen(port, () => {
  console.log("Server Running on port:",port);
});


