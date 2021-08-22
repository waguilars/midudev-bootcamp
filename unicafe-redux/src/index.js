import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const Statistics = () => {
  const good = store.getState().good;
  const neutral = store.getState().ok;
  const bad = store.getState().bad;
  const all = good + neutral + bad
  const average = ((good - bad) / all).toFixed(2)
  const positive = (good / all) * 100
  return (
    <>
      <h1>Statistics</h1>
      {!good && !neutral && !bad ? (
        <p>no feedback given</p>
      ) : (
        <>
          <div>good {good}</div>
          <div>neutral {neutral}</div>
          <div>bad {bad}</div>
          <div>all {all}</div>
          <div>average {average}</div>
          <div>positive {positive}%</div>
          
        </>
      )}
    </>
  );
};

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    });
  };

  const neutral = () => {
    store.dispatch({
      type: 'OK',
    });
  };

  const bad = () => {
    store.dispatch({
      type: 'BAD',
    });
  };

  const reset = () => {
    store.dispatch({ type: 'ZERO' });
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <Statistics />
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
