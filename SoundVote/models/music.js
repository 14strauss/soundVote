var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var musicSchema = new mongoose.Schema({
	title: String,
	genre: String,
	file: String
	
});


musicSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Musicdata", musicSchema);