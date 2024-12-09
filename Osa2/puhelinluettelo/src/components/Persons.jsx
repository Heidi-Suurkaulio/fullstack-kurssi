const Person = ({ name, number }) => {
    return <li> {name} {number} </li>
}

const Persons = ({ list }) => {
    return <ul>
        {list.map(p =>
            <Person key={p.name} name={p.name} number={p.number} />
        )}
    </ul>
}

export default Persons