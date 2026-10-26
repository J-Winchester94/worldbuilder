import { useState } from 'react'
export default function EntryCard({ id, name, label, labelName, description, details, detailsName, image, onDelete, onSave}) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftName, setDraftName] = useState(name);
    const [draftLabel, setDraftLabel] = useState(label);
    const [draftDescription, setDraftDescription] = useState(description);
    const [draftDetails, setDraftDetails] = useState(details || "");
    const [draftImage, setDraftImage] = useState(image || "");
    return (
        <article className="entry-card">
            {isEditing ? (
                <form onSubmit={(event) => {
                    event.preventDefault();
                    onSave({ name: draftName, label: draftLabel, description: draftDescription, details: draftDetails, image: draftImage });
                    setIsEditing(false);
                }}>
                    <label htmlFor={`draftName-${id}`}>Name: </label>
                    <input id={`draftName-${id}`} value={draftName} onChange={(event) => setDraftName(event.target.value)} />

                    <label htmlFor={`draftLabel-${id}`}>{labelName}: </label>
                    <input id={`draftLabel-${id}`} value={draftLabel} onChange={(event) => setDraftLabel(event.target.value)} />

                    <label htmlFor={`draftDescription-${id}`}>Description: </label>
                    <textarea id={`draftDescription-${id}`} value={draftDescription} onChange={(event) => setDraftDescription(event.target.value)} />

                    <label htmlFor={`draftDetails-${id}`}>{detailsName}: </label>
                    <textarea id={`draftDetails-${id}`} value={draftDetails} onChange={(event) => setDraftDetails(event.target.value)} />

                    <label htmlFor={`draftImage-${id}`}>Image link: </label>
                    <input type="url" id={`draftImage-${id}`} value={draftImage} onChange={(event) => setDraftImage(event.target.value)} />

                    <button type="submit">Save</button>

                    <button className="cancel-button" type="button" onClick={() => {
                        setIsEditing(false);
                        setDraftName(name);
                        setDraftLabel(label);
                        setDraftDescription(description);
                        setDraftDetails(details || "");
                    }}>Cancel</button>
                </form>
            ) : (
                <>  
                    {image && <img src={image} alt={name} />}
                    <h3>{name}</h3>
                    <p className="label">{label}</p>
                    <p className="description">{description}</p>
                    {details && <p className="details">{detailsName}: {details} </p>}
                    <button className="delete-button" onClick={onDelete}>Delete</button>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </article>
    );
}