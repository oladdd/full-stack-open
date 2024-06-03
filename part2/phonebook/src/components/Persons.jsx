const Persons = ({ persons, filterName, handleDelete }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterName.toLowerCase())
        )
        .map((filteredPerson) => (
          <div key={filteredPerson.id}>
            {filteredPerson.name} {filteredPerson.number}{" "}
            <button
              value={filteredPerson.id}
              onClick={handleDelete}
            >
              delete
            </button>
          </div>
        ))}
    </>
  );
};

export default Persons;
