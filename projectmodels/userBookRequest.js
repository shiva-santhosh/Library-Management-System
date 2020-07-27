const mongoose = require('mongoose') ;
const Books = require('./books.js') ;
const UsersInfo = require('./userinfo.js')
const userBookRequestSchema = new mongoose.Schema({

	Book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersInfo'
    },
    RequestedDate : Date ,
    ReturnDate : Date ,
    Success : Boolean ,
    Return : Boolean

})

const UserBookRequest = mongoose.model("userBookRequset" ,  userBookRequestSchema )

module.exports = UserBookRequest ;