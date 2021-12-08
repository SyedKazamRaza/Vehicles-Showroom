
const mongoose = require('mongoose');

const userdetailSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength:5, maxlength:20 },
    address: { type: String, required: true, minLength:5, maxlength:20 },
    phone: { type: String, required: true, minLength:11, maxlength:11}
})

const Userdetails = mongoose.model('UserDetails',userdetailSchema);

module.exports.userDetails = Userdetails;