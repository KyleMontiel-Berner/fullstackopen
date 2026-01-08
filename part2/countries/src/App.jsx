import { useState } from "react";
import "./App.css";
import Note from "./components/Note.jsx";

const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Course course={course} />
      <Total course={course} />
    </div>
  );
};

const Course = ({ course }) => {
  const allParts = course.reduce(
    (acc, curr) => (acc = acc.concat(curr.parts)),
    []
  );
  const allIds = allParts.map((part) => ({ ...part, id: 0 }));
  const finalList = allIds.map((part) => ({
    ...part,
    id: crypto.randomUUID(),
  }));
  return finalList.map((part) => (
    <Parts key={part.id} name={part.name} exercises={part.exercises} />
  ));
};

const Header = ({ course }) => <h1>{course.name}</h1>;

const Parts = (prop) => (
  <p>
    {prop.name} {prop.exercises}
  </p>
);
const Total = ({ course }) => {
  const exerciseTotal = course
    .reduce((acc, curr) => (acc = acc.concat(curr.parts)), [])
    .reduce((acc, curr) => (acc += curr.exercises), 0);
  return <p>total of {exerciseTotal} exercises</p>;
};

export default App;
