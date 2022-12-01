import { Router } from "express";
import { IReading } from "../types/IReading";
import * as admin from 'firebase-admin';
import { verifyDevice } from "../lib/auth";
import createHttpError from "http-errors";
import { IDeviceBPReading, IDeviceData, IDeviceO2satReading, IDevicePulseReading, IDeviceReading, IDeviceTempReading } from "../types/IDeviceData";
import { analyzeData } from "../lib/analyzeData";
import { getIdFromToken } from "../lib/getIdFromToken";

const router = Router();

router.route('/')
	.post(verifyDevice,async (req,res,next) => {
		/*
			r -> readings
		*/
		let readings = req.body.r as IReading | IReading[];
		const token = req.deviceToken;
		const deviceId = await getIdFromToken(token);

		if(!Array.isArray(readings)){
			readings = [readings];
		}
		const reference =  admin.database().ref(`/devices/${deviceId}`);
		const data = await admin.database().ref(reference).get();
		if(!data.exists()){
			return next(new createHttpError[404]("Device not found+"));
		}

		const deviceData = data.toJSON() as IDeviceData;
		
		if(!deviceData.user_id){
			return next(new createHttpError.BadRequest("No user has been registered for this device"));
		}
		const time = admin.database.ServerValue.TIMESTAMP;

		await Promise.all(readings.map( r => {
			let readingsRef: admin.database.Reference | null = null;
			let newData: Object | null = null;
			if(r.n === 'pulse'){
				readingsRef = reference.child(`/readings/${r.n}`);
				newData = {
					value: r.v,
					time
				}
			} else if(r.n === 'o2sat'){
				readingsRef = reference.child(`/readings/${r.n}`);
				newData = {
					value: r.v,
					time
				}
			} else if(r.n === 'bp'){
				readingsRef = reference.child(`/readings/${r.n}`);
				newData = {
					value: {
						s: r.v.s,
						d: r.v.d
					},
					time
				}
			} else if(r.n === 'temp') {
				readingsRef = reference.child(`/readings/${r.n}`);
				newData = {
					value: r.v,
					time
				}
			}
			if(readingsRef){
				return readingsRef.push(newData);
			}
			return null;
		}).filter( d => !d)
		);
		res.json({
			msg: 'ok'
		});
		analyzeData(deviceId);
	});

export default router;