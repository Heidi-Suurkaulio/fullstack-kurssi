const Persons = ({ list }) => {
    const Person = ({ name, number }) => {
        return <li> {name} {number} </li>
    }

    return <ul>
        {list.map(p =>
            <Person key={p.name} name={p.name} number={p.number} />
        )}
    </ul>
}

export default Persons