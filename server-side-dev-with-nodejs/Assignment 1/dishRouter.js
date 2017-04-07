var express = require('express');
var bodyParser = require('body-parser');
var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
	.all(function(req, res, next) {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		next();
	})
	.get(function(req, res, next) {
		res.end('Will send all the dishes to you!');
	})
	.post(function(req, res, next) {
		res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
	})
	.delete(function(req, res, next) {
		res.end('Deleting all dishes');
	});

dishRouter.route('/:dishId')
	.all(function(req, res, next) {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		next();
	})
	.get(function(req, res, next) {
		res.end('Will send the details of dish: ' + req.params.dishId + ' to you.');
	})
	.put(function(req, res, next) {
		res.write('Will update the dish: ' + req.params.dishId + '\n');
		res.end('Will update the dish: ' + req.body.name + ' with the new information: ' + JSON.stringify(req.body));
	})
	.delete(function(req, res, next) {
		res.end('Will delete the dish: ' + req.params.dishId);
	});

module.exports = dishRouter;