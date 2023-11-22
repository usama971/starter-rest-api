const OrderDetails = require("../../Models/order_list/order_list");
const OrderSchema = require("../../Schema/order_list/order_list");


const mongoose = require("mongoose");
// var Fawn = require("fawn");
// const bcrypt = require('bcrypt');

const Express = require("express");
const MyRouter = Express.Router();

//  Fawn.init(mongoose)
MyRouter.post("/Add", async (req, res)=>{
  console.log(req.body)
	const NewOrder= req.body ;
	const {error} = OrderSchema(NewOrder);
	if(error){ 
	 console.log("kaho k error");
	 return res.status(400).send(error.details[0].message);
	}
console.log("NewOrder", NewOrder)
	let AddOrder= new OrderDetails(NewOrder);
	AddOrder= await AddOrder.save();
	res.send(AddOrder)
})



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

MyRouter.patch('/Update/:id', async (req, res) => {
	const { error } = OrderSchema(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

  const {pickup_time,shipping_time,delivery_type,quantity,total_cost,user_id,shop_id,product_id,service_id,
    order_status_id,shipping_id}=req.body;
  
	const orderList = await OrderDetails.findByIdAndUpdate(req.params.id,
	  { 
      pickup_time,shipping_time,delivery_type,quantity,total_cost,user_id,shop_id,product_id,service_id,
      order_status_id,shipping_id
	  }, { new: true });
  
	if (!orderList) return res.status(404).send('The shipping with the given ID was not found.');
	
	res.send(orderList);
  });

  MyRouter.get("/getAll", async (req, res) => {
    console.log("all orders");
  
    const order = await OrderDetails.find()
    .select ('-_id')
    .populate({
      path: "user_id",
      // select:'-_id',

      populate: {
        path: "address_id",
        select:'-_id',

        populate: {
          path: "area_id",
          model: "area",
          select:'-_id'
        },
      }, 
    })
    .populate({
      path:'shop_id',
      select: '-_id ',
      populate: {
        path: "address_id",
        select:'-_id',

        populate: {
          path: "area_id",
          model: "area",
          select:'-_id'
        },
      }, 
    })
 // .populate({
    //   path:'product_id',
    //   select: '-_id '
    // })
    .populate({
      path:'service_id',
    select:'-_id'
    })
    // .populate({
    //   path:'order_status_id',
    //   select: '-_id '
    // })
    .populate({
      path:'shipping_id',
      select: '-_id '
    })
  
  
    res.send(order);
  
   
  });

  MyRouter.get("/getOneOrder/:orderId", async (req, res) => {
    console.log("all orders");
  
    const order = await OrderDetails.findOne({_id: req.params.orderId})
    .select ('-_id')
    .populate({
      path: "user_id",
      select:'-_id',

      populate: {
        path: "address_id",
        select:'-_id',

        populate: {
          path: "area_id",
          model: "area",
          select:'-_id'
        },
      }, 
    })
    .populate({
      path:'shop_id',
      select: '-_id ',
      populate: {
        path: "address_id",
        select:'-_id',

        populate: {
          path: "area_id",
          model: "area",
          select:'-_id'
        },
      }, 
    })
 // .populate({
    //   path:'product_id',
    //   select: '-_id '
    // })
    .populate({
      path:'service_id',
    select:'-_id'
    })
    // .populate({
    //   path:'order_status_id',
    //   select: '-_id '
    // })
    .populate({
      path:'shipping_id',
      select: '-_id '
    })
  
  
    res.send(order);
  
   
  });

  MyRouter.get("/getUser/:userId", async (req, res) => {
    console.log("all orders");
  
    const order = await OrderDetails.find({user_id: req.params.userId})
    .select ('-_id')
    .populate({
      path: "user_id",
      select:'-_id',

      populate: {
        path: "address_id",
        select:'-_id',

        populate: {
          path: "area_id",
          model: "area",
          select:'-_id'
        },
      }, 
    })
    .populate({
      path:'shop_id',
      select: '-_id ',
      populate: {
        path: "address_id",
        select:'-_id',

        populate: {
          path: "area_id",
          model: "area",
          select:'-_id'
        },
      }, 
    })
 // .populate({
    //   path:'product_id',
    //   select: '-_id '
    // })
    .populate({
      path:'service_id',
    select:'-_id'
    })
    // .populate({
    //   path:'order_status_id',
    //   select: '-_id '
    // })
    .populate({
      path:'shipping_id',
      select: '-_id '
    })
  
  
    res.send(order);
  
   
  });

  MyRouter.get("/getShop/:shopId", async (req, res) => {
    console.log("all orders");
  
    const order = await OrderDetails.find({shop_id: req.params.shopId})
    .select ('-_id')
    .populate({
      path: "user_id",
      select:'-_id',

      populate: {
        path: "address_id",
        select:'-_id',

        populate: {
          path: "area_id",
          model: "area",
          select:'-_id'
        },
      }, 
    })
    .populate({
      path:'shop_id',
      select: '-_id ',
      populate: {
        path: "address_id",
        select:'-_id',

        populate: {
          path: "area_id",
          model: "area",
          select:'-_id'
        },
      }, 
    })
 // .populate({
    //   path:'product_id',
    //   select: '-_id '
    // })
    .populate({
      path:'service_id',
    select:'-_id'
    })
    // .populate({
    //   path:'order_status_id',
    //   select: '-_id '
    // })
    .populate({
      path:'shipping_id',
      select: '-_id '
    })
  
  
    res.send(order);
  
   
  });

  MyRouter.get("/getRider/:riderId", async (req, res) => {
    console.log("all orders");
  
    const order = await OrderDetails.find({rider_id: req.params.riderId})
    .select ('-_id')
    .populate({
      path: "user_id",
      select:'-_id',

      populate: {
        path: "address_id",
        select:'-_id',

        populate: {
          path: "area_id",
          model: "area",
          select:'-_id'
        },
      }, 
    })
    .populate({
      path:'shop_id',
      select: '-_id ',
      populate: {
        path: "address_id",
        select:'-_id',

        populate: {
          path: "area_id",
          model: "area",
          select:'-_id'
        },
      }, 
    })
 // .populate({
    //   path:'product_id',
    //   select: '-_id '
    // })
    .populate({
      path:'service_id',
    select:'-_id'
    })
    // .populate({
    //   path:'order_status_id',
    //   select: '-_id '
    // })
    .populate({
      path:'shipping_id',
      select: '-_id '
    })
  
  
    res.send(order);
  
   
  });

  MyRouter.get("/", async(req, res)=>{
    const allOrders = await OrderDetails.find();
    try{
      res.send(allOrders)
    }
    catch(err){
      res.send("Error" + err)
    }
  });


module.exports = MyRouter;
