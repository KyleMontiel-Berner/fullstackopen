const calculateBmi = (args: string[]): string => {
    
    const meters = Number(args[2]) / 100
    const bmi = Number(args[3]) / (meters * meters)

    if (bmi < 18.5) {
            return ('Underweight range')}
        else if (bmi >= 18.5 && bmi < 25) {
            return ('Normal range')}
        else if (bmi >= 25 && bmi < 30) {
            return ('Overweight range')}
        else if (bmi >= 30) {
            return ('Obese range')}
        else throw new Error
}

console.log(calculateBmi(process.argv))