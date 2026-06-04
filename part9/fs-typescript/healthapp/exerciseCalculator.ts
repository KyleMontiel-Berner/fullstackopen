interface Stats {
    periodLength: number;
    trainingDays: number;
    rating: number;
    success: Boolean;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (args: string[]): Stats => {

    let rating
    let ratingDescription
    let success
    let target
    let periodLength
    let average
    let trainingDays
    let values

    if (args.length > 9) throw new Error('Only include 7 training days per set');

        
    if (args.slice(2).every(arg => !isNaN(Number(arg)))) {
        
        values = args.slice(2).map(Number)
        target = 2
        trainingDays = values.filter(x => x > 0).length;
        periodLength = values.length
        average = values.reduce((acc, curr) => {
            return acc + curr;
        }, 0) / values.length
    
        if (average < .5) {
            rating = 1
            ratingDescription = 'You need to up your game'
            success = false;
        }
        else if (average >= .5 && average <= 1) {
            rating = 2
            ratingDescription = 'You are doing the right things';
            success = true;
        } else  {
            rating = 3
            ratingDescription = 'You are a beast!'
            success = true
        }
     } else {
            throw new Error('Values need to be numbers')
        }

    return {
    periodLength,
    trainingDays,
    rating,
    success,
    ratingDescription,
    target,
    average,
    }
}

console.log(calculateExercises(process.argv))
