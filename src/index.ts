/**
 * Created by robertferentz on 10/07/17.
 */
import * as express from 'express'
import rmRouter from './routes/RoadmapRoutes'


import * as bodyParser from 'body-parser'

import * as winston from 'winston'
const port: number = 8080

const app = express();

app.listen(port);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req:express.Request, res: express.Response) => {
    res.send('Hello world!')
})

app.use('/roadmaps/', rmRouter)


winston.info(`Server started on port ${port}`)
