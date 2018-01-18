require("dotenv").config();
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var userService;
var search;
//console.log(spotify);
//console.log(client);
// First I want to read the file

var userService = process.argv[2];

switch(userService) {
	case "my-tweets":
		//twitter stuff
		tweeter();
		break;
	case "spotify-this-song":
		//spotify stuff
		spotter();
		break;
	case "movie-this":
		//omdb stuff
		movier();
		break;
	case "do-what-it-says":
		//random.txt stuff
		randomer();
		break;
	default:
		console.log("Sorry, I didn't recognize that command. Please choose one of my four functions: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.");
}

//twitter stuff
function tweeter() {
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
}

function spotter() {
	console.log("spotify");
	if (process.argv[3] === undefined && search === undefined){
		
		trackName = "the sign";
	} else if (search !== undefined) {
		trackName = search;
	} else {
		trackName = process.argv[3];
	}
	console.log(trackName);
	spotify.search({ type: 'track', query: trackName }, function(err, data) {
			if (err) {
			return console.log('Error occurred: ' + err);
			}

		console.log(data.tracks.items[0].artists[0].name); 
		console.log(data.tracks.items[0].name);
		console.log(data.tracks.items[0].href);
		console.log(data.tracks.items[0].album.name);
	});
}

function movier() {
	if (process.argv[3] === undefined && search === undefined){
		title = "Mr. Nobody";
	} else if (process.argv[3] !== undefined) {
		title = process.argv[3];
	} else {
		title = search;
	}
	request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
		if (!error && response.statusCode === 200) {

			if (JSON.parse(body).Title) {
				console.log("Title: " + JSON.parse(body).Title);
			}
			if (JSON.parse(body).Released) {	
				console.log("Release date: " + JSON.parse(body).Released);
			}
			if (JSON.parse(body).Ratings[0]) {	
				console.log("IMDb Rating: " + JSON.parse(body).Ratings[0].Value);
			}
			if (JSON.parse(body).Ratings[1]) {
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			}
			if (JSON.parse(body).Country) {
				console.log("Country produced: " + JSON.parse(body).Country);
			}
			if (JSON.parse(body).Language) {
				console.log("Language: " + JSON.parse(body).Language);
			}
			if (JSON.parse(body).Plot) {
				console.log("Plot: " + JSON.parse(body).Plot);
			}
			if (JSON.parse(body).Actors) {
				console.log("Actors: " + JSON.parse(body).Actors);
			}
		}
	});
}

function randomer() {
	console.log("random");
	fs.readFile('random.txt', 'utf-8', function read(err, data) {
		if (err) {
			return console.log(err);
		}
		var randCommand = data.split(",");
		userService = randCommand[0];
		console.log(userService);
		search = randCommand[1];

	
	console.log(userService);
	switch(userService) {
		case "my-tweets":
			//twitter stuff
			tweeter();
			break;
		case "spotify-this-song":
			//spotify stuff
			console.log(search);
			spotter();
			break;
		case "movie-this":
			//omdb stuff
			movier();
			break;
		default:
			console.log("Sorry, I didn't recognize that command. Please choose one of my four functions: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.");
	}
});
}
