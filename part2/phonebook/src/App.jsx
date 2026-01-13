import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import listService from "./services/List";

const App = () => {
  const [persons, setPersonList] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    listService.grab().then((initialList) => {
      console.log(initialList);
      setPersonList(initialList);
    });
  }, []);

  const handleRemoval = (person) => {
    const listAfterDeletedItem = persons.filter(
      (item) => person.id !== item.id
    );
    listService
      .remove(person.id)
      .then(() => setPersonList(listAfterDeletedItem));
  };

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
        number: newNumber,
      };
      listService.create(personObject).then((person) => {
        setPersonList(persons.concat(person));
        setNewName("");
        setNewNumber("");
      });
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
      <Persons list={filteredList} onRemove={handleRemoval} />
    </div>
  );
};

export default App;
