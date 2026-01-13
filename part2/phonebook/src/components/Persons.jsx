const Persons = ({ list, onRemove }) => (
  <div>
    {list.map((person) => (
      <div key={person.id}>
        <h3>
          {person.name} {person.number}
        </h3>
        <button type="button" onClick={() => onRemove(person)}>
          Delete
        </button>
      </div>
    ))}
  </div>
);

export default Persons;
