import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleFilter = (event) => {

  }

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

    const updatedPersons = persons.concat({ name: newName, number: newNumber });
    console.log("New list:", updatedPersons);

    setPersons(updatedPersons);

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input />
      </div>

      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>
            add
          </button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
