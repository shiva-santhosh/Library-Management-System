//Event schema is declared here and the model is exported

const mongoose = require('mongoose');
const Users = require('./users.js');

const eventSchema = new mongoose.Schema({
	
	userid: {
       	type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
	EventType : String ,
    EventSubType : String,
	EventsMetaData : String,
	EventObject : {},
	EventSuccess : Boolean
	}
   ,{
	timestamps : true

});

const Events = mongoose.model("Events",eventSchema);

module.exports = Events