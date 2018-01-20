// Loading various npms, file system, keys.js
require("dotenv").config();
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
// Creating Twitter and Spotify clients using keys
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var search;
//console.log(spotify);
//console.log(client);

var userService = process.argv[2];

// Main switch case evaluating the contents of process.argv[2]
switch(userService) {
	case "my-tweets":
		logHead();
		tweeter();
		break;
	case "spotify-this-song":
		logHead();
		spotter();
		break;
	case "movie-this":
		logHead();
		movier();
		break;
	case "do-what-it-says":
		logHead();
		randomer();
		break;
	default:
		console.log('Sorry, I do not recognize that command. Please choose one of my four functions: my-tweets; spotify-this-song "song to search", movie-this "movie to search", or do-what-it-says.');
};

// Function to run when process.argv[2] is "my-tweets"
function tweeter() {
	//console.log("twitter");
	var params = {screen_name: 'S_Harold_Dev'};
	// Getting tweets from S_Harold_Dev account
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	// IF there aren't any errors, display latest tweets (max 20)		
			if (!error) {
				for (i=0; i<20 && i<tweets.length; i++){
					console.log("                                                                 ");
					console.log("+++++Tweet #" + (i+1) + "+++++");
					console.log("Tweeted at: " + tweets[i].created_at);
					console.log("                                                                ");
					console.log(tweets[i].text);
					console.log("                                                                ");
					console.log("*******************************************************************");
					log("Tweeted at: " + tweets[i].created_at + "   Tweet: " + tweets[i].text);
				}
			}
	});
};

// Function to run when process.argv[2] is spotify-this-song
function spotter() {
	console.log("spotify");
	if (process.argv[3] === undefined && search === undefined){
	// Default ace of bass, the sign	
		trackName = "ace the sign";
	} else if (search !== undefined) {
		trackName = search;
	} else {
		trackName = process.argv[3];
	}
	console.log(trackName);
	// Search spotify based off of the trackName
	spotify.search({ type: 'track', query: trackName }, function(err, data) {
		if (err) {
		return console.log('Error occurred: ' + err);
		}

		console.log("Artist: " + data.tracks.items[0].artists[0].name); 
		console.log("                                                                ");
		console.log("Song: " + data.tracks.items[0].name);
		console.log("                                                                ");
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("                                                                ");
		console.log("Link to song: " + data.tracks.items[0].href);
		log("Artist: " + data.tracks.items[0].artists[0].name);
		log("Song: " + data.tracks.items[0].name);
		log("Album: " + data.tracks.items[0].album.name);
		log("Link to song: " + data.tracks.items[0].href);
	});
};

//Function for when process.argv[2] is movie-this
function movier() {
	if (process.argv[3] === undefined && search === undefined){
		// Default
		title = "Mr. Nobody";
	} else if (search !== undefined) {
		title = search;
	} else {
		title = process.argv[3];
	}
	// Request info from omdb api
	request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
		if (!error && response.statusCode === 200) {

			if (JSON.parse(body).Title) {
				log("Title: " + JSON.parse(body).Title);
				console.log("Title: " + JSON.parse(body).Title);
			}
			if (JSON.parse(body).Released) {
				log("Release date: " + JSON.parse(body).Released);	
				console.log("Release date: " + JSON.parse(body).Released);
			}
			if (JSON.parse(body).Ratings[0]) {
				log("IMDb Rating: " + JSON.parse(body).Ratings[0].Value);	
				console.log("IMDb Rating: " + JSON.parse(body).Ratings[0].Value);
			}
			if (JSON.parse(body).Ratings[1]) {
				log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			}
			if (JSON.parse(body).Country) {
				log("Country produced: " + JSON.parse(body).Country);
				console.log("Country produced: " + JSON.parse(body).Country);
			}
			if (JSON.parse(body).Language) {
				log("Language: " + JSON.parse(body).Language);
				console.log("Language: " + JSON.parse(body).Language);
			}
			if (JSON.parse(body).Plot) {
				log("Plot: " + JSON.parse(body).Plot);
				console.log("Plot: " + JSON.parse(body).Plot);
			}
			if (JSON.parse(body).Actors) {
				log("Actors: " + JSON.parse(body).Actors);
				console.log("Actors: " + JSON.parse(body).Actors);
			}
		}
	});
};

// Function for when process.argv[2] is do-what-it-says
function randomer() {
	//console.log("random");
	
	// Reads random .text and splits the text each time a semicolon appears
	fs.readFile('random.txt', 'utf-8', function read(err, data) {
		var randSet = data.split(";");
		randomNum = Math.floor(Math.random() * randSet.length);
			// Split the randomly hcosen text into 2 pieces along the comma
			var randCommand = randSet[randomNum].split(",");
			userService = randCommand[0];
			console.log(userService);
			search = randCommand[1];
			console.log(userService);
			switch(userService) {
				case "my-tweets":
					//twitter stuff
					logHead();
					tweeter();
					break;
				case "spotify-this-song":
					//spotify stuff
					//console.log(search);
					logHead();
					spotter();
					break;
				case "movie-this":
					//omdb stuff
					logHead();
					movier();
					break;
				default:
					console.log('Sorry, I do not recognize that command. Please choose one of my four functions: my-tweets; spotify-this-song "song to search", movie-this "movie to search", or do-what-it-says.');
			}
		
	});
};

//Function to log parameter into log.txt file
function log(toAppend) {
  	fs.appendFile('log.txt', toAppend + "\r\n" , function (err) {
  		if (err) throw err;
	});
};

// Function to log process.argv[2] and process.argv[3] (if applicable) to log.txt
function logHead() {
	if (search !== undefined) {
		log("============================= \r\n" + userService + " " + search + "\r\n=============================");
	} else if (process.argv[3] !== undefined) {
		log("============================= \r\n" + userService + " " + process.argv[3] + "\r\n=============================");
	} else {
		log("============================= \r\n" + userService + "\r\n=============================");
	}
};