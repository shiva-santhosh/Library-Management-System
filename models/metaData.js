//MetaData schema is declared here and the model is exported
const mongoose = require('mongoose');

const metaDataSchema = new mongoose.Schema({
	
	MetaData : String,
	Type : String,
	SubType : String

})

const MetaData = mongoose.model("MetaData",metaDataSchema);

module.exports = MetaData