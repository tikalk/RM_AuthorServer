import {rating} from '../../db/models/rating.model';
import * as _ from 'lodash';

function getLeanItem(item) {
    let data = item.toObject({virtuals: true});
    delete data.versions;
    return data;
}

export function create(req, res) {

    let rate = new rating(req.body);

    rate.save((err, roadmap) => {
        res
            .status(err ? 400 : 200)
            .jsonp(err ? {err} : getLeanItem(roadmap));
    });
}

export function getItem(req, res) {
    rating
        .findById(_.get(req, 'query.user'))
        .exec(
            (err, rating) => res.jsonp(getLeanItem(rating)),
            err => res.status(400).jsonp({err})
        );
}

