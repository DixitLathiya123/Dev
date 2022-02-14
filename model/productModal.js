const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    user: String,
    ordered: [{
        type: mongoose.Schema.Types.ObjectId
    }]
});

module.exports = mongoose.model('Product', productSchema);