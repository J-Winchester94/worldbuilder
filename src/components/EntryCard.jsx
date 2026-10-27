import { useState } from 'react'
export default function EntryCard({ id, name, label, labelName, description, details, detailsName, image, links, onDelete, onSave, onAddLink }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftName, setDraftName] = useState(name);
    const [draftLabel, setDraftLabel] = useState(label);
    const [draftDescription, setDraftDescription] = useState(description);
    const [draftDetails, setDraftDetails] = useState(details || "");
    const [draftImage, setDraftImage] = useState(image || "");
    const [isLinking, setIsLinking] = useState(false);
    const [linkType, setLinkType] = useState("character");
    const [linkTargetId, setLinkTargetId] = useState("");
    const [linkLabel, setLinkLabel] = useState("");
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
                        setDraftImage(image || "");
                    }}>Cancel</button>
                </form>
            ) : (
                <>  
                    {image && <img src={image} alt={name} />}
                    <h3>{name}</h3>
                    <p className="label">{label}</p>
                    <p className="description">{description}</p>
                    {details && <p className="details">{detailsName}: {details} </p>}
                    {links.length > 0 &&(
                        <ul className="links">
                            {links.map((text, index) => <li key={index}>{text}</li>)}
                        </ul>
                    )}

                    {isLinking && (
                       <form className="link-form" onSubmit={(event) => {
                            event.preventDefault();
                            onAddLink({ toType: linkType, toId: Number(linkTargetId), label: linkLabel});
                            setLinkTargetId("");
                            setLinkLabel("");
                            setIsLinking("");
                       }}>
                            <label htmlFor={`linkType-${id}`}>Link to: </label>
                            <select id={`linkType-${id}`} value={linkType} onChange={(event) => {
                                setLinkType(event.target.value);
                                setLinkTargetId("");
                            }}>
                                <option value="character">Character</option>
                                <option value="place">Place</option>
                                <option value="faction">Faction</option>
                            </select>

                            <select value={linkTargetId} onChange={(event) => setLinkTargetId(evemt.target.value)} required>
                                <option value="">Choose...</option>
                                {linkOptions[linkType].map((entry) => (
                                    <option key={entry.id} value={entry.id}>{entry.name}</option>
                                ))}
                            </select>

                            <label htmlFor={`linkLabel-${id}`}>Relationship: </label>
                       </form>
                    )}
                    <button className="delete-button" onClick={onDelete}>Delete</button>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </article>
    );
}