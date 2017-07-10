/**
 * Created by robertferentz on 10/07/17.
 */
import * as express from 'express'

const port: number = 8080


const app = express()

app.listen(port)

app.get('/', (req, res)=> {
    res.send('Hello world!')
})

console.log(`Server started on port ${port}`)
