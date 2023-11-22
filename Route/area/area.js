const Express= require("express");
const MyRouter= Express.Router();

const AreaDetails= require("../../Models/area/area");
const AreaSchema= require("../../Schema/area/area");

MyRouter.get("/", async(req, res)=>{
	const allAreas = await AreaDetails.find();
	try{
		res.send("allAreas")
	}
	catch(err){
		res.send("Error" + err)
	}
});

MyRouter.post("/Add", async (req, res)=>{
	const NewArea= req.body ;
	const {error} = AreaSchema(NewArea);
	if(error){ 
	 return res.status(400).send(error.details[0].message);
	}

	const myArea = await AreaDetails.findOne({area_name: req.body.area_name});
	if(myArea) return res.status(400).send("area already exist.");

	let AddArea= new AreaDetails(NewArea);
	AddArea= await AddArea.save();
	res.send(AddArea)
})

module.exports = MyRouter;