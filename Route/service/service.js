const Express= require("express");
const MyRouter= Express.Router();

const ServiceDetails= require("../../Models/service/service");
const ServiceSchema= require("../../Schema/service/service");

// const  ROLES_LIST= require('../../config/roles')
// const  verifyRoles= require('../../middleWare/verifyRoles') 

MyRouter.get("/",  async(req, res)=>{
	const allServices = await ServiceDetails.find();
	try{
		res.send(allServices)
	}
	catch(err){
		res.send("Error" + err)
	}
});

// pagination
// const pageNumber= 2;
// const pageSize= 10;

// MyRouter.get("/pagination/:pageNumber/:pageSize",  async(req, res)=>{
// 	let {pageNumber, pageSize}= req.params;
// 	const allServices = await ServiceDetails.find()
// 	.skip((pageNumber - 1) * pageSize)
// 	  .limit(pageSize)
// 	try{
// 		res.send(allServices)
// 	}
// 	catch(err){
// 		res.send("Error" + err)
// 	}
// });


MyRouter.get("/pagination/:pageNumber/:pageSize", async (req, res) => {
	try {
	  let { pageNumber, pageSize } = req.params;
	  pageNumber = parseInt(pageNumber);
	  pageSize = parseInt(pageSize);
  
	  // Ensure page number and page size are valid numbers
	  if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 1 || pageSize < 1) {
		return res.status(400).json({ error: 'Invalid page number or page size' });
	  }
  
	  const allServices = await ServiceDetails.find()
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize);
  
	  res.json({
		currentPage: pageNumber,
		pageSize: pageSize,
		totalItems: await ServiceDetails.countDocuments(),
		totalPages: Math.ceil(await ServiceDetails.countDocuments() / pageSize),
		data: allServices
	  });
	} catch (err) {
	  console.error("Error:", err);
	  res.status(500).json({ error: 'Internal server error' });
	}
  });



MyRouter.post("/Add", async (req, res)=>{
	return res.send(" mai aa gya hun AddService")

	const NewService= req.body ;
	// console.log(req.body)
	const {error} = ServiceSchema(NewService);
	if(error){ 
	 console.log("kaho k error");
	 return res.status(400).send(error.details[0].message);
	}
	const myService = await ServiceDetails.findOne({service_option: req.body.service_option});
	if(myService) return res.status(400).send("service already exist");

	let AddService= new ServiceDetails(NewService);
	AddService= await AddService.save();
	res.send(AddService)
})


// MyRouter.patch('/Update/:id', verifyRoles(ROLES_LIST.SuperAdmin),async (req, res) => {
// 	const { error } = ServiceSchema(req.body); 
// 	if (error) return res.status(400).send(error.details[0].message);
  
// 	const service = await ServiceDetails.findByIdAndUpdate(req.params.id,
// 	  { 
// 		service_option: req.body.service_option,
// 		price: req.body.price
// 	  }, { new: true });
  
// 	if (!service) return res.status(404).send('The service with the given ID was not found.');
	
// 	res.send(service);
//   });


//   MyRouter.delete('/delete/:id', verifyRoles(ROLES_LIST.SuperAdmin), async (req, res) => {
// 	const service = await ServiceDetails.findByIdAndRemove(req.params.id);
  
// 	if (!service) return res.status(404).send('The service with the given ID was not found.');
  
// 	res.send(service);
//   });

module.exports = MyRouter;