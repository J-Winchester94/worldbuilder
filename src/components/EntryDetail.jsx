import { useParams, Link } from 'react-router-dom'

export default function EntryDetail({ getEntry, getLinkTexts }) {
    const { type, id } = useParams();
    const entry = getEntry(type, Number(id));
    if (!entry) {
        return (<p>Entry not found.</p>);
    }

    const linkTexts = getLinkTexts(type, Number(id));

    return (
        <main className="entry-detail">
            <Link to="/">Back to all entries</Link>
            <h1>{entry.name}</h1>
            {entry.image && <img src={entry.image} alt={entry.name} />}
            <p>{entry.description}</p>
            {entry.details && <p>{entry.details}</p>}
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
