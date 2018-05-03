var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var soundSpotSchema = new mongoose.Schema({
    name: String,
    key: String,
    connected: {username: {type:String}},
   location: {
      'type':{type:String},
      coordinates: [Number], // <Longitude, Latitude>
             
        },
    playlist:[{title: String, file: String, votes: Number}]
    
    
    
});





soundSpotSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("soundspot", soundSpotSchema);




