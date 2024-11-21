const Course = ({ course }) => {

  const Header = ({ course }) => {
    return (
      <h1> {course} </h1>
    )
  }

  const Part = ({ part, exercises }) => {
    return (
      <p>
        {part} {exercises}
      </p>
    )
  }

  // key mukana, ei kayteta. 
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map(p =>
          <Part key={p.id} part={p.name} exercises={p.exercises} />
        )}
      </>
    )
  }

  const Total = ({ parts }) => {
    const summa = parts.reduce((ac, p) =>
      ac + p.exercises, 0,)
    return (
      <p>Number of exercises {summa} </p>
    )
  }

  return (
    <>
      <Header course={course['name']} />
      <Content parts={course['parts']} />
      <Total parts={course['parts']} />
    </>
  )
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App