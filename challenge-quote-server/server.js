// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require('express');
const app = express();
const port = 8080;

//load the quotes JSON
const quotes = require('./quotes.json');

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get('/', function (request, response) {
	response.send("Levi's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

app.get('/quotes', function (request, response) {
	response.send(quotes);
});
app.get('/echo', function (request, response) {
	response.send(`You said ${request.query.word}`);
});

app.get('/quotes/search', function (request, response) {
	const searchKeyword = request.query.term;
	if (searchKeyword) {
		const lowerCase = searchKeyword.toLowerCase();
		const found = quotes.filter(
			(quote) =>
				quote.author.toLowerCase().includes(lowerCase) ||
				quote.quote.toLowerCase().includes(lowerCase),
		);
		response.send(found);
	}
});

let randomQoute = pickFromArray(quotes);

app.get('/quotes/random', function (request, response) {
	response.send(randomQoute);
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(port, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});