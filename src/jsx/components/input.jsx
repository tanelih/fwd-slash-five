/**
 * @jsx React.DOM
 */

'use strict';

var React     = require('react');
var bootstrap = require('react-bootstrap');

/**
 * Represents a text-based input control. Can be either a 'text' or 'textarea'
 * input that can store the value in 'localStorage'.
 */
var Input = React.createClass({

	propTypes: {

		/**
		 * The value for the input. Requires a valueLink shaped object in order
		 * to update the value.
		 */
		valueLink: React.PropTypes.shape({
			value:         React.PropTypes.string.isRequired,
			requestChange: React.PropTypes.func.isRequired
		}).isRequired,

		/**
		 * The type of the input can be either 'text' or 'textarea'.
		 */
		type: React.PropTypes.oneOf(['text', 'textarea']),

		/**
		 * Disable the control.
		 */
		disabled: React.PropTypes.bool,

		/**
		 * Maximum length of the input text.
		 */
		maxLength: React.PropTypes.number,

		/**
		 * When set, stores the value in localStorage with this key.
		 */
		storeAttr: React.PropTypes.string,

		/**
		 * Placeholder value for the input.
		 */
		placeholder: React.PropTypes.string
	},

	getDefaultProps: function() {
		return {
			type:        'text',
			disabled:    false,
			maxLength:   24,
			storeAttr:   '',
			placeholder: ''
		}
	},

	componentDidMount: function() {
		if(this.props.storeAttr) {
			// Fetch initial value from localStorage.
			var attr = window.localStorage[this.props.storeAttr];
			if(attr) {
				this.props.valueLink.requestChange(attr);
			}
		}
	},

	render: function() {
		var BSInput   = bootstrap.Input;
		var valueLink = this.props.valueLink;

		if(this.props.storeAttr) {
			// If the 'storeAttr' is set, create a proxy valueLink which keeps
			// the value up to date in localStorage.
			valueLink = {
				value: this.props.valueLink.value,

				requestChange: function(newValue) {
					window.localStorage[this.props.storeAttr] = newValue;
					this.props.valueLink.requestChange(newValue);
				}.bind(this)
			}
		}

		return (
			<BSInput type={this.props.type} maxLength={this.props.maxLength}
			         valueLink={valueLink} disabled={this.props.disabled}
			         placeholder={this.props.placeholder} />
		);
	}
});

module.exports = Input;