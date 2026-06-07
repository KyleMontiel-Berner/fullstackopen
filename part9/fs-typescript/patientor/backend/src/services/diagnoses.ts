import data from '../../data/diagnoses.ts';
import type { DiagnosesInfo } from "../types.ts";


const getDiagnoses = () : DiagnosesInfo[] => {
    return data;
};

export {getDiagnoses};

