interface Total {
  total: number;
}
const Total = ({ total }: Total) => {
  return <p>Number of exercises {total}</p>;
};

export default Total;
