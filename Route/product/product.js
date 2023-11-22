const Express = require("express");
const MyRouter = Express.Router();

const productDetails = require("../../Models/product/product");
const productSchema = require("../../Schema/product/product");

// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  const C = await productDetails.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const NewProduct = req.body;
  const { error } = productSchema(NewProduct);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {

    const myProduct = await productDetails.findOne({name: req.body.name});
    if(myProduct) return res.status(400).send("Product is already exist");

    let AddProduct = new productDetails(NewProduct);
    AddProduct = await AddProduct.save();
    res.send(AddProduct);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const UpdateProduct = await productDetails.findOne({ _id: req.params.id });
  // console.log(UpdateProduct);
    UpdateProduct.name = req.body.name
    UpdateProduct.description = req.body.description
    UpdateProduct.price = req.body.price

  try {
    const C = await UpdateProduct.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  const DeleteProduct = productDetails.findOne({ _id: req.params.id });
  try {
    const C = await DeleteProduct.remove();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
