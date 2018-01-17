require("dotenv").config();
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
//console.log(spotify);
//console.log(client);
// First I want to read the file

var userService = process.argv[2];

switch(userService) {
	case "my-tweets":
		//twitter stuff
		console.log("twitter");
		var params = {screen_name: 'S_Harold_Dev'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
    			for (i=0; i<20 && i<tweets.length; i++){
    				console.log("                                                                 ");
    				console.log("+++++Tweet #" + (i+1) + "+++++");
    				console.log("Tweeted at: " + tweets[i].created_at);
    				console.log("                                                                ");
    				console.log(tweets[i].text);
    				console.log("                                                                ");
    				console.log("*******************************************************************");
  				}
  			}
		});
		break;
	case "spotify-this-song":
		//spotify stuff
		console.log("spotify");
		break;
	case "movie-this":
		//omdb stuff
		console.log("movie");
		break;
	case "do-what-it-says":
		//random.txt stuff
		console.log("random");
		break;
	default:
		console.log("Sorry, I didn't recognize that command. Please choose one of my four functions: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.");
}
