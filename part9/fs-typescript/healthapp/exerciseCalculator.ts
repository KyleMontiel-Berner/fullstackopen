interface Stats {
    periodLength: number;
    trainingDays: number;
    rating: number;
    success: boolean;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyStats: number[], target: number): Stats => {

    let rating;
    let ratingDescription;
    let success;
    const periodLength = dailyStats.length;
    const trainingDays = dailyStats.filter(x => x > 0).length;
    const average = dailyStats.reduce((acc, curr) => {
            return acc + curr;
        }, 0) / periodLength;
    
        if (average < .5) {
            rating = 1;
            ratingDescription = 'You need to up your game';
            success = false;
        }
        else if (average >= .5 && average <= 1) {
            rating = 2;
            ratingDescription = 'You are doing the right things';
            success = true;
        } else if (average > 1) {
            rating = 3;
            ratingDescription = 'You are a beast!';
            success = true;
        }
     else {
            throw new Error('Values need to be numbers');
        }

    return {
    periodLength,
    trainingDays,
    rating,
    success,
    ratingDescription,
    target,
    average
    };
};

export {calculateExercises};