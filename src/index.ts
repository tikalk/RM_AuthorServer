/**
 * Created by robertferentz on 10/07/17.
 */
import * as express from 'express'
import rmRouter from './routes/RoadmapRoutes'
import {Roadmap} from './db/models/roadmap.model';

import * as bodyParser from 'body-parser'
import * as _ from 'lodash'

import * as winston from 'winston'
const port: number = 8080

const app = express();

app.listen(port);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req:express.Request, res: express.Response) => {
    res.send('Hello world!')
})

app.post('/createItem', function (req, res, next){
    const item = _.get(req, 'req.body.item', '')
    if (!item) {
        console.log('request from client did not arrive correctly')
        res.status(404).send('Error, request from client not valid')
    }
    const roadmapItem = new Roadmap({
        title: String,
        stepResources: String,
        exercise: String,
        testFile: String,
        version: String,
        author: String,
        isActive: Boolean
    });
    roadmapItem.save(function (err) {
        if (err) {
            console.log(err);
            res.status(500).send('Error on mongo request')
        } else {
            console.log('item added to roadmap collection on mongo');
            res.status(201).send('Item successfully added to mongo')
        }
    });
})

app.use('/roadmaps/', rmRouter)


winston.info(`Server started on port ${port}`)
