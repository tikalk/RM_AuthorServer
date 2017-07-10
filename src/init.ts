declare const process: any;


import {DB} from './db/db';
import * as express from 'express';
import * as bodyParser from 'body-parser';


export function init(modules) {
    let app = express();

    allowOrigin(app);

    // parse application/json
    app.use(bodyParser.json());

    authMiddleware(app);

    modules.forEach(module => module(app));

    DB();

    app.listen(process.env.PORT || 3000, () => console.log('\n\n\napi server is live\n\n\n'));
}

function allowOrigin(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}

function authMiddleware(app) {
    app.use(function (req, res, next) {
        res.userid = '0';
        next();
    });
}
