import { useState } from "react";

const App = () => {
  const [persons, setPersonList] = useState([
    { name: "Arto Hellas", id: 1, number: "040-1234567" },
  ]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(persons);

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    if (event.target.value === "") {
      setShowList(persons);
    } else {
      const searchTerm = event.target.value;
      setShowList(
        showList.filter((person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setSearch(searchTerm);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number: newNumber,
      };
      setPersonList(persons.concat(personObject));
      setShowList(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <label htmlFor="filter">filter shown with</label>
      <input id="filter" type="text" onChange={handleSearchChange} />

      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={newName}
          onChange={handleInputChange}
        />
        <label htmlFor="number">Number:</label>
        <input
          id="number"
          type="text"
          value={newNumber}
          onChange={handleNumChange}
        />
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>
        {showList.map((person) => (
          <h3 key={person.id}>
            {person.name} {person.number}
          </h3>
        ))}
      </div>
    </div>
  );
};
export default App;
