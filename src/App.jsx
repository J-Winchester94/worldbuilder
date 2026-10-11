import { useState } from 'react'
import './App.css'

const sampleCharacters = [
  { id: 1, name: "Rand al'Thor", role: "Protagonist", description: "A farm boy with a destiny." },
  { id: 2, name: "Moiraine", role: "Mentor", description: "An Aes Sedai who guides the group." },
];

function CharacterCard({ name, role, description, onDelete }) {
  return (
    <article className="character-card">
      <h2>{name}</h2>
      <p className="role">{role}</p>
      <p>{description}</p>
      <button onClick={onDelete}>Delete</button>
    </article>
  );
}

function App() {
  const [characters, setCharacters] = useState(() => {
    const saved = localStorage.getItem("characters");
    return saved ? JSON.parse(saved) : sampleCharacters;
  });
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const newCharacter = { id: Date.now(), name, role, description };
    setCharacters([...characters, newCharacter]);
    setName("");
    setRole("");
    setDescription("");
  }

  function deleteCharacter(id) {
    function deleteCharacter(id) {
      if (confirm("Delete this character?")) {
        setCharacters(characters.filter((character) => character.id !== id));
      }
    }
  }

  return (
    <main>
      <h1>Worldbuilder</h1>
      <p>A companion for keeping track of your characters, places, and factions.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(event) => setName(event.target.value)} required />

        <label htmlFor="role">Role</label>
        <input id="role" value={role} onChange={(event) => setRole(event.target.value)} required />

        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />

        <button type="submit">Add character</button>
      </form>

      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          role={character.role}
          description={character.description}
          onDelete={() => deleteCharacter(character.id)}
        />
      ))}
    </main>
  );
}

export default App