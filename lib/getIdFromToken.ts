import * as admin from "firebase-admin";
import createHttpError from "http-errors";
import { DB } from "./common";
export const getIdFromToken = async (token: string) => {
	const deviceDoc = await admin
		.firestore()
		.collection(DB.DEVICES)
		.where("token", "==", token)
		.get();
	if (deviceDoc.empty) {
		throw new createHttpError.NotFound("Device not found");
	}
	return deviceDoc.docs[0].id;
};
