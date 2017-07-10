/**
 * Created by robertferentz on 10/07/17.
 */
import * as express from 'express'
import * as bodyParser from 'body-parser'
const port: number = 8080

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port)

app.get('/', (req:express.Request, res: express.Response) => {
    res.send('Hello world!')
})

console.log(`Server started on port ${port}`)
