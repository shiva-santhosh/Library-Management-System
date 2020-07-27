const mongoose = require('mongoose');
const express = require('express') ;
const winston = require('winston') ;
const util = require('util') ;
const winstonFastRabbitMq = require('winston-fast-rabbitmq') ;
const format = winston.format ;
const router = express.Router();
const Row = require('../projectmodels/row.js') ;

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

router.post('',(req,res)=>{

	let row1 = new Row({
		No : req.body.num
	})
	row1.save().then((data)=>{
		res.send(data)
		data = JSON.stringify(data)
		data =	JSON.parse(data)
		logger.info(`Row is created using api :: ${util.inspect(data,{  depth: null })} `)
	}).catch((err)=>logger.error(`Error occured in posting row :: ${err}`))

})

router.get('',(req,res)=>{

	Row.find({}
	).then( (data) => {
		res.send(data)
		data = JSON.stringify(data)
		data =	JSON.parse(data)
		logger.info(`Rows request are made using api :: ${util.inspect(data,{  depth: null })} `)
	}).catch((err)=>logger.error(`Error occured in posting row :: ${err}`))

})

module.exports = router