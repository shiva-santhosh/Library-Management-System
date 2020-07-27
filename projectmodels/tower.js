const mongoose = require('mongoose') ;

const towerSchema = new mongoose.Schema({
	No :  Number
})

const Tower = mongoose.model("tower",towerSchema)

module.exports = Tower