import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationClass, setNotificationClass] = useState("");

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

  const showNotification = (message, className, duration = 2000) => {
    setNotificationMessage(message);
    setNotificationClass(className);
    setTimeout(() => {
      setNotificationMessage("");
      setNotificationClass("");
    }, duration);
  };
  
  const handleClick = (event) => {
    event.preventDefault();
    console.log("Add clicked");

    const nameExists = persons.some((person) => person.name === newName);
    console.log("Exists:", nameExists);

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length > 0 ? persons[persons.length - 1].id + 1 : 1,
    };
    
    if (nameExists) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find((person) => person.name === newName);
        const updatedPerson = { ...person, number: newNumber };

        personsService.updatePerson(person.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson));
          setNewName("");
          setNewNumber("");

          showNotification(`Updated ${personObject.name}`, 'success')

        })
      }
      console.log("Duplicate alert");
      return;
    }

    personsService.addPerson(personObject).then(response => {
      const updatedPersons = persons.concat(response);
      console.log("New list:", updatedPersons);

      setPersons(updatedPersons);
      setNewName("");
      setNewNumber("");

      showNotification(`Added ${personObject.name}`, 'success')
    });
  };

  const handleDelete = (event) => {
    const id = event.target.value;
    const personToDelete = persons.find(person => person.id === id);
    console.log(personToDelete);
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
      <Notification message={notificationMessage} notificationClass={notificationClass}/>
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
      <Persons
        persons={persons}
        filterName={filterName}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
