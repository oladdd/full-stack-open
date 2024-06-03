const Persons = ({ persons, filterName }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filterName.toLowerCase())
    )
    .map((filteredPerson) => (
      <p key={filteredPerson.id}>
        {filteredPerson.name} {filteredPerson.number}
      </p>
    ));
};

export default Persons;
