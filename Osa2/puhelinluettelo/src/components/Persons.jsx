const Person = ({ name, number, removeFn }) => {
    // ugly layout, fix later
    return <li> 
        {name} {number} 
        <button onClick={ removeFn }> delete </button>
    </li>
}


const Persons = ({ list, removeFn }) => {
    return <ul>
        {list.map(p =>
            <Person key={p.id} name={p.name} number={p.number} 
            removeFn={() => removeFn(p.name, p.id)} />
        )}
    </ul>
}

export default Persons