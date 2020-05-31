import React from "react";

const Health = ({ handleChange, hp }) => (
  <div className="health">
    <div className="header">
      <span>HP </span>
    </div>
    <div className="body">
      <input
        type="number"
        id="hp"
        onChange={handleChange}
        value={hp}
        max={100}
      />
    </div>
  </div>
);

export default Health;
