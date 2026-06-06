import getSensitiveInfo from "../services/patients.ts";
import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
    const data = getSensitiveInfo();
    res.json(data);
});

export default router;