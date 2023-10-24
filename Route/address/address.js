const Express = require("express");
const MyRouter = Express.Router();

const AddressDetails = require("../../Models/address/address");
const AddressSchema = require("../../Schema/address/address");


MyRouter.get("/get", async(req,res)=>{
let AllAddress= await AddressDetails.find();
try{
	res.send(AllAddress)
}
catch(err){
res.send("Error"+ err)
}
})


MyRouter.post("/Add", async(req,res)=>{
	let NewAddress= req.body;
	const {error} = AddressSchema(NewAddress);
	if(error) return res.status(400).send(error.details[0].message);

	let addAddress= new AddressDetails(NewAddress)
	addAddress= await addAddress.save();
	res.send(addAddress);
})

module.exports =  MyRouter;