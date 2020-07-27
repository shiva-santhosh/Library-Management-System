const mongoose = require('mongoose');
const express = require('express') ;
const winston = require('winston') ;
const util = require('util') ;
const winstonFastRabbitMq = require('winston-fast-rabbitmq') ;
const format = winston.format ;
const router = express.Router();
const Books = require('../projectmodels/books.js') ;

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

router.get('', (req,res) => {

	Books.find({}).sort({createdAt : -1}).limit(100
	).then((data)=>{ 
		res.send(data)
		data = JSON.stringify(data)
		data = JSON.parse(data)
		logger.info(`Books info request is made using the api :: ${util.inspect(data,{  depth: null })}`);
	}).catch((err)=> {
		let errData = {} ;
		errData.Success = false ;
		errData.Error = err.toString() ;
		logger.error(`Error occured in processing the books collection :: ${util.inspect(errData,{  depth: null })}`)
	})

}) 

router.get('/:id', (req,res) => {

	Books.findById(req.params.id
	).then((data)=>{
		res.json(data)
		data = JSON.stringify(data)
		data = JSON.parse(data)
		logger.info(`Book info request of certain id is made using the api :: ${util.inspect(data,{ depth: null })}`);
	}).catch((err)=>{
		let errData = {} ;
		errData.Success = false ;
		errData.Error = err.toString() ;
		logger.error(`Error occured in processing a book in books collection ::  ${util.inspect(errData,{ depth: null })}`)
	})

})

router.post('' , (req ,res) =>{

	var Book=new Books({
		Name  : req.body.name ,
		Description : req.body.description ,
		Author: req.body.author,
		ISBN : req.body.ISBN,
		NoOfPages: req.body.pages,
		Edition : req.body.edition,
		Publisher : req.body.publisher,
	})
	
	Book.save().then((data)=>{
		res.send(data) 
		data = JSON.stringify(data)
		data = JSON.parse(data)
		logger.info(`A book info is added using the api :: ${util.inspect(data,{  depth: null })}`)
	}) .catch ((err) => {
		let errData = {} ;
		errData.Success = false ;
		errData.Error = err.toString() ;
		logger.error(`Error occured in posting the book in book collection ::${util.inspect(errData,{ depth: null })}`)
	})

})

router.delete('/:id' , (req,res) => {

	Books.findByIdAndDelete(req.params.id
	).then((data)=>{
		res.json(data)
		data = JSON.stringify(data)
		data = JSON.parse(data)
		logger.info(`Book info of certain id is deleted using the api :: ${util.inspect(data,{  depth: null })}`)
	}).catch((err)=> {
		let errData = {} ;
		errData.Success = false ;
		errData.Error = err.toString() ;
		logger.error(`Error occured in deleting the book collection ::${util.inspect(errData,{ depth: null })}`)
	});

})

module.exports = router





