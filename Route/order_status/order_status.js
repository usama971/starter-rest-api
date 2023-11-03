const Express = require("express");
const MyRouter = Express.Router();

const orderStatus = require("../../Models/order_status/order_status");
const orderSchema = require("../../Schema/order_status/order_status");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  const C = await orderStatus.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const NewProduct = req.body;
  const { error } = orderSchema(NewProduct);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {
    let AddProduct = new orderStatus(NewProduct);
    AddProduct = await AddProduct.save();
    res.send(AddProduct);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const UpdateProduct = await orderStatus.findOne({ _id: req.params.id });
  // console.log(UpdateProduct);
    UpdateProduct.status = req.body.status

  try {
    const C = await UpdateProduct.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  const DeleteProduct = orderStatus.findOne({ _id: req.params.id });
  try {
    const C = await DeleteProduct.remove();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
