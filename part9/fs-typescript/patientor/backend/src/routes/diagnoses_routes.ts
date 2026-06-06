import { getDiagnoses } from '../services/diagnoses.ts';
import express from 'express';
const router = express.Router();


router.get('/', (_req, res) => {
    const diagnosesData = getDiagnoses();
    res.json(diagnosesData);
});

export default router;