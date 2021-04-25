import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part, excercise }) => (
  <p>
    {part} {excercise}
  </p>
);

const Content = ({ parts }) => (
  <div>
    <Part part={parts[0].name} excercise={parts[0].excercises} />
    <Part part={parts[1].name} excercise={parts[1].excercises} />
    <Part part={parts[2].name} excercise={parts[2].excercises} />
  </div>
);

const Total = ({ ex1, ex2, ex3 }) => (
  <p>Number of exercises {ex1 + ex2 + ex3}</p>
);

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
      />
      <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
