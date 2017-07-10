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


