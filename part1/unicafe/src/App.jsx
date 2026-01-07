import { useState } from "react";

const StatisticLine = (prop) => (
  <tr>
    <td>{prop.text}</td>
    <td>{prop.value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, average, positive }) => {
  if (good + neutral + bad === 0) {
    return <div>No Feedback Given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="average" value={average} />
        <StatisticLine
          text="positive"
          value={(positive * 100).toFixed(1) + " %"}
        />
      </tbody>
    </table>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} value={good} text="good" />
      <Button onClick={increaseNeutral} value={neutral} text="neutral" />
      <Button onClick={increaseBad} value={bad} text="bad" />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        average={(good - bad) / (good + neutral + bad)}
        positive={good / (good + neutral + bad)}
      />
    </div>
  );
};
export default App;
