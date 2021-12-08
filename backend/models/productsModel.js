const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {type: String, required:true},
    company: {type: String, required:true},
    vehicleNumber: {type: String, required:true},
    category: {type: String, required : true, enum: ['motorbike','Car','Van','Bus'] },
    modelYear: {type: String, required:true},
    price: {type: Number, required:true},
});

const Products = mongoose.model('products',productsSchema);

module.exports.Products = Products;