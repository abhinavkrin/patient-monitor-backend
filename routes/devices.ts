import { Router } from "express";
import * as admin from 'firebase-admin';
import { verifyUser } from "../lib/auth";
import createHttpError from "http-errors";
import { IDeviceData } from "../types/IDeviceData";
import { DB } from "../lib/common";
import { getIdFromToken } from "../lib/getIdFromToken";
import { firebaseTimestampsConverter } from "../lib/firebaseHelper";
const router = Router();

router.route('/')
	.get(verifyUser, async (req ,res, next) => {
		try {
			const userId = req.user.uid;
			const snapshot = await admin
				.firestore()
				.collection(DB.DEVICES)
				.where("user_id", "==", userId)
				.withConverter(firebaseTimestampsConverter)
				.get();
			const devices = snapshot.docs
				.filter((d) => d.exists)
				.map((d) => ({
					id: d.id,
					...d.data(),
				}));
			res.json(devices);
		} catch (e) {
			console.error(e);
			return next(e);
		}
	})
	.post(verifyUser,async (req,res,next) => {
		const deviceToken = req.body.deviceToken;
		const name = req.body.name;
		const deviceId = await getIdFromToken(deviceToken);
		const reference =  admin.database().ref(`/devices/${deviceId}`);

		const data = await admin.database().ref(reference).get();
		if(!data.exists){
			return next(new createHttpError[404]("Device not found"));
		}
		const deviceData = data.toJSON() as IDeviceData;

		if(deviceData?.user_id){
			return next(new createHttpError.BadRequest("Already registered."));
		}

		await admin.database().ref(reference).child('user_id').set(req.user.uid);
		await admin.firestore().collection(DB.DEVICES).doc(deviceId).update({
			user_id: req.user.uid,
			registered_at: admin.firestore.Timestamp.now(),
			name
		});
		res.json({
			msg: 'ok',
			deviceId
		});
	});

router.route('/:deviceId')
	.get(verifyUser, async (req ,res, next) => {
		try {
			const userId = req.user.uid;
			const snapshot = await admin
				.firestore()
				.collection(DB.DEVICES)
				.withConverter(firebaseTimestampsConverter)
				.doc(req.params.deviceId)
				.get();
			const device = snapshot.data();

			if(!device || device.user_id != userId){
				return next(new createHttpError.NotFound("Device Not Found"));
			}
			res.json(device);
		} catch (e) {
			console.error(e);
			return next(e);
		}
	})
export default router;