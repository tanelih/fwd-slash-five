/**
 * @jsx React.DOM
 */

'use strict';

var React  = require('react');
var router = require('react-router');

var App         = require('./app.jsx');
var HomePage    = require('./pages/home.jsx');
var DetailsPage = require('./pages/details.jsx');

var Route        = router.Route;
var Routes       = router.Routes;
var DefaultRoute = router.DefaultRoute;

React.renderComponent(
	<Routes location="history">
		<Route path="/" handler={App}>
			<Route path="/reviews"     handler={HomePage} />
			<Route path="/reviews/:id" handler={DetailsPage} />
			<DefaultRoute handler={HomePage} />
		</Route>
	</Routes>,
	document.getElementById('app'));
