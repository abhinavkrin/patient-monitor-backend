export interface IDevicePulseReading {
	value: number;
	time: number;
}

export interface IDeviceTempReading {
	value: number;
	time: number;
}

export interface IDeviceO2satReading {
	value: number;
	time: number;
}

export interface IDeviceBPReading {
	value: {
		s: number;
		d: number;
	}[];
	time: number;
}
export type IDeviceReading = IDeviceBPReading | IDeviceO2satReading | IDevicePulseReading | IDeviceTempReading;

export interface IDeviceReadings {
  pulse: IDevicePulseReading[];
	temp: IDeviceTempReading[];
	O2sat: IDeviceTempReading[];
	BP: IDeviceBPReading[];
}
export interface IDeviceData {
	token: string;
	user_id: string | undefined;
	readings: IDeviceReadings;
}