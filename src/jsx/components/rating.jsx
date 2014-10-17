/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

/**
 * It does nothing.
 */
var _noop = function() {}

/**
 * Represents a single rating unit, a star if you like.
 */
var Unit = React.createClass({

	propTypes: {

		/**
		 * Describes the ratio of how much space should horizontally should this
		 * unit take, e.g. 0.25 would imply a 1 / 4.
		 */
		ratio: React.PropTypes.number.isRequired,

		/**
		 * Whether or not a 'hover' class is added on hover.
		 */
		hover: React.PropTypes.bool,

		/**
		 * Callback for when this unit is clicked.
		 */
		onClick: React.PropTypes.func,

		/**
		 * Marks this unit as selected.
		 */
		isSelected: React.PropTypes.bool
	},

	getInitialState: function() {
		return {
			isMouseOver: false
		}
	},

	getDefaultProps: function() {
		return {
			ratio:      0,
			hover:      true,
			onClick:    _noop,
			isSelected: false
		}
	},

	onHover: function(isMouseOver) {
		this.setState({ isMouseOver: isMouseOver });
	},

	render: function() {

		// Base class 'rating-unit' is always present, '-hover' and '-selected'
		// are added based on properties and events.
		var classes = React.addons.classSet({
			'rating-unit':          true,
			'rating-unit-hover':    this.props.hover && this.state.isMouseOver,
			'rating-unit-selected': this.props.isSelected
		});

		// Calculate the width for this unit using the 'ratio' property. The
		// units are stacked horizontally next to one another, hence the
		// 'inline-block' rule.
		var containerStyle = {
			'width':   '' + (this.props.ratio * 100.0) + '%',
			'display': 'inline-block'
		}

		// Center the actual unit element inside the 'unit-container' element.
		var unitStyle = {
			'margin': '0 auto'
		}

		return (
			<div className="rating-unit-container" style={containerStyle}
			     onMouseEnter={this.onHover.bind(null, true)}
			     onMouseLeave={this.onHover.bind(null, false)} >
				<div className={classes} style={unitStyle}
				     onClick={this.props.onClick}>
					<div className="rating-unit-inner" />
				</div>
			</div>
		);
	}
});

/**
 * Represents a rating, which consists of several units.
 */
var Rating = React.createClass({

	propTypes: {

		/**
		 * How many units are there.
		 */
		max: React.PropTypes.number,

		/**
		 * Rating implements the React 'valueLink' shape in order to perform
		 * two-way binding.
		 */
		rating: React.PropTypes.shape({
			value:         React.PropTypes.number.isRequired,
			requestChange: React.PropTypes.func.isRequired
		}),

		/**
		 * Whether or not the units should apply a 'hover' class.
		 */
		hover: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			max: 5,
			rating: {
				value:         0,
				requestChange: _noop
			},
			hover: true
		}
	},

	render: function() {

		var units = [ ];
		for(var i = 0; i < this.props.max; i++) {

			var onclick  = this.props.rating.requestChange.bind(null, (i + 1));
			var selected = i < this.props.rating.value;

			units.push(
				<Unit key={i}
				      ratio={1.0 / this.props.max} hover={this.props.hover}
				      onClick={onclick} isSelected={selected} />
			);
		}

		return (
			<div className="rating">
				{units}
			</div>
		);
	}
});

/**
 * Only expose Rating, Unit is used just internally.
 */
module.exports = Rating;
