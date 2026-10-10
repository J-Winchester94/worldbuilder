import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'


const sampleCharacters = [
  { id: 1, name: "Rand al'Thor", role: "Protagonist", description: "A farm boy with a destiny." },
  { id: 2, name: "Moiraine", role: "Mentor", description: "An Aes Sedai who guides the group." },
];

function App() {
  const [characters, setCharacters] = useState(sampleCharacters);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  function handleSubmit(event) {
    // Stop the page from reloading
    event.preventDefault();
    // build newCharacter {id : Date.now(), name, role, description}
    const newCharacter = {id: Date.now(),  name, role, description};
    // Add it with setCharacter and the spread operator
    setCharacters([...characters, newCharacter]);
    // Clear the three fields by setting each one back to ""
    setName("");
    setRole("");
    setDescription("");
  }
  return (
    <main>
      <h1>Worldbuilder</h1>
      <p>A companion for keeping track of your characters, places, and factions</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(event) => setName(event.target.value)} required/>

       <label htmlFor="role">Role</label>
       <input id="role" value={role} onChange={(event) => setRole(event.taget.value)} required />

       <label htmlFor="description">Description</label>
       <input id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
      </form>

      {characters.map((character) => (
        function CharacterCard({ name, role, description }) {
          return (
            <article className="character-card">
              <h2>{name}</h2>
              <p className="role">{role}</p>
              <p>{description}</p>
            </article>
          );
        }    

      ))}
    </main>
  );
 
}


export default App
