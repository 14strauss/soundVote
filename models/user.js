var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
//SCHEMA SETUP 
var useraccountSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    votes: Number,
    latitude: Number,
    longitude: Number,
    coordinates: [Number],
    currentSoundSpot: String
 });
useraccountSchema.plugin(passportLocalMongoose);
//  var Useraccount = mongoose.model("Useraccount", useraccountSchema);
 module.exports = mongoose.model("Useraccount", useraccountSchema);