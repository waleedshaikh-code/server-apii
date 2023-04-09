const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    email: {
        type: String,

        unique: true
    },
    phone: {
        type: String,
    },
    nic: {
        type: String,
    }
});


module.exports = mongoose.model('Profile', profileSchema);


