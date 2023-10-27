const UserDetails = require("../../Models/user/user");
const UserSchema = require("../../Schema/user/user");

const AddressDetails = require("../../Models/address/address");
const AddressSchema = require("../../Schema/address/address");

const AreaDetails = require("../../Models/area/area");
const AreaSchema = require("../../Schema/area/area");

const mongoose = require("mongoose");
// var Fawn = require("fawn");
const bcrypt = require('bcrypt');

const Express = require("express");
const MyRouter = Express.Router();

//  Fawn.init(mongoose)
MyRouter.post("/Add", async (req, res) => {
 
  // address
  const NewAddress = {
    address: req.body.address,
    area_id: req.body.area_id,
  };
  const address = AddressSchema(NewAddress);
  if (address.error)
    return res.status(400).send(address.error.details[0].message);

  // user
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    // NewClient.password = hashedPwd;
  const NewUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: hashedPwd,
    phone_number: req.body.phone_number,
    account_type: req.body.account_type,
    terms_and_condition: req.body.terms_and_condition,
    address_id: "ref",
  };
  const user = UserSchema(NewUser);
  if (user.error) return res.status(400).send(user.error.details[0].message);

  let AddAddress = new AddressDetails(NewAddress);
  AddAddress = await AddAddress.save();

  const Myaddress_id = AddAddress._id;
  console.log("Myaddress_id" + Myaddress_id);

  NewUser.address_id = Myaddress_id.toString();

  let AddUser = new UserDetails(NewUser);
  AddUser = await AddUser.save();
  res.send(AddUser);

  // try{
  // 	new Fawn.Task()
  // 	.save('addresses',AddAddress)
  // 	.save('users',AddUser)
  // 	.run();

  // 	res.send(AddUser)

  // }
  // catch(ex){
  // 	res.status(500).send('Something failed.');
  // }
});

MyRouter.get("/getAll", async (req, res) => {
  console.log("user");

  const user = await UserDetails.find().populate({
    path: "address_id",
    populate: {
      path: "area_id",
      model: "area",
    },
  })

  // .select(' ');

  res.send(user);

 
});

MyRouter.get("/getOne/:id", async (req, res) => {
  const userId = req.params.id;

  const user = await UserDetails.findById(userId)
	.select ('-_id')
    .populate({
    path: "address_id",
	select: '-_id',
    populate: {
      path: "area_id",
      model: "area",
	select: '-_id area_name',

    },
  });

  res.send(user);
});

MyRouter.patch('/Update/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { first_name, last_name, password, phone_number, account_type,
    terms_and_condition,area_id,address } = req.body;


  try {
    password = await bcrypt.hash(password, 10);
    
      // Update User
      const updatedUser = await UserDetails.findByIdAndUpdate(userId,
         { first_name, last_name,password,phone_number,account_type,terms_and_condition }, { new: true });

         console.log("addressID"+updatedUser.address_id)
      // Update Address
      const updatedAddress = await AddressDetails.findByIdAndUpdate(updatedUser.address_id, {address}, { new: true });

     

      // Optionally, you can send the updated user object as the response
      // res.json({ user: updatedUser, address, area });
      res.json({ user: updatedUser, updatedAddress });


  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = MyRouter;
