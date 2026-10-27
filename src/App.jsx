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

const sampleLinks = [
  { id: 1, fromType: "character", fromId: 1, toType: "place", toId: 1, label: "born in" },
  { id: 2, fromType: "character", fromId: 2, toType: "faction", toId: 1, label: "member of" },
  { id: 3, fromType: "character", fromId: 2, toType: "character", toId: 1, label: "mentor of" },
];

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
  const [characterDetails, setCharacterDetails] = useState("");
  const [characterImage, setCharacterImage] = useState("");

  const [placeName, setPlaceName] = useState("");
  const [placeType, setPlaceType] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [placeDetails, setPlaceDetails] = useState("");
  const [placeImage, setPlaceImage] = useState("");

  const [factionName, setFactionName] = useState("");
  const [factionLeader, setFactionLeader] = useState("");
  const [factionDescription, setFactionDescription] = useState("");
  const [factionDetails, setFactionDetails] = useState("");
  const [factionImage, setFactionImage] = useState("");

  const [links, setLinks] = useState(() => {
    const savedLinks = localStorage.getItem("links");
    return savedLinks ? JSON.parse(savedLinks) : sampleLinks;
  });

  const linkOptions={ character: characters, place: places, faction: factions };

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters])

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places])

  useEffect(() => {
    localStorage.setItem("factions", JSON.stringify(factions));
  }, [factions])

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links])

  function addCharacter(event) {
    event.preventDefault();
    const newCharacter = { id: Date.now(), name, role, description, details: characterDetails, image: characterImage };
    setCharacters([...characters, newCharacter]);
    setName("");
    setRole("");
    setDescription("");
    setCharacterDetails("");
    setCharacterImage("");
  }


  function deleteCharacter(id) {
    if (confirm("Delete this character?")) {
      setCharacters(characters.filter((character) => character.id !== id));
    }
  }

  function addPlace(event) {
    event.preventDefault();
    const newPlace = { id: Date.now(), name: placeName, type: placeType, description: placeDescription, details: placeDetails, image: placeImage };
    setPlaces([...places, newPlace]);
    setPlaceName("");
    setPlaceType("");
    setPlaceDescription("");
    setPlaceDetails("");
    setPlaceImage("");
  }

  function deletePlace(id) {
    if (confirm("Delete this place?")) {
      setPlaces(places.filter((place) => place.id !== id));
    }
  }

  function addFaction(event) {
    event.preventDefault();
    const newFaction = { id: Date.now(), name: factionName, leader: factionLeader, description: factionDescription, details: factionDetails, image: factionImage };
    setFactions([...factions, newFaction]);
    setFactionName("");
    setFactionLeader("");
    setFactionDescription("");
    setFactionDetails("");
    setFactionImage("");
  }

  function deleteFaction(id) {
    if (confirm("Delete this faction?")) {
      setFactions(factions.filter((faction) => faction.id !== id))
    }
  }

  function updateCharacter(id, updated) {
    setCharacters(characters.map((character) =>
      character.id === id
        ? { ...character, name: updated.name, role: updated.label, description: updated.description, details: updated.details, image: updated.image }
        : character
    ));
  }

  function updatePlace(id, updated) {
    setPlaces(places.map((place) =>
      place.id === id
        ? { ...place, name: updated.name, type: updated.label, description: updated.description, details: updated.details, image: updated.image }
        : place
    ));
  }

  function updateFaction(id, updated) {
    setFactions(factions.map((faction) =>
      faction.id === id
        ? { ...faction, name: updated.name, leader: updated.label, description: updated.description, details: updated.details, image: updated.image }
        : faction
    ));
  }

  function getEntry(type, id) {
    const lists = { character: characters, place: places, faction: factions };
    return lists[type]?.find((entry) => entry.id === id);
  }

  function getLinkTexts(type, id) {
    return links.filter((link) =>
      (link.fromType === type && link.fromId === id) || (link.toType === type && link.toId === id)
    )
    .map((link) => {
      const isFrom = link.fromType === type && link.fromId === id;
      const other = isFrom
        ? getEntry(link.toType, link.toId)
        : getEntry(link.fromType, link.fromId);
      const otherName = other ? other.name : "Unknown";
      return isFrom ? `${link.label} ${otherName}` : `${otherName} (${link.label})`;
    });
  }

  function addLink(fromType, fromId, target) {
    const newLink = {
      id: Date.now(),
      fromType: fromType,
      fromId: fromId,
      toType: target.toType,
      toId: target.toId,
      label: target.label,
    };
    setLinks([...links, newLink]);
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

          <label htmlFor="characterDetails">Appearance</label>
          <textarea id="characterDetails" value={characterDetails} onChange={(event) => setCharacterDetails(event.target.value)} />

          <label htmlFor="characterImage">Image link</label>
          <input type="url" id="characterImage" value={characterImage} onChange={(event) => setCharacterImage(event.target.value)} />

          <button type="submit">Add character</button>
        </form>
        <div className="card-grid">
          {characters.map((character) => (
            <EntryCard
              key={character.id}
              id={character.id}
              name={character.name}
              label={character.role}
              labelName={"Role"}
              description={character.description}
              details={character.details}
              detailsName={"Appearance"}
              image={character.image}
              links={getLinkTexts("character", character.id)}
              linkOptions={linkOptions}
              onDelete={() => deleteCharacter(character.id)}
              onSave={(updated) => updateCharacter(character.id, updated)}
              onAddLink={(target) => addLink("character", character.id, target)}
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
          <textarea id="placeDescription" value={placeDescription} onChange={(event) => setPlaceDescription(event.target.value)} required />

          <label htmlFor="placeDetails">Landscape</label>
          <textarea id="placeDetails" value={placeDetails} onChange={(event) => setPlaceDetails(event.target.value)} />

          <label htmlFor="placeImage">Image link</label>
          <input type="url" id="placeImage" value={placeImage} onChange={(event) => setPlaceImage(event.target.value)} />

          <button type="submit">Add place</button>
        </form>

        <div className="card-grid">
          {places.map((place) => (
            <EntryCard
              key={place.id}
              id={place.id}
              name={place.name}
              label={place.type}
              labelName={"Type"}
              description={place.description}
              details={place.details}
              detailsName={"Landscape"}
              image={place.image}
              links={getLinkTexts("place", place.id)}
              linkOptions={linkOptions}
              onDelete={() => deletePlace(place.id)}
              onSave={(updated) => updatePlace(place.id, updated)}
              onAddLink={(target) => addLink("place", place.id, target)}
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
          <textarea id="factionDescription" value={factionDescription} onChange={(event) => setFactionDescription(event.target.value)} required />

          <label htmlFor="factionDetails">Symbols & Colors</label>
          <textarea id="factionDetails" value={factionDetails} onChange={(event) => setFactionDetails(event.target.value)} />

          <label htmlFor="factionImage">Image link</label>
          <input type="url" id="factionImage" value={factionImage} onChange={(event) => setFactionImage(event.target.value)} />

          <button type="submit">Add faction</button>
        </form>

        <div className="card-grid">
          {factions.map((faction) => (
            <EntryCard
              key={faction.id}
              id={faction.id}
              name={faction.name}
              label={faction.leader}
              labelName={"Leader"}
              description={faction.description}
              details={faction.details}
              detailsName={"Symbols & Colors"}
              image={faction.image}
              links={getLinkTexts("faction", faction.id)}
              linkOptions={linkOptions}
              onDelete={() => deleteFaction(faction.id)}
              onSave={(updated) => updateFaction(faction.id, updated)}
              onAddLink={(target) => addLink("faction", faction.id, target)}
            />
          ))}
        </div>
      </section>

    </main>
  );
}
export default App