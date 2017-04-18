var express = require('express');
var bodyParser = require('body-parser');
var Promotions = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Promotions.find({}, function(err, promos) {
			if (err) throw err;
			res.json(promos);
		});
	})
	.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
		Promotions.create(req.body, function(err, promo) {
			if (err) throw err;
			var id = promo._id;
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Added the promo with id: ' + id);
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
		Promotions.remove({}, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

promoRouter.route('/:promotionId')
	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Promotions.findById(req.params.promotionId, function(err, promo) {
			if (err) throw err;

			res.json(promo);
		});
	})
	.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
		Promotions.findByIdAndUpdate(req.params.promotionId, {
			$set: req.body
		}, {
			new: true
		}, function(err, promo) {
			if (err) throw err;
			res.json(promo);
		});
	})
	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
		Promotions.findByIdAndRemove(req.params.promotionId, function(err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});

module.exports = promoRouter;