import { useState, useEffect } from "react";
import getAll from "./services/listActions";
import List from "./components/List";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fullList, setFullList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const countryNameList = fullList
    .map((country) => ({
      name: country.name.common,
      key: country.ccn3,
      capital: country.capital,
      area: country.area,
      languages: country.languages,
      flag: country.flag,
    }))
    .filter((country) => country.name.toLowerCase().includes(searchTerm));

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setFilteredList(countryNameList);
  };

  useEffect(() => {
    getAll().then((initialList) => setFullList(initialList));
  }, []);

  return (
    <div>
      <label htmlFor="search">Find countries:</label>
      <input id="search" type="text" onChange={handleSearch} />
      <List value={filteredList} />
    </div>
  );
}

export default App;
