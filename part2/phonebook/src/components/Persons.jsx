const Persons = ({ list }) => (
  <div>
    {list.map((person) => (
      <h3 key={person.id}>
        {person.name} {person.number}
      </h3>
    ))}
  </div>
);

export default Persons;
