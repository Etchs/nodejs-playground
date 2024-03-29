var express = require('express');
var bodyParser = require('body-parser');
var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
	.all(function(req, res, next) {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		next();
	})
	.get(function(req, res, next) {
		res.end('Will send all the promotions to you!');
	})
	.post(function(req, res, next) {
		res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
	})
	.delete(function(req, res, next) {
		res.end('Deleting all promotions');
	});

promoRouter.route('/:promotionId')
	.all(function(req, res, next) {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		next();
	})
	.get(function(req, res, next) {
		res.end('Will send the details of promotion: ' + req.params.promotionId + ' to you.');
	})
	.put(function(req, res, next) {
		res.write('Will update the promotion: ' + req.params.promotionId + '\n');
		res.end('Will update the promotion: ' + req.body.name + ' with the new information: ' + JSON.stringify(req.body));
	})
	.delete(function(req, res, next) {
		res.end('Will delete the promotion: ' + req.params.promotionId);
	});

module.exports = promoRouter;