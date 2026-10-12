import { useState, useEffect } from 'react'
import './App.css'
import EntryCard from './components/EntryCard.jsx';

const sampleCharacters = [
  { id: 1, name: "Rand al'Thor", role: "Protagonist", description: "A farm boy with a destiny." },
  { id: 2, name: "Moiraine", role: "Mentor", description: "An Aes Sedai who guides the group." },
];

const samplePlaces = [
  { id: 1, name: "Emond's Field", type: "Village", description: "A quiet farming village in the Two Rivers." },
  { id: 2, name: "Tar Valon", type: "City", description: "Home of The White Tower, the home the Aes Sedai" },
]

const sampleFactions = [
  { id: 1, name: "Aes Sedai", leader: "The Amyrlin Seat", description: "An order of women who can channel the One Power." },
  { id: 2, name: "Darkfriends", leader: "The Dark One", description: "Those who side with the Dark One, seeking to unravel the Pattern." },
]

function App() {
  const [characters, setCharacters] = useState(() => {
    const savedCharacters = localStorage.getItem("characters");
    return savedCharacters ? JSON.parse(savedCharacters) : sampleCharacters;
  });

  const [places, setPlaces] = useState(() => {
    const savedPlaces = localStorage.getItem("places");
    return savedPlaces ? JSON.parse(savedPlaces) : samplePlaces;
  });

  const [factions, setFactions] = useState(() => {
    const savedFactions = localStorage.getItem("factions");
    return savedFactions ? JSON.parse(savedFactions) : sampleFactions;
  })

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");

  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [placeDescription, setPlaceDescription] = useState("")

  const [factionName, setFactionName] = useState("");
  const [factionLeader, setFactionLeader] = useState("");
  const [factionDescription, setFactionDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters])

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places])

  useEffect(() => {
    localStorage.setItem("factions", JSON.stringify(factions));
  }, [factions])

  function addCharacter(event) {
    event.preventDefault();
    const newCharacter = { id: Date.now(), name, role, description };
    setCharacters([...characters, newCharacter]);
    setName("");
    setRole("");
    setDescription("");
  }


  function deleteCharacter(id) {
    if (confirm("Delete this character?")) {
      setCharacters(characters.filter((character) => character.id !== id));
    }
  }

  function addPlace(event) {
    event.preventDefault();
    const newPlace = { id: Date.now(), name: placeName, type: placeType, description: placeDescription };
    setPlaces([...places, newPlace]);
    setPlaceName("");
    setPlaceType("");
    setPlaceDescription("");
  }

  function deletePlace(id) {
    if (confirm("Delete this place?")) {
      setPlaces(places.filter((place) => place.id !== id));
    }
  }

  function addFaction(event) {
    event.preventDefault();
    const newFaction = { id: Date.now(), name: factionName, leader: factionLeader, description: factionDescription };
    setFactions([...factions, newFaction]);
    setFactionName("");
    setFactionLeader("");
    setFactionDescription("");
  }

  function deleteFaction(id) {
    if (confirm("Delete this faction?")) {
      setFactions(factions.filter((faction) => faction.id !== id))
    }
  }


  return (
    <main>
      <h1>Worldbuilder</h1>
      <p>A companion for keeping track of your characters, places, and factions.</p>


      {/* Create forms */}
      <section className="entry-section">
        <h2>Characters</h2>
        <form onSubmit={addCharacter}>

          <label htmlFor="name">Name</label>
          <input id="name" value={name} onChange={(event) => setName(event.target.value)} required />

          <label htmlFor="role">Role</label>
          <input id="role" value={role} onChange={(event) => setRole(event.target.value)} required />

          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />

          <button type="submit">Add character</button>
        </form>
        <div className="card-grid">
          {characters.map((character) => (
            <EntryCard
              key={character.id}
              name={character.name}
              label={character.role}
              description={character.description}
              onDelete={() => deleteCharacter(character.id)}
            />
          ))}
        </div>
      </section>

      <section className="entry-section">
        <h2>Places</h2>
        <form onSubmit={addPlace}>
          <label htmlFor="placeName">Name</label>
          <input id="placeName" value={placeName} onChange={(event) => setPlaceName(event.target.value)} required />

          <label htmlFor="placeType">Type</label>
          <input id="placeType" value={placeType} onChange={(event) => setPlaceType(event.target.value)} required />

          <label htmlFor="placeDescription">Description</label>
          <textarea id="placeDescription" value={placeDescription} onChange={(event) => setPlaceDescription(event.target.value)} required></textarea>

          <button type="submit">Add place</button>
        </form>

        <div className="card-grid">
          {places.map((place) => (
            <EntryCard
              key={place.id}
              name={place.name}
              label={place.type}
              description={place.description}
              onDelete={() => deletePlace(place.id)}
            />
          ))}
        </div>
      </section>

      <section className="entry-section">
        <h2>Factions</h2>
        <form onSubmit={addFaction}>
          <label htmlFor="factionName">Faction</label>
          <input id="factionName" value={factionName} onChange={(event) => setFactionName(event.target.value)} required />

          <label htmlFor="factionLeader">Leader</label>
          <input id="factionLeader" value={factionLeader} onChange={(event) => setFactionLeader(event.target.value)} required />

          <label htmlFor="factionDescription">Description</label>
          <textarea id="factionDescription" value={factionDescription} onChange={(event) => setFactionDescription(event.target.value)} required></textarea>

          <button type="submit">Add faction</button>
        </form>

        <div className="card-grid">
          {factions.map((faction) => (
            <EntryCard
              key={faction.id}
              name={faction.name}
              label={faction.leader}
              description={faction.description}
              onDelete={() => deleteFaction(faction.id)}
            />
          ))}
        </div>
      </section>


    </main>
  );
}

export default App