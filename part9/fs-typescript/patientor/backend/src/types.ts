import { z } from 'zod';

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

export const NewEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export interface PatientInfo extends NewPatientEntry {
    id: string;
}