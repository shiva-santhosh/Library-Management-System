const mongoose = require('mongoose');
const express = require('express') ;
const winston = require('winston') ;
const util = require('util') ;
const winstonFastRabbitMq = require('winston-fast-rabbitmq') ;
const format = winston.format ;
const router = express.Router();
const Shelf = require('../projectmodels/shelf.js') ;
const BookShelfMap = require('../projectmodels/bookShelfMap.js')
const Books = require('../projectmodels/books.js') ;
const async = require('async') ;

const myFormat = format.printf(({ level, message,timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const formatter = function(options){
    return JSON.stringify({ message : options.meta.message });
};

const logger = new (winston.createLogger)({

	level: 'info',
	format: format.combine(winston.format.json(),
				winston.format.timestamp(),
				myFormat
				),
	transports: [
    		new winstonFastRabbitMq({formatter , exchangeType : 'direct' , exchangeName : 'loggs' }),
    		new winston.transports.Console()
  			]
})

router.post('' , async (req,res) => {

	try{

		const shelfId = mongoose.Types.ObjectId(req.body.shelfid) 
		const bookId = mongoose.Types.ObjectId(req.body.bookid)
		const valid1 = await Books.find({ _id : bookId })
		const valid2 = await Shelf.find({ _id : shelfId  })

		if(valid1.length != 0 && valid2.length != 0){

			const bookshelfmap1=new BookShelfMap({
				shelf: shelfId,
				Book : bookId 
			})

			bookshelfmap1.save().then((data)=>{
				res.send(data)
				data = JSON.stringify(data)
				data = JSON.parse(data)
				logger.info(`A book of certain id is added on the shelf using api :: ${util.inspect(data,{  depth: null })} `)
			}).catch((err)=>{
				logger.error(`Error occured in posting bookshelfmap :: ${err}`)
			})

		}
		else{
			let errData = {} ;
			errData.Success = false ;
			errData.Error = "BookId or ShelfId is not valid"  ;
			logger.error(`Error occured in posting bookshelfmap :: ${util.inspect(errData,{  depth: null })}`)
		}
	}
	catch(error){

			let errData = {} ;
			errData.Success = false ;
			errData.Error = error.toString()  ;
			logger.error(`Error occured in posting bookshelfmap :: ${util.inspect(errData,{  depth: null })}`)
	}

})

module.exports = router







