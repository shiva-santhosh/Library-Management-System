//UsersSchema is declared here and the model is exported
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

	mobile : String },
	{
    timestamps: true

});

var Users = mongoose.model("Users",userSchema);

module.exports = Users