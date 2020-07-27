const mongoose = require('mongoose') ;
const Shelf = require('./shelf.js') ;
const Books = require('./books.js') ;

const bookShelfMapSchema = new mongoose.Schema({
	
	Book :{
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
	},
	shelf : {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelf'
	}

})

const  BookShelfMap = mongoose.model('bookshelfmap',bookShelfMapSchema)

module.exports =  BookShelfMap
