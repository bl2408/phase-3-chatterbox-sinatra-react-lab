import React, { useState } from "react";
import EditMessage from "./EditMessage";

function Message({ message, currentUser, onMessageDelete, onUpdateMessage }) {
  const [isEditing, setIsEditing] = useState(false);

  const { id, username, body, created_at: createdAt, updated_at: updatedAt} = message;

  const timestamp = new Date(createdAt).toLocaleTimeString();
  const timestampUpdated = new Date(updatedAt).toLocaleTimeString();

  const isCurrentUser = currentUser.username === username;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/messages/${id}`, {
      method: "DELETE",
    });

    onMessageDelete(id);
  }

  function handleUpdateMessage(updatedMessage) {
    setIsEditing(false);
    onUpdateMessage(updatedMessage);
  }

  return (
    <li>
      <span className="user">{username}</span>
      <span className="time">{timestamp}</span>
      {isEditing ? (
        <EditMessage
          id={id}
          body={body}
          onUpdateMessage={handleUpdateMessage}
        />
      ) : (
        <p>{body}</p>
      )}
      {timestamp === timestampUpdated ? null : <span className="time" style={{opacity:0.5, fontStyle:"oblique"}}>Edited:{timestampUpdated}</span>}

      {isCurrentUser ? (
        <div className="actions">
          <button onClick={() => setIsEditing((isEditing) => !isEditing)}>
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </button>
          <button onClick={handleDeleteClick}>
            <span role="img" aria-label="delete">
              🗑
            </span>
          </button>
        </div>
      ) : null}
    </li>
  );
}

export default Message;
