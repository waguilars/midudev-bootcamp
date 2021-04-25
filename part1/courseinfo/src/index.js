import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part, excercise }) => (
  <p>
    {part} {excercise}
  </p>
);

const Content = ({ parts: [part1, part2, part3] }) => {
  return (
    <div>
      <Part part={part1.name} excercise={part1.exercises} />
      <Part part={part2.name} excercise={part2.exercises} />
      <Part part={part3.name} excercise={part3.exercises} />
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
