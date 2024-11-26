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

export default Course