/**
 * @jsx React.DOM
 */

'use strict';

var io      = require('socket.io-client');
var React   = require('react');
var request = require('request');

/**
 * Top level application. Handles application 'pages'.
 */
var App = React.createClass({

	getInitialState: function() {
		return {
			reviews: [ ],
			position: { lat: 0, lng: 0 }
		}
	},

	componentDidMount: function() {

		/**
		 * Sort 'reviews' by date, in descending order.
		 */
		var sortByDate = function(a, b) {
			return b.date - a.date;
		}

		// Get the initial batch of 'reviews' from the server.
		//
		// TODO Filter the reviews based on 'position' and 'date'.
		request.get('http://localhost:3000/api/reviews',
			function(err, res, body) {
				if(err) {
					return console.error(err);
				}

				this.setState({
					reviews: JSON.parse(body).sort(sortByDate)
				});
			}.bind(this));

		// Keep track of the client's 'position'.
		navigator.geolocation.watchPosition(function(pos) {
			this.setState({
				position: {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				}
			});
		}.bind(this));

		// Establish a connection to the 'socket.io' server using
		// 'socket.io-client'.
		//
		// TODO Handle errors somehow.
		this.socket = io.connect();
		this.socket.on('error',         console.error);
		this.socket.on('connect_error', console.error);

		// New reviews are added to 'state.reviews'. The reviews are sorted by
		// date just in case.
		this.socket.on('review', function(review) {
			this.setState({
				reviews: this.state.reviews.concat([review]).sort(sortByDate)
			});
		}.bind(this));
	},

	render: function() {
		// Because we are using 'react-router' the active component (or a page
		// in this case) is always set to 'props.activeRouteHandler'.
		return this.props.activeRouteHandler({
			socket:   this.socket,
			reviews:  this.state.reviews,
			position: this.state.position,
		});
	}
});

module.exports = App;
