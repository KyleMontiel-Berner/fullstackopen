import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res)=> {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({error: 'malformatted parameters'});
    }

    const bmi = calculateBmi(height, weight);

    return res.send(bmi);
});


app.post('/exercises', (req, res) => {
    const {daily_exercises, target} = req.body as {daily_exercises: number[], target: number};

    if (!daily_exercises || !target) {
        return res.status(400).json({error: 'parameters missing'});
    }

    if (daily_exercises.some(isNaN) || typeof target != 'number') {
        return res.status(400).json({error: 'malformatted parameters'});
    } 

    const workoutStats = calculateExercises(daily_exercises, target);

    return res.json(workoutStats);
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});