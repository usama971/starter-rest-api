const Express= require("express");
const MyRouter= Express.Router();

const AreaDetails= require("../../Models/area/area");
const AreaSchema= require("../../Schema/area/area");

MyRouter.get("/", async(req, res)=>{
	const allAreas = await AreaDetails.find();
	try{
		res.send(allAreas)
	}
	catch(err){
		res.send("Error" + err)
	}
});

MyRouter.post("/Add", async (req, res)=>{
	const NewArea= req.body ;
	const {error} = AreaSchema(NewArea);
	if(error){ 
	 console.log("kaho k error");
	 return res.status(400).send(error.details[0].message);
	}

	let AddArea= new AreaDetails(NewArea);
	AddArea= await AddArea.save();
	res.send(AddArea)
})

module.exports = MyRouter;