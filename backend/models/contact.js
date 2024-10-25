const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, 
    email: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
