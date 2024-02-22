import React from "react";

function Log({ turns }) {
  return (
    <div id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.playerName} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </div>
  );
}

export default Log;
