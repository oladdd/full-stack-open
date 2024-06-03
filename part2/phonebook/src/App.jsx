import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    console.log("effect");
    personsService.getPersons().then(initialPersons => setPersons(initialPersons));
  }, []);

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

    const personObject = {
      name: newName,
      number: newNumber,
      id: `${persons.length > 0 ? persons[persons.length - 1].id + 1 : 1}`,
    };

    personsService.addPerson(personObject).then(response => {
      const updatedPersons = persons.concat(response);
      console.log("New list:", updatedPersons);

      setPersons(updatedPersons);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (event) => {
    console.log(event.target)
    const id = parseInt(event.target.value.id);
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService.deletePerson(id).then(() => {
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
      });
    }
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
      <Persons persons={persons} filterName={filterName} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
