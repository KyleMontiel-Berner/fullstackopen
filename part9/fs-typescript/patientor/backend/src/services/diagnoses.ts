import data from '../../data/diagnoses.ts';
import type { diagnosesInfo } from "../types.ts";


const getDiagnoses = () : diagnosesInfo[] => {
    return data;
};

export {getDiagnoses};

