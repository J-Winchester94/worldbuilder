import { useState } from 'react'
export default function EntryCard({ id, name, label, labelName, description, onDelete, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftName, setDraftName] = useState(name);
    const [draftLabel, setDraftLabel] = useState(label);
    const [draftDescription, setDraftDescription] = useState(description);
    return (
        <article className="entry-card">
            {isEditing ? (
                <form type="submit" onSubmit={(event) => {
                    event.preventDefault();
                    onSave({ name: draftName, label: draftLabel, description: draftDescription });
                    setIsEditing(false);
                }}>
                    <label htmlFor={`draftName-${id}`}>Name: </label>
                    <input id={`draftName-${id}`} value={draftName} onChange={(event) => setDraftName(event.target.value)} />

                    <label htmlFor={`draftLabel-${id}`}>{labelName}: </label>
                    <input id={`draftLabel-${id}`} value={draftLabel} onChange={(event) => setDraftLabel(event.target.value)} />

                    <label htmlFor={`draftDescription-${id}`}>Description: </label>
                    <textarea id={`draftDescription-${id}`} value={draftDescription} onChange={(event) => setDraftDescription(event.target.value)} />

                    <button>Save</button>

                    <button className="cancel-button" type="button" onClick={() => {
                        setIsEditing(false);
                        setDraftName(name);
                        setDraftLabel(label);
                        setDraftDescription(description);
                    }}>Cancel</button>
                </form>
            ) : (
                <>
                    <h3>{name}</h3>
                    <p className="label">{label}</p>
                    <p className="description">{description}</p>
                    <button className="delete-button" onClick={onDelete}>Delete</button>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </article>
    );
}