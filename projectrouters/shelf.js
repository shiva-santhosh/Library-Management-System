const mongoose = require('mongoose');
const express = require('express') ;
const winston = require('winston') ;
const util = require('util') ;
const winstonFastRabbitMq = require('winston-fast-rabbitmq') ;
const format = winston.format ;
const router = express.Router();
const Shelf = require('../projectmodels/shelf.js') ;

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

router.post('',(req,res) => {
	
	let shelf1 = new Shelf({
		No : req.body.num ,
		row : mongoose.Types.ObjectId(req.body.rowid) ,
		tower : mongoose.Types.ObjectId(req.body.towerid) 
	})

	shelf1.save().then((data)=>{
		res.send(data)
		data = JSON.stringify(data)
		data = JSON.parse(data)
		logger.info(`Shelf is created using api :: ${util.inspect(data,{  depth: null })} `)
	}).catch((err)=>logger.error(`Error occured in posting shelf :: ${err}`))

})

module.exports = router