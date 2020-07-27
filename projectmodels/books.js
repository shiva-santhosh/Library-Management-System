const mongoose = require('mongoose');

const bookSchema= new mongoose.Schema({

	Name  : String ,
	Description : String ,
	Author: String,
	ISBN : String,
	NoOfPages: Number,
	Edition : String,
	Publisher : String,
	},
	{
    timestamps: true
});


const Books = mongoose.model("books",bookSchema);

module.exports = Books