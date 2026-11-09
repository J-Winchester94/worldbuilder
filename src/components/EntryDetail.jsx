import { useParams, Link } from 'react-router-dom'
const detailsNames = { character: "Appearance", place: "Landscape", faction: "Symbols & Colors"};
const labelNames = { character: "Role", place: "Type", faction: "Leader" }
const labelKeys = { character: "role", place: "type", faction: "leader" }
export default function EntryDetail({ getEntry, getLinkTexts }) {
    const { type, id } = useParams();
    const entry = getEntry(type, Number(id));
    if (!entry) {
        return (
            <main classname="entry-detail">
                <Link to="/">Back to all entries</Link>
                <p>Entry not found.</p>
            </main>
        );
    }

    const linkTexts = getLinkTexts(type, Number(id)); 
    return (
        <main className="entry-detail">
            <Link to="/" className="back-link">← Back to all entries</Link>
            <h1>{entry.name}</h1>
            {entry.image && <img src={entry.image} alt={entry.name} />}
            <p>{labelNames[type]}: {entry[labelKeys[type]]}</p>
            <p>{entry.description}</p>
            {entry.details && <p>{detailsNames[type]}: {entry.details}</p>}
            {linkTexts.length > 0 ? (
                <>
                    <h2>Relationships</h2>
                    <ul className="links">
                        {linkTexts.map((link) => (
                            <li key={link.id}>
                                {link.exists ? (
                                    <Link to={`/${link.otherType}/${link.otherId}`}>{link.text}</Link>
                                ) : (
                                    link.text
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No relationships yet.</p>
            )}
        </main>
    );
}
