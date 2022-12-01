/*
Pulse rate is measured in bpm
Temp is measured in F
O2sat is measured in percentage
blood pressure is measured in mmHg -  systole and diastole
*/
export type Reading = 'pulse' | 'temp' | 'O2sat' | 'bp';
export type PulseReading = {
	n: 'pulse';
	v: number;
}

export type TempReading = {
	n: 'temp';
	v: number;
}

export type O2Reading = {
	n: 'o2sat';
	v: number;
}

export type BPReading = {
	n: 'bp';
	v: {
		s: number;
		d: number; 
	}
}


export type IReading = PulseReading | TempReading | O2Reading | BPReading;