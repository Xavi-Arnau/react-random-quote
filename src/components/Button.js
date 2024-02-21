import React from "react";

const Button = ({ onClick, text }) => {
  return (
    <div className="button-box">
      <button onClick={onClick} className="btn">
        {text}
      </button>
    </div>
  );
};

export default Button;
