const RiderDetails = require("../../Models/rider/rider");
const RiderSchema = require("../../Schema/rider/rider");

const AddressDetails = require("../../Models/address/address");
const AddressSchema = require("../../Schema/address/address");

const AreaDetails = require("../../Models/area/area");
const AreaSchema = require("../../Schema/area/area");

const mongoose = require("mongoose");
// var Fawn = require("fawn");

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

  // rider
  const NewRider = {
    name: req.body.name,
    age: req.body.age,
    national_id_card: req.body.national_id_card,
    national_license: req.body.national_license,
    phone_number: req.body.phone_number,
    address_id: "ref",
  };
  const rider = RiderSchema(NewRider);
  if (rider.error) return res.status(400).send(rider.error.details[0].message);

  let AddAddress = new AddressDetails(NewAddress);
  AddAddress = await AddAddress.save();
  console.log("address added successfully");
  const Myaddress_id = AddAddress._id;
  console.log("Myaddress_id" + Myaddress_id);

  NewRider.address_id = Myaddress_id.toString();

  let AddRider = new RiderDetails(NewRider);
  AddRider = await AddRider.save();

  console.log("rider added successfully");

  res.send(AddRider);

  // try{
  // 	new Fawn.Task()
  // 	.save('addresses',AddAddress)
  // 	.save('riders',AddRider)
  // 	.run();

  // 	res.send(AddRider)

  // }
  // catch(ex){
  // 	res.status(500).send('Something failed.');
  // }
});

MyRouter.get("/getAll", async (req, res) => {
  console.log("rider");

  const rider = await RiderDetails.find().populate({
    path: "address_id",
    populate: {
      path: "area_id",
      model: "area",
    },
  });

  // .select(' ');

  res.send(rider);
});

MyRouter.get("/getOne/:id", async (req, res) => {
  const riderId = req.params.id;

  const rider = await RiderDetails.findById(riderId)
    .select("-_id")
    .populate({
      path: "address_id",
      select: "-_id",
      populate: {
        path: "area_id",
        model: "area",
        select: "-_id area_name",
      },
    });

  res.send(rider);
});

MyRouter.patch("/Update/:riderId", async (req, res) => {
  const riderId = req.params.riderId;
  // const { ridername, email, addressData, areaData, streetData } = req.body;
  const {
    name,
    age,
    national_id_card,
    national_license,
    phone_number,
    area_id,
    address,
  } = req.body;

  try {
    // Update Rider
    const updatedRider = await RiderDetails.findByIdAndUpdate(
      riderId,
      { name, age, national_id_card, national_license, phone_number },
      { new: true }
    );

    console.log("addressID" + updatedRider.address_id);
    // Update Address
    const updatedAddress = await AddressDetails.findByIdAndUpdate(
      updatedRider.address_id,
      { address },
      { new: true }
    );

    // Optionally, you can send the updated rider object as the response
    // res.json({ rider: updatedRider, address, area });
    res.json({ rider: updatedRider, updatedAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = MyRouter;
