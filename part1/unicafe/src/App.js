import React, { useState } from 'react';

const Button = ({ setValue, text }) => {
  return <button onClick={() => setValue((prev) => prev + 1)}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {text === 'positive' ? '%' : ''}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = good / all;

  return (
    <>
      <h2>statistics</h2>

      {!all || !average || !positive ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average.toFixed(2)} />
          <Statistic text="positive" value={positive.toFixed(2)} />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" setValue={setGood} />
      <Button text="neutral" setValue={setNeutral} />
      <Button text="bad" setValue={setBad} />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
