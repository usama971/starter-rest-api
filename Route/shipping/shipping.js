const Express= require("express");
const MyRouter= Express.Router();

const ShippingDetails= require("../../Models/shipping/shipping");
const ShippingSchema= require("../../Schema/shipping/shipping");

MyRouter.get("/", async(req, res)=>{
	const allShippings = await ShippingDetails.find();
	try{
		res.send(allShippings)
	}
	catch(err){
		res.send("Error" + err)
	}
});

MyRouter.post("/Add", async (req, res)=>{
	const NewShipping= req.body ;
	// console.log(req.body)
	const {error} = ShippingSchema(NewShipping);
	if(error){ 
	 console.log("kaho k error");
	 return res.status(400).send(error.details[0].message);
	}

	let AddShipping= new ShippingDetails(NewShipping);
	AddShipping= await AddShipping.save();
	res.send(AddShipping)
})


MyRouter.patch('/Update/:id', async (req, res) => {
	const { error } = ShippingSchema(req.body); 
	if (error) return res.status(400).send(error.details[0].message);
  
	const shipping = await ShippingDetails.findByIdAndUpdate(req.params.id,
	  { 
		shipping_type: req.body.shipping_type,
		price: req.body.price,
	  }, { new: true });
  
	if (!shipping) return res.status(404).send('The shipping with the given ID was not found.');
	
	res.send(shipping);
  });

  MyRouter.patch('/Update/soft_delete/:id', async (req, res) => {
	const { error } = ShippingSchema(req.body); 
	if (error) return res.status(400).send(error.details[0].message);
  
	const shipping = await ShippingDetails.findByIdAndUpdate(req.params.id,
	  { 
		soft_delete: true
	  }, { new: true });
  
	if (!shipping) return res.status(404).send('The shipping with the given ID was not found.');
	
	res.send(shipping);
  });


  MyRouter.delete('/delete/:id', async (req, res) => {
	const shipping = await ShippingDetails.findByIdAndRemove(req.params.id);
  
	if (!shipping) return res.status(404).send('The shipping with the given ID was not found.');
  
	res.send(shipping);
  });

module.exports = MyRouter;