const mongoose = require('mongoose');



const UsersSchema = new mongoose.Schema({

 name: { type: String, required: true },

 password: { type: String, required: true },

 email: { type: String, required: true },

 created: { type: Date, required: true },
 
 updated: { type: Date, required: true }

});



module.exports = mongoose.model('Users', UsersSchema);