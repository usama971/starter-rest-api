const ShopDetails = require("../../Models/shop/shop");
const ShopSchema = require("../../Schema/shop/shop");

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

  // shop
    // const hashedPwd = await bcrypt.hash(req.body.password, 10);
    // NewClient.password = hashedPwd;
  const NewShop = {
    name: req.body.name,
    phone_number: req.body.phone_number,
    address_id: "ref",
  };
  const shop = ShopSchema(NewShop);
  if (shop.error) return res.status(400).send(shop.error.details[0].message);

  let AddAddress = new AddressDetails(NewAddress);
  AddAddress = await AddAddress.save();

  const Myaddress_id = AddAddress._id;
  console.log("Myaddress_id" + Myaddress_id);

  NewShop.address_id = Myaddress_id.toString();

  let AddShop = new ShopDetails(NewShop);
  AddShop = await AddShop.save();
  res.send(AddShop);

  // try{
  // 	new Fawn.Task()
  // 	.save('addresses',AddAddress)
  // 	.save('shops',AddShop)
  // 	.run();

  // 	res.send(AddShop)

  // }
  // catch(ex){
  // 	res.status(500).send('Something failed.');
  // }
});

MyRouter.get("/getAll", async (req, res) => {
  console.log("shop");

  const shop = await ShopDetails.find().populate({
    path: "address_id",
    populate: {
      path: "area_id",
      model: "area",
    },
  })

  // .select(' ');

  res.send(shop);

 
});

MyRouter.get("/getOne/:id", async (req, res) => {
  const shopId = req.params.id;

  const shop = await ShopDetails.findById(shopId)
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

  res.send(shop);
});

MyRouter.patch('/Update/:shopId', async (req, res) => {
  const shopId = req.params.shopId;
  const { name, phone_number,area_id,address } = req.body;


  try {
    // password = await bcrypt.hash(password, 10);
    
      // Update Shop
      const updatedShop = await ShopDetails.findByIdAndUpdate(shopId,
         { name,phone_number }, { new: true });

         console.log("addressID"+updatedShop.address_id)
      // Update Address
      const updatedAddress = await AddressDetails.findByIdAndUpdate(updatedShop.address_id, {address,area_id}, { new: true });

     

      // Optionally, you can send the updated shop object as the response
      // res.json({ shop: updatedShop, address, area });
      res.json({ shop: updatedShop, updatedAddress });


  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = MyRouter;
