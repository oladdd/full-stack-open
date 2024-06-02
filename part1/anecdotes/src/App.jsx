import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const randomAnecdote = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(newIndex);
    console.log("Old Index:", selected, "New Index:", newIndex);
  };

  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    console.log("Current Index", selected, "Current Value: ", newVotes[selected]);
  };

  const indexOfMax = () => {
    let maxIndex = 0;
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > votes[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVotes}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[indexOfMax()]}</p>
      <p>has {votes[indexOfMax()]} votes</p>
    </div>
  );
};

export default App;
