import {Author} from '../../db/models/author.model';
import * as _ from 'lodash';

export function create(req, res) {

    let author = new Author({
        user: req.userId
    });

    author.save((err, author) => {
        res
            .status(err ? 400 : 200)
            .jsonp(err ? {err} : author);
    });
}

export function getItem(req, res) {

    Author
        .find({user: req.userId})
        .exec(
            (err, list) => {
                console.log('found author by userId: ', list)
                res.jsonp(list);
            },
            err => res.status(400).jsonp({err})
        );
}

export function getList(req, res) {

    Author
        .find({})
        .exec(
            (err, list) => {
                console.log('found authors: ', list)
                res.jsonp(list);
            },
            err => res.status(400).jsonp({err})
        );
}

export function rateRoadmap(req, res) {
    Author
        .findById(_.get(req, 'query.authorId'))
        .select('ratings')
        .exec(
            (err, author) => {
                let rating = author
                    .ratings
                    .filter(rating => rating.user === req.userId)
                    .shift();

                if (rating) {
                    rating.rating = req.body.rating;
                } else {
                    rating = {
                        user: req.userId,
                        rating: req.query.rating
                    };
                    author.ratings.push(rating);
                }


                author.save((err) => {
                    res
                        .status(err ? 400 : 200)
                        .jsonp(err ? {err} : rating);
                });

            },
            err => res.status(400).jsonp({err})
        );
}

export function getUserRating(req, res) {
    Author
        .findById(_.get(req, 'query.authorId'))
        .select('ratings')
        .exec(
            (err, author) => {
                const rating = _.extend({user: req.userId, rating: 0}, author
                    .ratings
                    .filter(rating => rating.user === req.userId)
                    .shift());

                res.status(200).jsonp(rating);

            },
            err => res.status(400).jsonp({err})
        );
}

