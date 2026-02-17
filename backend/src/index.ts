import "dotenv/config";
import express from "express";
import { Env } from "./config/env.config";
import cors from "cors"
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { BadRequestException } from "./utils/app-error";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import connectDatabase from "./config/database.config";
import authRoutes from "./routes/auth.route";
import passport from "passport";
import "./config/passport.config";
import { passportAuthenticateJwt } from "./config/passport.config";
import userRoutes from "./routes/user.route";


const app=express();
const BASE_URL=Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(
    cors({
        origin:Env.FRONTEND_ORIGIN,
        credentials:true,
    })
);


//without async handler
// app.get("/",(req,res,next)=>{
//     try{
//         //throw new BadRequestException("This is a test error")
//         res.status(HTTPSTATUS.OK).json({
//             message:"Hello from server!"
//         });

//     }catch(error){
//         next(error);
//     }
// });

//with async handler
app.get(
  "/",
  asyncHandler(async(req, res, next) => {
    throw new BadRequestException("This is a test error");
    res.status(HTTPSTATUS.OK).json({
      message: "Hello from server!",
    });
  }),
);

app.use(`${BASE_URL}/auth`,authRoutes);
app.use(`${BASE_URL}/user`,passportAuthenticateJwt,userRoutes);

app.use(errorHandler);

app.listen(Env.PORT,async ()=>{
    await connectDatabase();
    console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
