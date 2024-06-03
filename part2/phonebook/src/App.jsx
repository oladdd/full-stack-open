import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log("promise fulfilled");
      setPersons(response.data)
    })
  }, [])

  const handleFilter = (event) => {
    setFilterName(event.target.value);
    console.log("Filter Input:", event.target.value);
  };

  const handleNameChange = (event) => {
    console.log("Name Input:", event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log("Number Input:", event.target.value);
    setNewNumber(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log("Add clicked");

    const nameExists = persons.some((person) => person.name === newName);
    console.log("Exists:", nameExists);

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      console.log("Duplicate alert");
      return;
    }

    const updatedPersons = persons.concat({
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    });
    console.log("New list:", updatedPersons);

    setPersons(updatedPersons);

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filterName} handleFilter={handleFilter} />

      <h2>Add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleClick={handleClick}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;
