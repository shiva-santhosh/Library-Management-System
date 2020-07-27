const mongoose = require('mongoose') ;
const Row = require('./row.js') ;
const Tower = require('./tower.js')

var shelfSchema = new mongoose.Schema({
	
	No : Number,
	row :{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Row'
	} ,
	tower :{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Tower'
	}

})

var Shelf = mongoose.model('shelf',shelfSchema)

module.exports = Shelf