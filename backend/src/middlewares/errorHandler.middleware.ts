import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/app-error";
import { z,ZodError } from "zod";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import { Response } from "express";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

export const errorHandler:ErrorRequestHandler=(err,req,res,next):any=>{
    console.log("Error occured on PATH:",req.path,"Error:",err);

    if(err instanceof ZodError){
        return formatZodError(res,err);
    }

    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message:err.message,
            errorCode:err.errorCode
        });
    }


    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message:"Internal Server Error",
        error:err?.message || "Unknown Error Occurred"
    })

}