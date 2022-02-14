const mongoose= require('mongoose');
const { throwError } = require("../middleware/throwError");
const Product = require("../model/productModal");

module.exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        user: req.user._id
      });
      await product.save()
      res.status(201).json({
        message: "Your Product Add Successfully.",
        data: product,
      });
        
  } catch (error) {
      console.log("error",error)
    return next(throwError(500, "Somthing want wrong."));
  }
};

module.exports.getProduct = async (req, res, next) => {
    try {
                const getAll = await Product.find()
                res.status(200).json({
                    data: getAll,
                  });
                   
      } catch (error) {
          console.log("error",error)
        return next(throwError(500, "Somthing want wrong."));
      }

}