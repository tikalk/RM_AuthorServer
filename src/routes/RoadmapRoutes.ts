/**
 * Created by robertferentz on 10/07/17.
 */
import { Router } from 'express'
import {Roadmap} from '../db/models/roadmap.model';
import * as _ from 'lodash'

class RoadmapRoutes {
    router: Router
    constructor(){
        this.router = new Router()
    }

    init(){
        this.router.get('/', (req, res) => {
            res.json({
                msg:'Road map list'
            })
        })

        this.router.put('/', (req, res) => {
            res.json({
                msg:'Road map updated'
            })
        })

        this.router.post('/', (req, res) => {
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

        this.router.delete('/', (req, res) => {
            res.json({
                msg:'Road map added'
            })
        })


    }
}

const routes = new RoadmapRoutes()
routes.init()

export default routes.router
