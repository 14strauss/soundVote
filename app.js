var express               = require("express"),
    app                   = express(), 
    mongoose              = require("mongoose"),
    flash                 = require("connect-flash"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    Music                 = require("./models/music"),
    SoundSpot             = require("./models/soundSpot"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    
// mongoose.connect("mongodb://localhost/user_account", { autoIndex: false });
mongoose.connect("mongodb://Ryan:35103510@ds249798.mlab.com:49798/soundvote", { autoIndex: false });


app.use(require("express-session")({
    secret: "sound vote sessions",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
 
 

 //=================
 //routes
 //================

app.get("/", function(req, res){
   res.render("index", {currentUser: req.user});
});

app.get("/soundSpot", isLoggedIn, function(req, res){
   
      SoundSpot.find({name: req.user.currentSoundSpot})
        .select('playlist')
        .exec()
        .then(doc => {
            var doc2= JSON.stringify(doc);
            var spot= JSON.parse(doc2);
             
            res.render("soundSpot", {currentUser: req.user, Spot: spot, place1:place1, place2:place2, place3:place3});
            
          });
    });
    
    
    
app.get("/about", function(req, res){
   
   res.render("about", {currentUser: req.user});
});
//auth routes
app.get("/login", function(req, res){
   res.render("login", {currentUser: req.user});
});
app.get("/map", function(req, res){
   res.render("map", {currentUser: req.user}); 
});
app.get("/signup", function(req, res){
   res.render("signup", {currentUser: req.user});
});

app.get("/logout", function(req, res){
    User.update({username:req.user.username}, {$set: {latitude:null, longitude:null}}).exec();
     SoundSpot.update({name: req.body.currentSoundSpot}, {$set: { connected: null} }).exec();
       User.update({username: req.user.username}, {$set: { currentSoundSpot: null} }).exec();
  
   req.logout();
    res.redirect("/");
}); 
//handling user signup
app.post("/signup", function(req, res){
    req.body.username
    req.body.password
    // req.body.email
    req.body.address
    req.body.city
    req.body.state
    req.body.zip
    req.body.latitude
    req.body.longitude
    User.register(new User({username: req.body.username, address: req.body.address,  city: req.body.city, state: req.body.state, zip: req.body.zip, longitude:req.body.longitude, latitude: req.body.latitude}), req.body.password, function(err, user){
       if(err){
       console.log(err);
       return res.render('signup');
            }
       passport.authenticate("local")(req, res, function(){
          res.redirect("/");
       }) ;        
        
    });
});
//login logic
app.post("/login", passport.authenticate("local", {
    // successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: 'Invalid username or password.'
}) ,function(req, res){
    req.body.username;
    req.body.city;
   req.body.latitude;
   req.body.longitude;
   User.update({username: req.body.username}, {$set: { latitude: req.body.latitude, longitude: req.body.longitude, currentSoundSpot: null, votes:10} }).exec();
   
    res.redirect("/");
// 
});
// app.get("/connect1", function(req, res) {
//      SoundSpot.find({name: req.user.currentSoundSpot})
//         .exec()
//         .then(doc => {
//     // console.log(doc);
//     // SoundSpot.find().forEach(function(doc){
//     //     print(doc.name);
//             res.json(doc);
//         });
// });
app.post("/connect1", function(req, res){
    
     req.body.currentSoundSpot;
   User.update({username: req.user.username}, {$set: { currentSoundSpot: req.body.currentSoundSpot} }).exec();
   SoundSpot.update({name: req.body.currentSoundSpot}, {$set: { connected: req.user.username} }).exec();
   
    res.redirect("/soundSpot");
});
app.post("/connect2", function(req, res){
     req.body.currentSoundSpot;
   User.update({username: req.user.username}, {$set: { currentSoundSpot: req.body.currentSoundSpot} }).exec();
    SoundSpot.update({name: req.body.currentSoundSpot}, {$set: { connected: req.user.username} }).exec();
   
    res.redirect("/SoundSpot");
});
app.post("/connect3", function(req, res){
     req.body.currentSoundSpot;
   User.update({username: req.user.username}, {$set: { currentSoundSpot: req.body.currentSoundSpot} }).exec();
    SoundSpot.update({name: req.body.currentSoundSpot}, {$set: { connected: req.user.username} }).exec();
   
    res.redirect("/SoundSpot");
});
app.post("/disconnect", function(req, res){
     req.body.currentSoundSpot;
    SoundSpot.update({name: req.user.currentSoundSpot}, {$set: { connected: null} }).exec();
   User.update({username: req.user.username}, {$set: { currentSoundSpot: null} }).exec();
  
   
    res.redirect("/SoundSpot");
});
app.post("/addSong", function(req, res){
    
    
});
app.post("/addVote", function(req, res){
    var currtitle=req.body.title;
    console.log(currtitle);
   var voter=req.body.votes;
    var voting= req.body.votes++;
    var voter= voting +1;
    console.log(voting);
    console.log(voter);
    var votesLeft = req.user.votes++;
   
   if(!votesLeft<1){
    var votesLeft2= votesLeft -1;
   console.log("hello");
    SoundSpot.updateOne({name:req.user.currentSoundSpot, "playlist.title":req.body.title}, {$set:{ "playlist.$.votes":voter}}).exec();
    User.update({username:req.user.username}, {$set:{votes:votesLeft2}}).exec();
    res.redirect("/SoundSpot");
       
   }
    // else {
    //     res.alert("No Votes Remaining");
    // }
    
    
    
});

function logout(req, res){
        res.redirect("logout");
}
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.render("login", {currentUser: req.user});
}
// var soundSpotQuery = {
//     Name: String
// };
function isLoggedInToSoundSpot(req, res, next){
    
};
var near = [];
var place1="Plymouth";
var place2= "McCoys";
var place3= "Zurn";


// console.log(results);
  
// var log2 =SoundSpot.find(
//   { loc : { $near : [ longitude, latitude ], $maxDistance: 100 } }
// );
// SoundSpot.aggregate([
// {
//   $geoNear: {
//      near: { type: "Point", coordinates: [ longitude , latitude ] }, 
//     //coordinates: [longitude, latitude]
//      distanceField: "location.calculated",
//      maxDistance: 200, //Meters
//      includeLocs: "location.location",
//      num:3 ,
//      spherical: true
//   }
//  }
// ], function(err, res){
//     if(err){
//         console.log(err);
//     }
//      res.forEach(doc => {console.log(doc)});
// });
 


// app.listen(80, function(req, res){
//     console.log("the Server has started");
// });
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("the Server has started");
});

//#blitzed
