

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const async = require('async');
const PORT = process.env.PORT || 8080 ;
const mongodbUrl = 'mongodb://localhost:27017/rupeek';
const MONGODB = process.env.MONGODB_URI || mongodbUrl ;
const events = require('./routers/events.js') ;  // have the event routes in routers directory
const users = require('./routers/users.js') ;   // have the user routes in routers directory
const metaData = require('./routers/metaData.js'); //// have the metaData routes in routers directory


mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)

mongoose.connect(MONGODB,{
	useNewUrlParser: true
	}).then(()=>console.log("Mongodb is connected\n")
	).catch((err)=>console.log("Not-connected")
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/main'))); 

app.use('/api/events', events)
app.use('/api/users', users )
app.use('/api/metadata', metaData )

app.get('*', (req, res) => {
  	res.sendFile(path.join(__dirname, 'dist/main/index.html'));  
});

app.listen(PORT,(req,res)=>{
	console.log(`Now it is listening ont the port ${PORT}`)
});














