interface TotalObject {
    height: number,
    weight: number,
    bmi: string
}

const calculateBmi = (height : number, weight: number): TotalObject => {
    
    const kg = weight;
    const meters = height / 100;
    const bmi = weight / (meters * meters);
    let message;

    if (bmi < 18.5) {
            message = 'Underweight range';}
        else if (bmi >= 18.5 && bmi < 25) {
            message = 'Normal range';}
        else if (bmi >= 25 && bmi < 30) {
            message = 'Overweight range';}
        else if (bmi >= 30) {
            message = 'Obese range';}
        else {
            throw new Error();
        }
    
    return {
        weight: kg,
        height: height,
        bmi: message
    };
};

if (process.argv[1] === import.meta.filename) {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);
    console.log(calculateBmi(height, weight));
}

export { calculateBmi };