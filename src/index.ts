/**
 * Created by robertferentz on 10/07/17.
 */
import * as express from 'express'
import * as mongo from 'mongodb'
import rmRouter from './routes/RoadmapRoutes'

const mongoDb = mongo.MongoClient;
const url = "mongodb://tikal:123123@ds153682.mlab.com:53682/tikal-roadmap";

import * as bodyParser from 'body-parser'
import * as winston from 'winston'
const port: number = 8080

const app = express();

app.listen(port);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoDb.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

// mongoDb.connect(url, function(err, db) {
//     if (err) throw err;
//     const myobj = { name: "Company Inc", address: "Highway 37" };
//     db.collection("customers").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("1 record inserted");
//         db.close();
//     });
// });


app.get('/', (req:express.Request, res: express.Response) => {
    res.send('Hello world!')
})

app.use('/roadmaps/', rmRouter)
winston.info(`Server started on port ${port}`)
