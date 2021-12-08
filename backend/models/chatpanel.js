
const mongoose = require('mongoose');

const chatPanelSchema = new mongoose.Schema({
    persons: { type: String, required: true },
    message: { type: Array, required: true },
})

const Chat = mongoose.model('Chat',chatPanelSchema);

module.exports.Chat = Chat;