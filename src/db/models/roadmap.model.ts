import {Schema, model} from 'mongoose';
import {RatingSchema} from "./rating.model";
import * as _ from 'lodash';


const RoadmapStepSchema = new Schema({
    resources: String,
    exercise: String,
    testFile: String
});


const RoadmapVersionSchema = new Schema({
    version: String,
    steps: [RoadmapStepSchema]
});

const RoadmapSchema = new Schema({
    title: String,
    stepResources: String,
    exercise: String,
    testFile: String,
    currentVersion: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    isActive: Boolean,
    versions: [RoadmapVersionSchema],
    ratings: {
        type: [RatingSchema],
        default: []
    }
});

RoadmapSchema.virtual('steps').get(function() {
    return this.versions.pop().steps;
});

RoadmapSchema.virtual('rating').get(function() {
    return _.sum(this.ratings.map(item => item.rating)) / this.ratings.length;
});

export let Roadmap = model('Roadmap', RoadmapSchema);
