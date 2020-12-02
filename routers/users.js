//All the user related routes are here
const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const Users = require('../models/users.js'); // Users model is imported

//lists all the users in the users collection
router.get('' , (req,res) => {

	Users.find({}
	).then( (data) => {
		res.json(data)
	}).catch((err)=>{
		res.send("Error occured in getting the users from user collection" , err);
	})

})

//lists the information of a user using mobile/phone number.
router.get('/:id' , (req,res) => {

	Users.find({mobile : req.params.id}
	).then( (data) => {
		res.json(data)
	}).catch((err)=>{
		res.send("Error occured in getting the users from user collection" , err);
	})

})

module.exports=router


