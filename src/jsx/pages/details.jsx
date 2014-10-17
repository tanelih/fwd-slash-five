/**
 * @jsx React.DOM
 */

'use strict';

var React     = require('react');
var router    = require('react-router');
var bootstrap = require('react-bootstrap');

var Map    = require('../components/map.jsx');
var Input  = require('../components/input.jsx');
var Rating = require('../components/rating.jsx');

var Row    = bootstrap.Row;
var Col    = bootstrap.Col;
var Grid   = bootstrap.Grid;
var Panel  = bootstrap.Panel;
var Button = bootstrap.Button;

/**
 * Container for 'details' page content.
 */
var DetailsPage = React.createClass({

	render: function() {
		// Find the review with the 'id' specified in route parameters.
		var review = null;
		for(var i = 0; i < this.props.reviews.length; i++) {
			if(this.props.reviews[i].id == this.props.params.id) {
				review = this.props.reviews[i]; break;
			}
		}

		/**
		 * Creates a 'read-only' linkState.
		 */
		var dummyLinkState = function(val) {
			return {
				value: val,
				requestChange: function() {}
			}
		}

		// Create 'dummy' linkStates that are 'read-only' in a sense that
		// 'requestChange' is a no-op. This is for the 'Input' components that
		// require a valid 'linkState' object to be passed in.
		var rating   = dummyLinkState(review.rating);
		var comment  = dummyLinkState(review.comment);
		var nickname = dummyLinkState(review.nickname);

		return (
			<div id="details-page" className="page">
				<Map reviews={[review]}
				     position={review.position} />
				<Grid fluid={true} className="page-content">
					<Row>
						<Col xs={12}>
							<Rating hover={false} rating={rating} />
						</Col>
						<Col xs={12}>
							<Input type="textarea" disabled={true}
							       valueLink={comment} />
						</Col>
						<Col xs={6}>
							<Input type="text" disabled={true}
							       valueLink={nickname} />
						</Col>
						<Col xs={6}>
							<Button block={true} bsStyle="primary"
							        onClick={router.goBack}>
								Back
							</Button>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
});

module.exports = DetailsPage;
