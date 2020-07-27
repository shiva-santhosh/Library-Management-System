const express = require('express') ;
const mongoose = require('mongoose') ;
const app = express() ;
const bodyParser = require('body-parser') ;
const util = require('util') ;
const book = require('./projectrouters/books.js') ;
const user = require('./projectrouters/userinfo.js') ;
const userBookRequest = require('./projectrouters/userBookRequest.js') ;
const row = require('./projectrouters/row.js') ;
const tower = require('./projectrouters/tower.js') ;
const shelf = require('./projectrouters/shelf.js') ;
const bookShelfMap = require('./projectrouters/bookShelfMap.js') ;
const env = process.env.NODE_ENV || 'development'; 
const PORT = process.env.PORT || 3000 ;
const mongodbUrl = 'mongodb://localhost:27017/rupeek' ;
const MONGODB = process.env.MONGODB_URI || mongodbUrl ;

mongoose.Promise = global.Promise ;
mongoose.set('useFindAndModify', false) ;

mongoose.connect(MONGODB,{
 	useNewUrlParser: true
	}).then( (data) => console.log("Mongodb is connected\n")
	).catch( (err) => console.log("Not-connected") )

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/books', book ) ;
app.use('/api/users', user ) ;
app.use('/api/userBookRequest' , userBookRequest ) ;
app.use('/api/row' , row ) ;
app.use('/api/tower', tower ) ;
app.use('/api/shelf' , shelf ) ;
app.use('/api/bookShelfMap' , bookShelfMap ) ;

app.listen(PORT,(req,res)=>{
	console.log(`Now it is listening ont the port :: ${PORT}`)
});




















