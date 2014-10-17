'use strict';

var http     = require('http');
var express  = require('express');
var socketio = require('socket.io');

// TODO Use a persistent storage.
var reviews = [ ];

// Create an 'express' application, which is used as the 'requestListener' for
// node's standard 'http.Server'. Attaches the socket.io server to the created
// 'http.Server'.
var app    = express();
var server = http.createServer(app);
var io     = socketio.listen(server);

// Serve the static content (html, js, css) for the client.
app.use(express.static(__dirname + '/public'));

// Expose a simple API method for retrieving the current reviews.
app.get('/api/reviews', function(req, res) {
	return res.status(200).json(reviews);
});

// Setup listeners for the connected socket.
io.on('connection', function(socket) {

	/**
	 * Add a new review. Broadcast the new review to each connected client.
	 */
	socket.on('review', function(review, callback) {
		// Make sure callback is something that can be called.
		callback = typeof(callback == 'function') ? callback : function() { }

		// Enhance the review with 'id' and 'date' attributes.
		review.id   = Math.floor( Math.random() * 10000 );
		review.date = Date.now();

		// Add the review to our 'reviews' collection
		reviews.push(review);
		io.emit('review', review) && callback(null, review);
	});
});

// Starts listening to connections on given port.
server.listen(process.env.PORT || 3000);
