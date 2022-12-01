import {Request, Response, NextFunction} from 'express'
import * as admin from 'firebase-admin'; 
import createHttpError from 'http-errors';

const getToken = (req: Request) => {
	if (req.header('Authorization')) {
		return req.header('Authorization')?.split('Bearer ')[1];
	}
	return null;
}
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const idToken = getToken(req);
		if (!idToken) {
			throw new Error("ID Token not found!");
		} else {
			const token = await admin.auth().verifyIdToken(idToken, true)
			req.token = token;
			req.user = await admin.auth().getUser(token.uid);
			req.isAuthenticated = true;
			return next();
		}
	} catch (e) {
		next(new Error("Unauthorized access"));
		console.error(e);
	}
}

export const verifyUserOptional = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const idToken = getToken(req);
		if (idToken) {
			const token = await admin.auth().verifyIdToken(idToken, true)
			req.token = token;
			req.user = await admin.auth().getUser(token.uid);
			req.isAuthenticated = true;
		} else {
			req.isAuthenticated = false;
		}
		return next();
	} catch (e) {
		next(new Error("Unauthorized access"));
		console.error(e);
	}
}

const getDeviceTokenFromHeader = (req: Request) => {
	if (req.header('DeviceToken')) {
		return req.header('DeviceToken');
	}
	return null;
}
export const verifyDevice = async (req: Request, res: Response, next: NextFunction) => {
	const deviceToken = getDeviceTokenFromHeader(req);
	if(deviceToken){
		req.deviceToken = deviceToken;
		return next();
	}
	throw new createHttpError.Unauthorized("Device token not found.")
}