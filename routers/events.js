//All the events related routes are here.
const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const Events = require('../models/events.js'); //Events model is imported
const Users = require('../models/users.js'); // Users model is imported

//fetches the latest 100 events from the events collection(to fetch all events remove limit.(100))
router.get('' , ( req , res ) => {

	Events.find({}
	).sort( { createdAt : -1 } ).limit(100).then( (data) => {
		res.send(data)
	}).catch( (error) => res.send("Error occured in getting the events from events collection" ,error) );

});
 
 //fetches a event of a given eventId
router.get('/:id',( req , res ) => {

	Events.findById(req.params.id).then((data)=>{
		res.send(data)
	}).catch((err)=>{
		res.send("Error occured in getting a event from events collection" , err);
	})

})

//deletes the event of a specified eventId
router.delete('/:id',( req , res ) => {

	Events.findByIdAndRemove(req.params.id).then((data)=>{
		res.send(data)
	}).catch((err)=>{
		res.send("Error occured in deleting a event from events collection" , err);
	})

})

//fetches the latest 100 events linked to the user through phone number(to fetch all events remove limit.(100))
router.get('/user/:id',( req , res ) => {

	Users.find({mobile : req.params.id}
	).then((data)=>{
		Events.find({ userid : data[0]._id }
		).sort({createdAt : -1}).limit(100).then((data1)=>{
			res.send(data1)
		}).catch((err1)=>{
			res.send("Error ocuured in getting events" ,err1)
		})
	}).catch((err)=> res.send("Error occured in getting events that are linked to the user" , err));

})

//fetches latest 100 events of a particular event-type
router.get('/eventType/:event',( req , res ) => {

	Events.find({ EventType : req.params.event}
	).sort({createdAt : -1}).limit(100).then((data)=>{
		res.send(data)
	}).catch((error)=>res.send("Error occured in getting events of that event-type from events collection" , error));

})

//fetches all the events occured on a given day.
router.get('/date/:id',( req , res ) => {

	let today = new Date(req.params.id)
	let nextday = new Date(today)
	nextday.setDate(today.getDate()+1)
	Events.find({ createdAt :{ $gte : today  , $lte : nextday } } ).then((data)=>{
		console.log(data)
		res.send(data)
	}).catch((err)=>console.log('Error occured in getting the events in that day' , err))

})

//fetches all the latest 100 successful events
router.get('/eventStatus/success',( req , res ) => {

	Events.find({ EventSuccess : true }
	).sort({createdAt : -1}).limit(100).then((data)=>{
		res.send(data)
	}).catch((error)=>res.send("Error occured in getting events from events collection" , error));

})

//fetches all the latest 100 failure events
router.get('/eventStatus/failure',( req , res ) => {

	Events.find({ EventSuccess : false}
	).sort({createdAt : -1}).limit(100).then((data)=>{
		res.send(data)
	}).catch((error)=>res.send("Error occured in getting events of that event-type from events collection" , error));

})

module.exports=router





