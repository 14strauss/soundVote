// function addSong(songTitle, playlist){};
// function voteSong(songTitle, playlist, votes){};
// function connectToSoundSpot(CurrentUser , soundSpot){
//     User.update({username:CurrentUser}, {$set:{currentSoundSpot:soundSpot } }).exec();
// };
// function disconnectFromSoundSpot( CurrentUser){
//     User.update({username:CurrentUser}, {$set:{currentSoundSpot:null } }).exec();

// };
// function playNextSong(SongTitle, playlist){};

// var voteCount[][];
// for( var i= 0;i <Spot[0].playlist.length; i++){
//     voteCount[i][1]= Spot[0].playlist[i].votes;
//     voteCount[i][2]= Spot[0].playlist[i].title;
// }


//comes in on a json array, should be an object with an array of objects like this
//          [playlist:{[{title:String, file:null, votes:number}, {title:String, file:null, votes:number}]}]
//          
//
//       ______________________________________________________
//      |Song                       |    Votes                 |
//      |voteCount[2].title      |   voteCount[1].votes        |
//      |voteCount[2].title      |   voteCount[1].votes        |
//      |voteCount[2].title      |   voteCount[1].votes        |
//      |voteCount[2].title      |   voteCount[1].votes        |
//      |                                                      |
//      |                                                      |
//      |                                                      |
//      |                                                      |
//      |______________________________________________________| 
//      