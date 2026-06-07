export interface PatientInfo {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export interface DiagnosesInfo {
    code: string,
    name: string,
    latin?: string
}

export const Gender = {
    male: 'male',
    female: 'female',
    other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export type SafePatientData = Omit<PatientInfo, 'ssn'>;
export type NewPatientEntry = Omit<PatientInfo, 'id'>; 