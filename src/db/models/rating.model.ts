import {Schema, model} from 'mongoose';

const RatingSchema = new Schema({
    rating: {
        type: Number,
        min: [1, 'Rating between 1-5'],
        max: [5, 'Rating between 1-5']
    },
    user: String
});

export let rating = RatingSchema;