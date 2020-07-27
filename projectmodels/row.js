const mongoose = require('mongoose');

var rowSchema = new mongoose.Schema({
	No : Number
})

var Row = mongoose.model('row',rowSchema)

module.exports = Row