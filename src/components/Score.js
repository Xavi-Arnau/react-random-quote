import React from "react";

const Score = ({ points }) => {
  return (
    <div className="score">
      <p>Current score: {points}</p>
    </div>
  );
};

export default Score;
