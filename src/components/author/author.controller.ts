import {Author} from '../../db/models/author.model';
import * as _ from 'lodash';

// export function create(req, res) {
//
//     let roadmap = new Author(req.body);
//
//     roadmap.save((err, roadmap) => {
//         res
//             .status(err ? 400 : 200)
//             .jsonp(err ? {err} : getLeanItem(roadmap));
//     });
// }
//
// export function getList(req, res) {
//
//     let query = <any>_.get(req, 'query', {});
//
//     if(query.q) {
//         query.title = new RegExp(query.q, 'i');
//         delete query.q;
//     }
//
//     Author
//         .find(query)
//         .select('-versions')
//         .exec(
//             (err, list) => {
//                 res.jsonp(list.toObject({virtuals: true}).map(getLeanItem));
//             },
//             err => res.status(400).jsonp({err})
//         );
// }
