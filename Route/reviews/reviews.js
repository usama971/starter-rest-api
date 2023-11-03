const Express = require("express");
const MyRouter = Express.Router();

const Review = require("../../Models/user_review/user_review");
const ReviewSchema = require("../../Schema/user_review/user_review");

// const bcrypt = require('bcrypt');

//get All
MyRouter.get("/", async (req, res) => {
    const C = await Review.find();
    try {
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
});

//get all Reviews of one User Not in Param We have Client id
MyRouter.get("/GetOne", async (req, res) => {
    const C = await Review.find({ user_id: req.id })
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

//get Review with user_id and Order_id in We have Order_id in Params
MyRouter.get("/GetOrderReview/:id", async (req, res) => {
    const C = await Review.find({ user_id: req.id, ordered_id: req.params.id })
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

//get all Reviews Of One Order
MyRouter.get("/GetAllOrderReview/:id", async (req, res) => {
    const C = await Review.find({ordered_id: req.params.id })
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
    const NewReview = req.body;
    NewReview.user_id = req.id || "empty";

    const { error } = ReviewSchema(NewReview);
    // if (error) return res.status(400).send(error.details[0].message);

    if (error) {
        res.status(404).send({ message: error.details[0].message });
    }
    else {

        let AddReview = new Review(NewReview);
        AddReview = await AddReview.save();
        res.send(AddReview);
    }
});

MyRouter.patch("/Update/:id", async (req, res) => {
    const UpdateReview = await Review.findOne({ _id: req.params.id });
    // console.log(UpdateReview);
    // UpdateReview.Reviewt = req.body.Reviewt
    UpdateReview.rating_value = req.body.rating_value
    UpdateReview.comment = req.body.comment

    try {
        const C = await UpdateReview.save();
        res.send(C);
    } catch (err) {
        res.send("Error: " + err);
    }
});

//if User Deletes his Review
MyRouter.delete("/Delete/:id", async (req, res) => {
    const DeleteReview = Review.findOne({ _id: req.params.id });
    try {
        const C = await DeleteReview.remove();
        res.send(C);
    } catch (Error) {
        res.send("Error: " + Error);
    }
});

module.exports = MyRouter;
