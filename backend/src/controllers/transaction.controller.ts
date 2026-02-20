import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { Request,Response } from "express";
import { createTransactionSchema } from "../validators/transaction.validator";


export const createTransaction=asyncHandler(async(req:Request,res:Response)=>{
    const body=createTransactionSchema.parse(req.body);
    const userId=req.user?._id;
    return res.status(HTTPSTATUS.CREATED).json({
        message:"Transaction created successfully"
    })
})