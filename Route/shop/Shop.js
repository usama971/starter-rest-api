const Express = require("express");
const MyRouter = Express.Router();

const ShopDetails = require("../../Models/shop/shop");
const ShopSchema = require("../../Schema/shop/shop");

MyRouter.get("/", async (req, res) => {
  const C = await ShopDetails.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const NewShop = req.body;
  const { error } = ShopSchema(NewShop);
  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } else {
    let AddShop = new ShopDetails(NewShop);
    AddShop = await AddShop.save();
    res.send(AddShop);
  }
});

MyRouter.patch("/Update/:Email", async (req, res) => {
  const UpdateShop = await ShopDetails.findOne({ Email: req.params.Email });
  (UpdateShop.name = req.body.name)


  try {
    const C = await UpdateShop.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:Email", async (req, res) => {
  const DeleteShop = ShopDetails.findOne({ Email: req.params.Email });
  try {
    const C = await DeleteShop.remove();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
