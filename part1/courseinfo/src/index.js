import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part, excercise }) => (
  <p>
    {part} {excercise}
  </p>
);

const Content = ({ parts, excercises }) => (
  <div>
    <Part part={parts[0]} excercise={excercises[0]} />
    <Part part={parts[1]} excercise={excercises[1]} />
    <Part part={parts[2]} excercise={excercises[2]} />
  </div>
);

const Total = ({ ex1, ex2, ex3 }) => (
  <p>Number of exercises {ex1 + ex2 + ex3}</p>
);

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
        excercises={[exercises1, exercises2, exercises3]}
      />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
