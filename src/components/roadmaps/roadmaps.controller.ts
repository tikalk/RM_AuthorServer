import {Roadmap} from '../../db/models/roadmap.model';

export function create(req, res) {

    let roadmap = new Roadmap(req.body);

    roadmap.save((err, roadmap) => {
        res
            .status(err ? 400 : 200)
            .jsonp(err ? {err} : roadmap);
    });
}

export function getList(req, res) {

    let query = <any>{};

    Roadmap
        .find(query)
        .exec(
            (err, list) => res.jsonp(list),
            err => res.status(400).jsonp({err})
        );
}

export function remove(req, res) {

    Roadmap.findById(req.params.roadmapId)
        .exec((err, roadmap) => {
            if(err) {
                return res.json(400).json({err: new Error('Roadmap not found')});
            } else {
                roadmap.remove((err) => {
                    res
                        .status(err ? 400 : 200)
                        .jsonp(err ? {err} : roadmap);
                });
            }
        });
}

export function getItem(req, res) {

    Roadmap
        .findById(req.query.roadmapId)
        .exec(
            (err, roadmap) => res.jsonp(roadmap),
            err => res.status(400).jsonp({err})
        );
}

