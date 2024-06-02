const Header = ({ name }) => {
  console.log("Header:", name);
  return <h1>{name}</h1>;
};

const Part = ({ name, exercises }) => {
  console.log("Part:", name, exercises);
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log("Total exercises:", totalExercises);
  return (
    <p>
      <b>total of {totalExercises} exercises</b>
    </p>
  );
};
const Content = ({ parts }) => {
  console.log("Content:", parts);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}

      <Total parts={parts} />
    </>
  );
};

const Course = ({ course }) => {
  console.log("Course:", course);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course