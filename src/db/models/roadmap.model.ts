import {Schema, model} from 'mongoose';

const RoadmapSchema = new Schema({
    title: String,
    stepResources: String,
    exercise: String,
    testFile: String,
    version: String,
    author: String,
    isActive: Boolean
});

export let Roadmap = model('Roadmap', RoadmapSchema);