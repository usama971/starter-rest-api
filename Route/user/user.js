const Express = require("express");
const MyRouter = Express.Router();

const UserDetails = require("../../Models/user/user");
const UserSchema = require("../../Schema/user/user");

MyRouter.get("/", async (req, res) => {
  const C = await UserDetails.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const NewClient = req.body;
  const { error } = UserSchema(NewClient);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {
    
    let AddClient = new UserDetails(NewClient);
    AddClient = await AddClient.save();
    res.send(AddClient);
  }
});

MyRouter.patch("/Update/:Email", async (req, res) => {
  const UpdateClient = await UserDetails.findOne({ Email: req.params.Email });
  (UpdateClient.first_name = req.body.first_name),
    (UpdateClient.last_name = req.body.last_name),
    (UpdateClient.password = req.body.password),
    (UpdateClient.phone_number = req.body.phone_number),
    (UpdateClient.account_type = req.body.account_type),
    (UpdateClient.terms_and_condition = req.body.terms_and_condition)


  try {
    const C = await UpdateClient.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:Email", async (req, res) => {
  const DeleteClient = UserDetails.findOne({ Email: req.params.Email });
  try {
    const C = await DeleteClient.remove();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});

module.exports = MyRouter;
