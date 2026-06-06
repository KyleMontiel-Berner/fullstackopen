export interface patientInfo {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export interface diagnosesInfo {
    code: string,
    name: string,
    latin?: string
}

export type safePatientData = Omit<patientInfo, 'ssn'>;