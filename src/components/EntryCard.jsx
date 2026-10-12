export default function EntryCard ({ name, label, description, onDelete }) {
    return (
        <article className="entry-card">    
            <h2>{name}</h2>
            <p className="label">{label}</p>
            <p className="description">{description}</p>
            <button className="delete-button"onClick={onDelete}>Delete</button>
        </article>
    )
}