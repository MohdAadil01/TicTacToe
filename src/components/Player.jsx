import React, { useState } from "react";

function Player({ initialName, symbol, isActive, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const editingHandler = () => {
    setIsEditing((isEditing) => !isEditing);
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  };

  const nameChangeHandler = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{playerName} </span>}
        {isEditing && (
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={playerName}
            onChange={nameChangeHandler}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editingHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
