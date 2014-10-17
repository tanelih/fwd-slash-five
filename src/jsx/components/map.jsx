/**
 * @jsx React.DOM
 */

'use strict';

var React  = require('react');
var router = require('react-router');

/**
 * Map component using leaflet, that can be used to display a bunch of 'review'
 * objects.
 *
 * TODO Maybe the objects passed here should implement a 'toGeoJSON' method,
 *      which the map component could then invoke, and thus stay completely
 *      oblivious to the type of objects passed in as markers.
 */
var Map = React.createClass({

	propTypes: {

		/**
		 * Enable or disable dragging (moving the map).
		 */
		dragging: React.PropTypes.bool,

		/**
		 * Position to center the map to.
		 */
		position: React.PropTypes.shape({
			lat: React.PropTypes.number,
			lng: React.PropTypes.number
		}),

		/**
		 * Array of reviews that are displayed as markers.
		 */
		reviews: React.PropTypes.array
	},

	getDefaultProps: function() {
		return {
			reviews:  [ ],
			dragging: true,
			position: {
				lat: 0,
				lng: 0
			}
		}
	},

	componentDidMount: function() {
		this.map = L.map('map', {
			zoom:               13,
			center:             this.props.position,
			dragging:           this.props.dragging,
			zoomControl:        false,
			attributionControl: false
		});

		var tileLayer = L.tileLayer(
			'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 16 });
		tileLayer.addTo(this.map);

		this.setMarkersFor(this.props.reviews);
	},

	componentWillUnmount: function() {
		this.map.remove();
	},

	componentDidUpdate: function() {
		this.map.panTo(this.props.position);
		this.setMarkersFor(this.props.reviews);
	},

	/**
	 * Clear current markers and set markers for the given reviews.
	 */
	setMarkersFor: function(reviews) {
		this.markers = this.markers || [ ];

		for (var i = 0; i < this.markers.length; i++) {
			this.map.removeLayer(this.markers[i]);
		}

		this.markers = reviews.map(function(review, idx) {
			var marker = L.marker(review.position, {
				icon: L.divIcon({
					html:      '' + review.rating + '',
					className: 'icon-review rating-' + review.rating + ''
				}),
				zIndexOffset: -idx
			});

			// Clicking on a review will transition to 'details' page for the
			// given review.
			marker.on('click', router.transitionTo.bind(null,
				'/reviews/' + review.id + ''));

			return marker.addTo(this.map);
		}.bind(this));
	},

	render: function() {
		return (
			<div id="map" className="map-container" />
		);
	}
});

module.exports = Map;
