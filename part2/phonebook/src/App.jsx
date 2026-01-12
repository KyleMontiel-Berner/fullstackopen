import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersonList] = useState([
    { name: "Arto Hellas", id: 1, number: "040-1234567" },
  ]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
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
      setNewName("");
      setNewNumber("");
    }
  };

  const filteredList =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        id="filter"
        type="text"
        onChange={handleSearchChange}
        value={search}
      />

      <h2>add a new</h2>

      <PersonForm
        onSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        handleNumChange={handleNumChange}
        newNumber={newNumber}
        newName={newName}
      />

      <h2>Numbers</h2>
      <Persons list={filteredList} />
    </div>
  );
};

export default App;
