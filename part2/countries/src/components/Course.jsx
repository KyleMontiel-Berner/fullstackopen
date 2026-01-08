const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Content = ({ course }) => {
  return course.parts.map((part) => (
    <Parts key={part.id} name={part.name} exercises={part.exercises} />
  ));
};

const Header = ({ course }) => <h2>{course.name}</h2>;

const Parts = (prop) => (
  <p>
    {prop.name} {prop.exercises}
  </p>
);
const Total = ({ course }) => {
  const exerciseTotal = course.parts.reduce(
    (acc, curr) => (acc += curr.exercises),
    0
  );
  return <p>total of {exerciseTotal} exercises</p>;
};

export default Course;
