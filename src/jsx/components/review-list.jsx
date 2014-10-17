/**
 * @jsx React.DOM
 */

'use strict';

var React     = require('react');
var router    = require('react-router');
var bootstrap = require('react-bootstrap');

var Col           = bootstrap.Col;
var Row           = bootstrap.Row;
var Label         = bootstrap.Label;
var ListGroup     = bootstrap.ListGroup;
var ListGroupItem = bootstrap.ListGroupItem;

/**
 * Lists given reviews. Clicking an item on the list will take the user to a
 * 'details' page.
 */
var ReviewList = React.createClass({

	render: function() {

		// TODO Is this the correct place for this?
		var colors = [
			'default', 'danger', 'warning', 'success', 'info', 'primary'
		];

		return (
			<ListGroup className="review-list">
			{this.props.reviews.map(function(review, idx) {

				var onclick = router.transitionTo.bind(null,
					'/reviews/' + review.id + '');

				return (
					<ListGroupItem key={idx}
					               className="review" onClick={onclick}>
						<Row>
							<Col xs={9} className="nickname">
								{review.nickname}
							</Col>
							<Col xs={3} className="rating">
								<Label bsStyle={colors[review.rating]}>
									{review.rating}
								</Label>
							</Col>
						</Row>
						<Row>
							<Col xs={12} className="comment">
								{review.comment}
							</Col>
						</Row>
					</ListGroupItem>
				);
			})}
			</ListGroup>
		);
	}
});

module.exports = ReviewList;
