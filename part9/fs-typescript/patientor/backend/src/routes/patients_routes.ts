import patientService from "../services/patients.ts";
import { type Request, type Response } from "express";
import { errorMiddleware, newPatientParser } from "../middleware.ts";
import type { NewPatientEntry, PatientInfo } from "../types.ts";
import express from 'express';
const router = express.Router();


router.get('/', (_req, res) => {
    const data = patientService.getSensitiveInfo();
    res.json(data);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientInfo>) => {
    const addedPatientData = patientService.addPatientInfo(req.body);
    res.json(addedPatientData);
});

router.use(errorMiddleware);

export default router;