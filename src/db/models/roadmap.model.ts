import {Schema, model} from 'mongoose';


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
    author: String,
    isActive: Boolean,
    versions: [RoadmapVersionSchema]
});

RoadmapSchema.virtual('steps').get(function() {
    return this.versions.pop().steps;
});

export let Roadmap = model('Roadmap', RoadmapSchema);
