import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { appEnv } from "../config/env";

export interface CustomRequest extends Request {
  decoded: string | JwtPayload;
}

const secret = appEnv.general.SECRET_KEY as string;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the header
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  // Verify the token
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.verify(token as string, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Add the decoded user data to the request object
    (req as CustomRequest).decoded = decoded;

    // Call the next middleware
    next();
  });
};
