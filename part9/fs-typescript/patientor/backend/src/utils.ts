import { type NewPatientEntry, Gender } from "./types.ts";


const isString = (text: unknown): text is string => {
    return(typeof text === 'string' || text instanceof String);
};

const isGender = (param: string): param is Gender => {
    return (Object.values(Gender) as string[]).includes(param);
};

const parseString = (text: unknown, fieldName: string): string => {
    if (!text || !isString(text) || !fieldName || !isString(fieldName)) {
        throw new Error('Incorrect or missing name');
    }
    return text;
};

const parseGender = (text: unknown): Gender => {
    if (!text || !isString(text) || !isGender(text)) {
        throw new Error('Incorrect or missing gender');
    }
    return text;
};

const parseName = (text: unknown) => parseString(text, 'name');
const parseSSN = (text: unknown) => parseString(text, 'ssn');
const parseDateOfBirth = (text: unknown) => parseString(text, 'dateOfBirth');
const parseOccupation = (text: unknown) => parseString(text, 'occupation');

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            ssn: parseSSN(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: fields missing');
};

export default parseNewPatientEntry;