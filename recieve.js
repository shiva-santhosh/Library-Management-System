//The messages from rabbitMq queue is consumed here.

const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const Users = require('./models/users.js');
const Events = require('./models/events.js');
const MetaData = require('./models/metaData.js');
const mongodbUrl = 'mongodb://localhost:27017/rupeek';
const lodash = require('lodash') ;

const MONGODB = process.env.MONGODB_URI || mongodbUrl ;
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

mongoose.connect(MONGODB,{
    useNewUrlParser: true
    }).then( (data) => console.log("Mongodb is connected\n")
    ).catch( (err) => console.log("Mondodb Not-connected\n")
);

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'Santhosh'; // messages are consumed from the queue, named Santhosh

        channel.assertQueue(queue, {
            durable: true ,
        }
        );

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {

            let obj = msg.content.toString();
            obj = JSON.parse(obj);
            let parsedObj = toObject(obj); //holds the whole parsedobject.

            x = "notFound" //initialisation for finding phone number.
            let phone = getPhone(parsedObj)

            let data1 = parsedObj.message.metaData; // holds the metadata.
            let data2 = parsedObj.message;  // holds the object.

            status = true //initialisation for finding status
            status  =getStatus(parsedObj)

            if(data1 === undefined){
            let length = data.indexOf(":")  // to handle the condition for the message that has no js objects in it.
            data1 = data2.slice(0,length);
            }
            
            if(phone.localeCompare("notFound") != 0){ // phone number found case

                Users.findOneAndUpdate({mobile : phone} ,{} , {upsert : true , new :true , setDefaultsOnInsert :true}
                ).then( (data) => {                              
 
                    MetaData.find({MetaData : data1 }
                    ).then( (m1) => {

                        if(m1.length != 0) {

                            let Event1 = new Events({
                                userid : data._id,
                                EventType : m1[0].Type,
                                EventSubType : m1[0].SubType,
                                EventsMetaData : data1 ,
                                EventObject : data2,
                                EventSuccess : status
                             })

                            Event1.save().then( (data3) => console.log(data3)
                            ).catch((err3) => console.log("Error occured while saving data in events collection",err3) )

                        }
                        else {

                            let Event1 = new Events({
                                 userid : data._id,
                                 EventType : "Unknown" ,     // if the metadata does not exist in the metaData collection , make
                                 EventSubType : "Unknown",   // the eventtype and eventsubtype as Unknown
                                 EventsMetaData : data1,
                                 EventObject : data2,
                                 EventSuccess : status
                             })
                             Event1.save().then( (data3) => console.log(data3)
                             ).catch( (err3) => console.log("Error occured while saving data in events collection",err3) )

                        }

                    }).catch( (m1err) => console.log('Error ocuured in processing metadata',m1err) )

                }).catch( (err) => console.log("Error occured in processing the user's collection",err) ) 
       
            }
            else {            // phone number not found case

                MetaData.find({MetaData : data1 }
                ).then( (m1)=> {

                    if(m1.length != 0){

                        let Event1 = new Events({
                            EventType : m1[0].Type ,
                            EventSubType : m1[0].SubType,
                            EventsMetaData : data1,
                            EventObject : data2,
                            EventSuccess : status
                         })
                         Event1.save().then((data3) => console.log(data3)
                         ).catch( (err3) => console.log("Error occured while saving data in event's collection",err3) );

                    }
                    else{
                        
                        let Event1=new Events({
                            EventType : "Unknown" ,         // if the metadata does not exist in the metaData collection , make
                            EventSubType : "Unknown",       // the eventtype and eventsubtype as Unknown
                            EventsMetaData : data1,
                            EventObject : data2,
                            EventSuccess : status
                        })
                        Event1.save().then((data3)=>console.log(data3)
                        ).catch( (err3) =>console.log("Error occured while saving data in events collection",err3) )
                        
                    }

                }).catch(  (m1err) => console.log('Error occured while processing the metadata',m1err) )
            }
            }, 
            { 
            noAck: true 
        });
    });
});

//This function recursively parses the message into javascript object and returns it
function toObject(o) {

    Object.keys(o).forEach(k => {  
        if(o[k] === null) {
            return null;
        }
        if (typeof o[k] === 'object') {
            return toObject(o[k]);
        }
        if (typeof o[k] === 'string'){
            if(check(o[k]) == true){
                o[k]=stringToObject(o[k]);
                return toObject(o[k]);
            }
        }
    });
    return o;

}

//Converts the string type object to real javascript object and returns it
function converter(str){

    try{
        eval('var obj2='+str)
        return obj2
    }
    catch(err){
        console.log(`There is a error because of misuse in flower and square brackets, or the date and objectid are not converted to strings  while sending the messages :: ${err}`)
        var obj2={}
        return obj2
    }

}

//Checks whether the given string has string type objects in it and returns a boolean value
function check(str){ 

    let counter1=0;      
    let counter2=0;   

    for(let i = 0 ; i < str.length ; i++){

        if(str[i] == '}')counter1++;
        if(str[i] == '{')counter2++;

    }
    if( counter1 == counter2 && counter1 > 0 ) {
        return true;
     }
    else {
         return false;
     }

}

// Takes the message string and assigns metaData and eventObject to a object and returns the assigned object
function stringToObject(str){        

    let obj = {} ;
    let pos,pos1,pos2 ;
    let counter1 = 0 , counter2 = 0 ;

    for( let i = 0 ; i < str.length-1 ; i++) {

        if( str[i] == ':' && str[i+1] == ':' ){
            pos=i ;
            obj.metaData = str.slice(0,pos) ;
            break ;
        } 
            
    }

    for( let i = 0 ; i < str.length ; i++ ){

        if( str[i] == '{' || str[i] == '[' ) {
            counter1++;
            if(counter1 == 1){
                pos1=i;
                if(str[i] == '['){
                    let flag=0;
                    for(let j = i+1 ; j < str.length ; j++){
                        if(str[j] == ' ' ||  str[j] == '\n')
                        continue;
                        if(str[j] == '{')
                        break;
                        flag = 1;   
                    }
                    if(flag == 1)
                        counter1--;
                }
            } 
        } 
        
        if( str[i] == '}'  || str[i] == ']' ) {
            if(counter1 > 0){
                counter2++;
                pos2=i;
            }
        }
        if( counter1 == counter2  &&  counter1 > 0 ){
            counter1 = 0 ;
            counter2 = 0 ;
            Object.assign(obj, converter( str.slice( pos1 , pos2+1 ) ) );
        }
    }

    return obj;

}

//Recursively search for the phone number in the parsed javascript object
function getPhone(o) {

    let y = "mobile";
    let z = "Phone";
    let z1 = "phone";
    Object.keys(o).forEach(k => {   
        
        if(o[k] === null) {
            return null;
        }
        if (typeof o[k] === 'object') {
            return getPhone(o[k]);
        }        
        if(y.localeCompare(k) == 0 || z.localeCompare(k) == 0 || z1.localeCompare(k) == 0){
            x=o[k];
        }

    });
    
    return x;

}

//Recursively search for the event-status in the parsed javascript object
function getStatus(o) {

    let y = "Success";
    Object.keys(o).forEach(k => {   
        
        if(o[k] === null) {
            return null;
        }
        if (typeof o[k] === 'object') {
            return getStatus(o[k]);
        }        
        if(y.localeCompare(k) == 0){
            status=o[k];
        }

    });
    
    return status ;

}


