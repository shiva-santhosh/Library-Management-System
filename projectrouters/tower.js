const mongoose = require('mongoose');
const express = require('express') ;
const winston = require('winston') ;
const util = require('util') ;
const winstonFastRabbitMq = require('winston-fast-rabbitmq') ;
const format = winston.format ;
const router = express.Router();
const Tower = require('../projectmodels/tower.js') ;

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

	let tower1 = new Tower({
		No : req.body.num
	})
	tower1.save().then((data)=>{
		res.send(data)
		data = JSON.stringify(data)
		data = JSON.parse(data)
		logger.info(`Tower is created using api :: ${util.inspect(data,{  depth: null })} `)
	}).catch((err)=>logger.error(`Error occured in posting tower :: ${err}`))

})

module.exports = router



