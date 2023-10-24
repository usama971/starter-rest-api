

const UserDetails = require("../../Models/user/user");
const UserSchema = require("../../Schema/user/user");

const AddressDetails = require("../../Models/address/address");
const AddressSchema = require("../../Schema/address/address");

const AreaDetails= require("../../Models/area/area");
const AreaSchema= require("../../Schema/area/area");

const mongoose = require("mongoose");
var Fawn = require("fawn");

const Express = require("express");
const MyRouter = Express.Router();

//  Fawn.init(mongoose)
MyRouter.post("/Add", async (req, res) => {
	// const NewArea = req.body;
	// console.log(NewArea);

	// const NewArea = {
	// 	area_name: req.body.area_name
	// }
	// const  area  = AreaSchema(NewArea);
	// if (area.error) return res.status(400).send(area.error.details[0].message);

	// let AddArea= new AreaDetails(NewArea);
	// AddArea= await AddArea.save();
	// // res.send(AddArea)

	// address
	const NewAddress = {
		address: req.body.address,
		area_id: req.body.area_id
	}
	const  address  = AddressSchema(NewAddress);
	if (address.error) return res.status(400).send(address.error.details[0].message);
	
	// let AddAddress= new AddressDetails(NewAddress);
	// AddAddress= await AddAddress.save();
	// res.send(AddAddress)
    // console.log(AddAddress)


	// user
	const NewUser = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		password: req.body.password,
		phone_number: req.body.phone_number,
		account_type: req.body.account_type,
		terms_and_condition: req.body.terms_and_condition,
		address_id: "ref",
	}
	const  user  = UserSchema(NewUser);
	if (user.error) return res.status(400).send(user.error.details[0].message);
	
	
	let AddAddress= new AddressDetails(NewAddress);
	AddAddress= await AddAddress.save();
	
	const Myaddress_id= AddAddress._id ;
    console.log("Myaddress_id" +Myaddress_id)

	NewUser.address_id= Myaddress_id.toString();

	let AddUser= new UserDetails(NewUser);
	AddUser= await AddUser.save();
	res.send(AddUser)

	
	
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


  MyRouter.get("/get/:phone", async(req,res)=>{
	const customer = await Customer.findById(req.params.id);

	let MyUser= await AddressDetails.find();
	res.send(AllAddress)

	let AllAddress= await AddressDetails.find();
	res.send(AllAddress)




	// try{
	// 	res.send(AllAddress)
	// }
	// catch(err){
	// res.send("Error"+ err)
	// }
	})

module.exports =  MyRouter;
