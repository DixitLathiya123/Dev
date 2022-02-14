const mongoose = require("mongoose");
const { throwError } = require("../middleware/throwError");
const Order = require("../model/orderModal");
const Product = require("../model/productModal");

module.exports.createOrder = async (req, res, next) => {
  try {
    if (!req.body._id) {
      return next(throwError(500, "Please add product id."));
    }
    const findProduct = await Product.findOne({ _id: req.body._id });
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      user: req.user._id,
      product: req.body._id,
      name: findProduct.name,
      price: findProduct.price,
    });

    await order.save();
    await Product.updateOne({ _id: req.body._id },  {$push: {"ordered": req.user._id}},  { upsert: true })
    res.status(201).json({
      message: "Your Order Successfully.",
      data: order,
    });
  } catch (error) {
    console.log("error", error);
    return next(throwError(500, "Somthing want wrong."));
  }
};

module.exports.findYourOrder = async (req, res, next) => {
  try {
    const findProduct = await Order.find({
      user: req.user._id,
    });
    res.status(200).json({
      data: findProduct || [],
    });
  } catch (error) {
    return next(throwError(500, "Somthing want wrong."));
  }
};
