var dogs = {
	"raining": true,
	"noise": "Woof!",
	"makeNoise": function() {
		if (dogs.raining === true) {
			console.log(dogs.noise);
		}
	}
}

var cats = {
	"raining": false,
	"noise": "Meow!",
	"makeNoise": function() {
		if (cats.raining === true) {
			console.log(cats.noise);
		}
	}
}

cats.makeNoise();
dogs.makeNoise();