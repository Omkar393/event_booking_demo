import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import { dbConnection } from './db/index.js'
import Routes from './routes/index.js'

dotenv.config()

dbConnection()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())

app.use('/demo', Routes)

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is runing on port ${process.env.PORT}`);
})