/**
 * Created by robertferentz on 10/07/17.
 */
import * as express from 'express'
import * as mongo from 'mongodb'
const mongoDb = mongo.MongoClient;
const url = "mongodb://tikal:123123@ds153682.mlab.com:53682/tikal-roadmap";

import * as bodyParser from 'body-parser'
const port: number = 8080

const app = express();

app.listen(port);
const app = express()

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port)

app.get('/', (req:express.Request, res: express.Response) => {
    res.send('Hello world!')
})

console.log(`Server started on port ${port}`)
