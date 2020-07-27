const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

	Phone : String,
	Name : String ,
	Email : String
	},
	{
	timestamp : true 
})

const UsersInfo = mongoose.model("userinfo",userSchema);

module.exports = UsersInfo