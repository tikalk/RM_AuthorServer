import {Schema, model} from 'mongoose';
import {RatingSchema} from "./rating.model";
import * as _ from 'lodash';


const AuthorSchema = new Schema({
    user: String,
    ratings: {
        type: [RatingSchema],
        default: []
    }
});



export let Author = model('Author', AuthorSchema);