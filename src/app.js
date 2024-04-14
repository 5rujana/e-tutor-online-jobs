import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { LIMIT } from "./constants"  
const app = express()

// app.use() is used for all the configurations,middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN, //  CORS_ORIGIN defines on what locations we are accepting rrquests
    credentials:true
}))

app.use(express.json({
    limit: LIMIT
}))

app.use(express.urlencoded({
    extended:true, //inner objects are possible (object ke andar object)
    limit: LIMIT
}))

app.use(express.static("public")) //to store public asserts

app.use(cookieParser())

export { app }