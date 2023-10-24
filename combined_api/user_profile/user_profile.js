const Express = require("express");
const MyRouter = Express.Router();

const UserDetails = require("../../Models/user/user");
const UserSchema = require("../../Schema/user/user");

const AddressDetails = require("../../Models/address/address");
const AddressSchema = require("../../Schema/address/address");

const AreaDetails= require("../../Models/area/area");
const AreaSchema= require("../../Schema/area/area");

MyRouter.post("/Add", async (req, res) => {
	const NewArea = req.body;
	console.log(NewArea)

	// const { area_error } = UserSchema(NewArea);
	// if (area_error) return res.status(400).send(area_error.details[0].message);

	// let NewArea = new areaDetailsDetails({ 
	// 	area: req.body.area,
	// 	area_id: req.body.area_id,
		
	//   });
	//   NewArea = await NewArea.save();

	// const { address_error } = UserSchema(NewClient);
	// if (address_error) return res.status(400).send(address_error.details[0].message);

	// let NewAddress = new AddressDetailsDetails({ 
	// 	address: req.body.address,
	// 	area_id: req.body.area_id,
		
	//   });
	//   NewAddress = await NewAddress.save();


	// const { error1 } = UserSchema(NewClient);
	// if (error1) return res.status(400).send(error1.details[0].message);

	// let NewClient = new UserDetails({ 
	// 	first_name: req.body.first_name,
	// 	last_name: req.body.last_name,
	// 	password: req.body.password,
	// 	phone_number: req.body.phone_number,
	// 	account_type: req.body.account_type,
	// 	terms_and_condition: req.body.terms_and_condition,
	// 	address_id: req.body.address_id,

	//   });
	//   NewClient = await NewClient.save();
  
	// if (error) {
	//   res.status(404).send({ message: error.details[0].message });
	// } 
	// else {
	  
	//   let AddClient = new UserDetails(NewClient);
	//   AddClient = await AddClient.save();
	//   res.send(AddClient);
	// }

  });

module.exports =  MyRouter;
