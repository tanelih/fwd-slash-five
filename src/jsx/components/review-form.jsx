/**
 * @jsx React.DOM
 */

'use strict';

var React     = require('react/addons');
var bootstrap = require('react-bootstrap');

var Input  = require('./input.jsx');
var Rating = require('./rating.jsx');

var Row    = bootstrap.Row;
var Col    = bootstrap.Col;
var Button = bootstrap.Button;

/**
 * Represents the form used to submit reviews.
 */
var ReviewForm = React.createClass({

	mixins: [ React.addons.LinkedStateMixin ],

	propTypes: {

		/**
		 * Callback that is passed the 'review' once submitted.
		 */
		onSubmit: React.PropTypes.func.isRequired
	},

	getInitialState: function() {
		return {
			rating:   0,
			comment:  '',
			nickname: ''
		}
	},

	/**
	 * Validate that the form can be submitted.
	 */
	validate: function() {
		return this.state.rating       > 0 &&
			this.state.comment.length  > 4 &&
			this.state.nickname.length > 2;
	},

	/**
	 * Submit the form using the passed in 'onSubmit' property.
	 */
	onSubmit: function() {
		// Collect the current state as the 'review'.
		var review = {
			rating:   this.state.rating,
			comment:  this.state.comment,
			nickname: this.state.nickname
		}

		// Empty the state in order to clear the fields of the form.
		this.setState({ rating: 0, comment: '' });

		// Submit the form. If there is an error, re-fill the form with the
		// submitted values so the user can resend or modify the form.
		this.props.onSubmit(review, function(err) {
			if(err) {
				this.setState({
					rating:  review.rating,
					comment: review.comment
				});
				return console.error(err);
			}
		});
	},

	render: function() {
		// TODO can this be cleaned up?

		var noPaddingLeft = {
			'padding-left': 0
		}

		var noPaddingRight = {
			'padding-right': 0
		}

		var ratingContainerStyle = {
			'margin-top':    15,
			'margin-bottom': 15
		}

		return (
			<form className="review-form"
			      onSubmit={ function() { return false; } }>

				<Rating max={5} rating={this.linkState('rating')} />

				<Col xs={12}>
					<Input type="textarea" maxLength={128}
					       placeholder="What's up?"
					       valueLink={this.linkState('comment')} />
				</Col>

				<Col xs={6}>
					<Input type="text" maxLength={32}
					       placeholder="Who are you?"
					       storeAttr="nickname"
					       valueLink={this.linkState('nickname')} />
				</Col>
				<Col xs={6}>
					<Button block={true} bsStyle="primary"
					        disabled={this.state.disabled || !this.validate()}
					        onClick={this.onSubmit}>
						Rate
					</Button>
				</Col>
			</form>
		);
	}
});

module.exports = ReviewForm;
