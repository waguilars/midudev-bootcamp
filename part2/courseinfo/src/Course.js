
const Header = ({ course }) => <h1>{course}</h1>;

const Part = ({ part, excercise }) => (
  <p>
    {part} {excercise}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} excercise={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return <strong>total of {total} exercises</strong>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course