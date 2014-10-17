/**
 * @jsx React.DOM
 */

'use strict';

var React     = require('react');
var bootstrap = require('react-bootstrap');

var Map        = require('../components/map.jsx');
var ReviewForm = require('../components/review-form.jsx');
var ReviewList = require('../components/review-list.jsx');

var Row  = bootstrap.Row;
var Col  = bootstrap.Col;
var Grid = bootstrap.Grid;

/**
 * Container for 'home' page content.
 */
var HomePage = React.createClass({

	/**
	 * Emits a 'review' event to server with the review as payload. Does not add
	 * the review directly into the application's 'reviews' collection. The
	 * application listens for a 'review' event from the server in order to add
	 * reviews into the application's 'reviews' collection.
	 */
	addReview: function(review, callback) {
		review.position = this.props.position;
		this.props.socket.emit('review', review, callback);
	},

	render: function() {
		return (
			<div id="home-page" className="page">
				<Map reviews={this.props.reviews}
				     position={this.props.position} />
				<Grid fluid={true} className="page-content">
					<Row><ReviewForm onSubmit={this.addReview} /></Row>
					<Row><ReviewList reviews={this.props.reviews} /></Row>
				</Grid>
			</div>
		);
	}
});

module.exports = HomePage;
