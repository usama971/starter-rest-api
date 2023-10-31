const Express= require("express");
const MyRouter= Express.Router();

const ServiceDetails= require("../../Models/service/service");
const ServiceSchema= require("../../Schema/service/service");

MyRouter.get("/", async(req, res)=>{
	const allServices = await ServiceDetails.find();
	try{
		res.send(allServices)
	}
	catch(err){
		res.send("Error" + err)
	}
});

MyRouter.post("/Add", async (req, res)=>{
	const NewService= req.body ;
	// console.log(req.body)
	const {error} = ServiceSchema(NewService);
	if(error){ 
	 console.log("kaho k error");
	 return res.status(400).send(error.details[0].message);
	}

	let AddService= new ServiceDetails(NewService);
	AddService= await AddService.save();
	res.send(AddService)
})


MyRouter.patch('/Update/:id', async (req, res) => {
	const { error } = ServiceSchema(req.body); 
	if (error) return res.status(400).send(error.details[0].message);
  
	const service = await ServiceDetails.findByIdAndUpdate(req.params.id,
	  { 
		service_option: req.body.service_option,
		price: req.body.price
	  }, { new: true });
  
	if (!service) return res.status(404).send('The service with the given ID was not found.');
	
	res.send(service);
  });


  MyRouter.delete('/delete/:id', async (req, res) => {
	const service = await ServiceDetails.findByIdAndRemove(req.params.id);
  
	if (!service) return res.status(404).send('The service with the given ID was not found.');
  
	res.send(service);
  });

module.exports = MyRouter;