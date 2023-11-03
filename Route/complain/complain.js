const Express = require("express");
const MyRouter = Express.Router();

const complain = require("../../Models/complaint/complaint");
const complainSchema = require("../../Schema/complaint/complaint");

// const bcrypt = require('bcrypt');

//get All
MyRouter.get("/", async (req, res) => {
    const C = await complain.find();
    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
});

//get all complains of one User Not in Param We have Client id
MyRouter.get("/GetOne", async (req, res) => {
    const C = await complain.find({ user_id: req.id })
        .populate([
            { path: "user_id", select: "first_name -_id last_name phone_number" }
        ])
        .populate([{
            path: "ordered_id",
            model: "product",
            // select: "delivery_type quantity total_cost"
        }]);

    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
});

//get complain with user_id and Order_id in We have Order_id in Params
MyRouter.get("/GetOrderComplain/:id", async (req, res) => {
    const C = await complain.find({ user_id: req.id, ordered_id: req.params.id })
        .populate([
            { path: "user_id", select: "first_name -_id last_name phone_number" }
        ])
        .populate([{
            path: "ordered_id",
            model: "product",
            // select: "delivery_type quantity total_cost"
        }]);

    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
});

//get all Complains Of One Order
MyRouter.get("/GetAllOrderComplain/:id", async (req, res) => {
    const C = await complain.find({ordered_id: req.params.id })
        .populate([
            { path: "user_id", select: "first_name -_id last_name phone_number" }
        ])
        .populate([{
            path: "ordered_id",
            model: "product",
            // select: "delivery_type quantity total_cost"
        }]);

    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
});

MyRouter.post("/Add", async (req, res) => {
    const NewProduct = req.body;
    NewProduct.user_id = req.id || "empty";

    const { error } = complainSchema(NewProduct);
    // if (error) return res.status(400).send(error.details[0].message);

    if (error) {
        res.status(404).send({ message: error.details[0].message });
    }
    else {

        let AddProduct = new complain(NewProduct);
        AddProduct = await AddProduct.save();
        res.send(AddProduct);
    }
});

MyRouter.patch("/Update/:id", async (req, res) => {
    const UpdateProduct = await complain.findOne({ _id: req.params.id });
    // console.log(UpdateProduct);
    UpdateProduct.complaint = req.body.complaint

    try {
        const C = await UpdateProduct.save();
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
});

//if User Deletes his complain
MyRouter.delete("/Delete/:id", async (req, res) => {
    const DeleteComplain = complain.findOne({ _id: req.params.id });
    try {
        const C = await DeleteComplain.remove();
        res.send(C);
    } catch (Error) {
        res.send("Error: " + Error);
    }
});

module.exports = MyRouter;
