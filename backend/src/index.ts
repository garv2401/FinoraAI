import "dotenv/config";
import express from "express";
import { Env } from "./config/env.config";
import cors from "cors"
import { HTTPSTATUS } from "./config/http.config";


const app=express();
const BASE_URL=Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    cors({
        origin:Env.FRONTEND_ORIGIN,
        credentials:true,
    })
);

app.get("/",(req,res,next)=>{
    res.status(HTTPSTATUS.OK).json({
        message:"Hello from server!"
    })
});

app.listen(Env.PORT,()=>{
    console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
