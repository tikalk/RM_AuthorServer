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
            res.send('hello roadmap routes')
        })
    }
}

const routes = new RoadmapRoutes()
routes.init()

export default routes.router
