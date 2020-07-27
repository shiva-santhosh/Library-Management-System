const mongoose = require('mongoose');
const express = require('express') ;
const winston = require('winston') ;
const util = require('util') ;
const winstonFastRabbitMq = require('winston-fast-rabbitmq') ;
const format = winston.format ;
const router = express.Router();
const UsersInfo = require('../projectmodels/userinfo.js') ;

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

router.get('/:id', (req,res) => {

	UsersInfo.findById(req.params.id
	).then((data)=>{
		res.json(data)
		data = JSON.stringify(data)
		data = JSON.parse(data)
		logger.info(`User profile request  is made using api::${util.inspect(data,{  depth: null })}`)
	}).catch((err)=>{
		let errData = {} ;
		errData.Success = false ;
		errData.Error = err.toString()  ;
		logger.error(`Error occured in getting users profile:: ${util.inspect(errData,{  depth: null })}`) 
	})

})

router.post('' , (req ,res) =>{

	var User=new UsersInfo({
		Phone : req.body.phone,
		Name : 	req.body.name ,
		Email : req.body.email

	})
	
	User.save().then((data)=>{
		res.send(data)
		data = JSON.stringify(data)
		data = JSON.parse(data)
		logger.info(`User profile is created using the api::${util.inspect(data,{  depth: null })}`)
	}).catch((err)=>logger.error(`Error occured in posting usersprofile :: ${err}`))


})

module.exports = router