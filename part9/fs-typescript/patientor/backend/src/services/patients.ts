import data from '../../data/patients.ts';
import {v1 as uuid} from 'uuid';
import type { SafePatientData, PatientInfo, NewPatientEntry } from '../types.ts';


const getSensitiveInfo = () : SafePatientData[] => {
    return data.map(({id, name, dateOfBirth, gender, occupation}) =>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })
    );
};

const addPatientInfo = (entry: NewPatientEntry): PatientInfo => {
    const newEntry: PatientInfo = {
        id: uuid(),
        ...entry
    };
    data.push(newEntry);
    return newEntry;
};

export default {
    getSensitiveInfo,
    addPatientInfo
};