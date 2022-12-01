import { NextFunction, Request , RequestHandler, Response } from 'express';
import * as admin from 'firebase-admin'; 

declare global {
  namespace Express {
    interface Request  {
      token: admin.auth.DecodedIdToken;
			user: admin.auth.UserRecord;
      rawBody: Buffer;
      isAuthenticated: boolean;
      deviceToken: string;
    }
    interface Response {} {
      
    }
    interface NextFunction {}
  }
} 

export {};
