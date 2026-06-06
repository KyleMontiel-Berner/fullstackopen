import data from '../../data/patients.ts';
import type { safePatientData } from '../types.ts';


const getSensitiveInfo = () : safePatientData[] => {
    return data.map(({id, name, dateOfBirth, gender, occupation}) =>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    })
    );
};

export default getSensitiveInfo;