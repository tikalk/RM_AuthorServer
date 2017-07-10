import {Roadmap} from '../../db/models/roadmap.model';
import * as _ from 'lodash';

function getLeanItem(item) {
    let data = item.toObject({virtuals: true});
    delete data.versions;
    return data;
}

function setNewVersion(roadmap, steps) {
    if(!_.isArray(steps)) return;
    if(_.isEqual(roadmap.steps.toObject(), steps)) return;

    let lastVersion = roadmap.versions.pop();

    roadmap.versions.push({
        version: (Number(lastVersion.version) + 1).toFixed(),
        steps
    });
}

export function create(req, res) {

    let roadmap = new Roadmap(req.body);

    roadmap.save((err, roadmap) => {
        res
            .status(err ? 400 : 200)
            .jsonp(err ? {err} : getLeanItem(roadmap));
    });
}

export function getList(req, res) {

    let query = <any>_.get(req, 'query', {});

    if(query.q) {
        query.title = new RegExp(query.q, 'i');
        delete query.q;
    }

    Roadmap
        .find(query)
        .select('-versions')
        .exec(
            (err, list) => {
                res.jsonp(list.toObject({virtuals: true}).map(getLeanItem));
            },
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
                        .jsonp(err ? {err} : getLeanItem(roadmap));
                });
            }
        });
}

export function getItem(req, res) {
    Roadmap
        .findById(_.get(req, 'query.roadmapId'))
        .exec(
            (err, roadmap) => res.jsonp(getLeanItem(roadmap)),
            err => res.status(400).jsonp({err})
        );
}

export function edit(req, res) {
    Roadmap.findById(req.params.roadmapId)
        .exec((err, roadmap) => {
            if(err) {
                return res.json(400).json({err: new Error('Roadmap not found')});
            } else {

                _.extend(roadmap, _.pick(req.body, ['title', 'stepResources', 'exercise', 'testFile', 'isActive']));
                setNewVersion(roadmap, req.body.steps);

                roadmap.save((err) => {
                    res
                        .status(err ? 400 : 200)
                        .jsonp(err ? {err} : getLeanItem(roadmap));
                });
            }
        });
}

