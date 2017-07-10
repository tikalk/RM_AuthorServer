/**
 * Created by robertferentz on 10/07/17.
 */
import { Router } from 'express'

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
            res.json({
                msg:'Road map added'
            })
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
