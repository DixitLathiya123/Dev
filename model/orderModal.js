const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: String,
    product: String,
    name: String,
    price: Number,
});

module.exports = mongoose.model('Order', orderSchema);