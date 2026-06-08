interface Total {
  totalExercises: number;
}
const Total = ({ totalExercises }: Total) => {
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
