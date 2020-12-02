//All the metadata related routes are here.
const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const MetaData = require('../models/metaData.js'); // MetaData model is imported
const Events = require('../models/events.js'); // Events model is imported

//fetches all the metaDatas in the metaData collection
router.get('' , ( req , res ) =>{

	MetaData.find({}).then((data)=>{
		res.send(data)
	}).catch( (err) => {
		res.send("Error occured in getting the metadatas from metadata's collection" , err);
	})

})

//posts a new metaData in the metadata collection and updates all the events in the events collection with a new event-type and event-sub-type
router.post('' , ( req , res ) =>{

	MetaData.findOneAndUpdate({ MetaData : req.body.MetaData , Type : req.body.Type ,  SubType : req.body.SubType   } ,
	{} , {upsert : true ,
	new :true , setDefaultsOnInsert :true}
	).then( (data) => res.send(data)
	).catch((err) => res.json("Error occured in posting the metadata in metadata's collection" , err))

	Events.updateMany({ EventsMetaData : req.body.MetaData } , {$set : { 
		EventType :  req.body.Type ,
		EventSubType : req.body.SubType 
	} } ).then((data)=>console.log(data)
	).catch(err=>console.log('Error occured in updating eventtype and eventsubtypes',err))

})

//updates a metadata if exists or creates a new metaData in the metadata collection and updates all the events in the events collection with a new event-type and event-sub-type
router.put('',( req , res ) =>{

	MetaData.findOneAndUpdate({ MetaData : req.body.MetaData } ,
	{MetaData : req.body.MetaData , Type : req.body.Type ,  SubType : req.body.SubType } , 
	{upsert : true , new :true , setDefaultsOnInsert :true}
	).then(data=>res.send(data)
	).catch((err)=>res.json("Error occured in posting the metadata in metadata's collection" , err))

	Events.updateMany({ EventsMetaData : req.body.MetaData } , {$set : { 
		EventType :  req.body.Type ,
		EventSubType : req.body.SubType 
	} } ).then((data)=>console.log(data)
	).catch(err=>console.log('Error occured in updating eventtype and eventsubtypes',err))

})

//deletes the metaData in the metaData collection by accepting a metaData
router.delete('',( req , res ) =>{

	MetaData.remove({ MetaData : req.body.MetaData } 
	).then((data)=>res.send(data)
	).catch((err)=>res.json("Error occured in posting the metadata in metadata's collection" , err))

})
module.exports = router 