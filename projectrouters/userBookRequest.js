const mongoose = require('mongoose');
const express = require('express') ;
const winston = require('winston') ;
const util = require('util') ;
const winstonFastRabbitMq = require('winston-fast-rabbitmq') ;
const format = winston.format ;
const router = express.Router();
const UsersInfo = require('../projectmodels/userinfo.js') ;
const Books = require('../projectmodels/books.js') ;
const UserBookRequest = require('../projectmodels/userBookRequest.js')
const BookShelfMap = require('../projectmodels/bookShelfMap.js')

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

router.post('', (req,res) => {

	Books.find({ ISBN : req.query.isbn}).then((data)=>{
		BookShelfMap.findOneAndRemove({Book : data[0]._id}).then((data2)=>{
			
			if(data2 != null){

				let date = new Date()
				let s = new UserBookRequest({
					User : mongoose.Types.ObjectId(req.query.userid) ,
					Book : data[0]._id ,
					RequestedDate : new Date() ,
					ReturnDate : new Date(date.setMonth(date.getMonth()+1)) ,
					Success : true,
					Return : false
				})

				data = JSON.stringify(data)
				data = JSON.parse(data)
				s.save().then((data1)=>{
					res.send(data1)
					data1=JSON.stringify(data1)
					data1=JSON.parse(data1)
					UsersInfo.findById(req.query.userid).then((data3)=>{

						data3 = JSON.stringify(data3)
						data3 = JSON.parse(data3)
						data2 = JSON.stringify(data2)
						data2 = JSON.parse(data2)
						delete data3._id ;
						delete data2._id ;
						logger.info(`A userBookRequest is made and book is removed from the shelf using the api  :: ${util.inspect(data1,{  depth: null })} with userprofile :: ${util.inspect(data3,{  depth: null })}  with book details :: ${util.inspect(data,{  depth: null })}`)

					}).catch((err4)=>{
						let errData = {} ;
						errData.Success = false ;
						errData.Error = err4.toString()  ;
						logger.error(`Error occured in userbook request ::${util.inspect(errData,{  depth: null })}`)
					})

				}).catch((err1)=>{
						let errData = {} ;
						errData.Success = false ;
						errData.Error = err1.toString()  ;
						logger.error(`Error occured in userbook request ::${util.inspect(errData,{  depth: null })}`)
				})

			}
			else{

				let date = new Date()

				let s = new UserBookRequest({
					User : mongoose.Types.ObjectId(req.query.userid) ,
					Book : data[0]._id ,
					RequestedDate : new Date() ,
					Success : false ,
					Return : false

				})
				s.save().then((data1)=>{
					res.send(data1)
					data1 = JSON.stringify(data1)
					data1 = JSON.parse(data1)
					data = JSON.stringify(data)
					data = JSON.parse(data)
					logger.info(`A userBookRequest is made and requested book not found:: ${util.inspect(data1,{  depth: null })}  with bookdetails :: ${util.inspect(data,{  depth: null })}`)

				}).catch((err1)=>{
					let errData = {} ;
					errData.Success = false ;
					errData.Error = err1.toString()  ;
					logger.error(`Error occured in userbook request ::${util.inspect(errData,{  depth: null })}`)

				})

			}
		}).catch((err2)=>{
			let errData = {} ;
			errData.Success = false ;
			errData.Error = err2.toString()  ;
			logger.error(`Error occured in userbook request ::${util.inspect(errData,{  depth: null })}`)

		})

	}).catch((err)=>{
		let errData = {} ;
		errData.Success = false ;
		errData.Error = err.toString() + "| may be isbn is invalid" ;
		logger.error(`Error occured in userbook request ::${util.inspect(errData,{  depth: null })}`)
	})

})

module.exports = router