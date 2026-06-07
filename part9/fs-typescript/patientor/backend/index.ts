import express from 'express';
import diagnosesRouter from './src/routes/diagnoses_routes.ts';
import patientRouter from './src/routes/patients_routes.ts';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is connect to port ${PORT}`);
});