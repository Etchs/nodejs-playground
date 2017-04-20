var express = require('express');
var bodyParser = require('body-parser');
var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
	.get(Verify.verifyOrdinaryUser, function(req, res, next) {
		Favorites.findOne({
				postedBy: req.decoded._doc._id
			})
			.populate('postedBy')
			.populate('dishes')
			.exec(function(err, fav) {
				if (err) throw err;
				res.json(fav);
			});
	})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
	Favorites.findOne({
			postedBy: req.decoded._doc._id
		})
		.exec(function(err, favorite) {
			if (err) {
				throw err;
			} else if (!favorite) {
				console.log('req.body: ', req.body);
				var newFav = {
					postedBy: req.decoded._doc._id,
					dishes: [req.body._id]
				};
				Favorites.create(newFav, function(err, createdFav) {
					if (err) throw err;
					res.json(createdFav);
				});
			} else {
				var index = favorite.dishes.indexOf(req.body._id);
				if (index === -1) {
					favorite.dishes.push(req.body._id);
				}
				favorite.save(function(err, updatedFav) {
					if (err) throw err;
					res.json(updatedFav);
				});
			}
		});
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
	Favorites.remove({
		'postedBy': req.decoded._doc._id
	}, function(err, result) {
		if (err) throw err;
		res.json(result);
	});
});

favoriteRouter.route('/:dishId')
	.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
		Favorites.findOne({
				postedBy: req.decoded._doc._id
			})
			.exec(function(err, favorite) {
				if (err) {
					throw err;
				} else if (!favorite) {
					var error = new Error('You don\'t have a record of favorites. Please create a favorite first!');
					error.status = 403;
					return next(error);
				} else {
					var index = favorite.dishes.indexOf(req.params.dishId);
					if (index > -1) {
						favorite.dishes.splice(index, 1);
					}
					favorite.save(function(err, updatedFav) {
						if (err) throw err;
						res.json(updatedFav);
					});
				}
			});
	});

module.exports = favoriteRouter;