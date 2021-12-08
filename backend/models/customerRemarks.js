const mongoose = require('mongoose');

const remarksSchema = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String, required:true},
    date: {type: String, required:true},
});

const Remarks = mongoose.model('CustomerRemarks',remarksSchema);

module.exports.Remarks = Remarks;