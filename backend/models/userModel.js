const mongoose = require("mongoose");
const Userdetails = require('./userdetailsModel')

const usersSchema = new mongoose.Schema({
  email: {
    type: String, required: true, minLength: 5, maxLength: 30,
  },
  password: {
    type: String, required: true, minLength: 5, maxLength: 30,
  },
  userType: {
    type: String, required: true, enum : ['admin','customer']
  },
  details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserDetails'
  }
});

const Users = mongoose.model("users", usersSchema);

module.exports.Users = Users;