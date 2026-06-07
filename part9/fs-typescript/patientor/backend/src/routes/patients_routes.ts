import patientService from "../services/patients.ts";
import parseNewPatientEntry from "../utils.ts";
import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
    const data = patientService.getSensitiveInfo();
    res.json(data);
});

router.post('/', (req, res) => {
    try{
    const entry = parseNewPatientEntry(req.body);
    const addedPatientData = patientService.addPatientInfo(entry);
    res.json(addedPatientData);
    } catch (error: unknown) {
        let errorMessage = 'Something when wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;