import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" 
const app = express()

// app.use() is used for all the configurations,middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN, //  CORS_ORIGIN defines on what locations we are accepting rrquests
    credentials:true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended:true, //inner objects are possible (object ke andar object)
    limit: "16kb"
}))

app.use(express.static("public")) //to store public asserts

app.use(cookieParser())

//routes import

import userRouter from "./routes/user.routes.js"

//routes declaration
//we use app.use instead of app.get becuase in app.get we used to get routes and controllers in same place but it's different case here
app.use("/api/v1/users",userRouter)
//https://localhost:8000/api/v1/users/register





export { app }