import React from "react";

const DamageInputs = ({ handleDamageChange, handleTypeChange, input }) => (
  <div className="damage-dealing">
    <div className="header">
      <span>Damage Input: </span>
    </div>
    <div className="damage-body">
      <div className="damage1">
        <input
          key="0"
          id={0}
          type="number"
          onChange={handleDamageChange}
          value={input[0].damage}
        />
        <div>
          <select id={0} value={input[0].type} onChange={handleTypeChange}>
            <option value="normal">Normal</option>
            <option value="piercing">Piercing</option>
            <option value="affliction">Affliction</option>
          </select>
        </div>
      </div>
      <div className="damage2">
        <input
          key="1"
          id={1}
          type="number"
          onChange={handleDamageChange}
          value={input[1].damage}
        />
        <div>
          <select id={1} value={input[1].type} onChange={handleTypeChange}>
            <option value="normal">Normal</option>
            <option value="piercing">Piercing</option>
            <option value="affliction">Affliction</option>
          </select>
        </div>
      </div>
      <div className="damage3">
        <input
          key="2"
          id={2}
          type="number"
          onChange={handleDamageChange}
          value={input[2].damage}
        />
        <div>
          <select id={2} value={input[2].type} onChange={handleTypeChange}>
            <option value="normal">Normal</option>
            <option value="piercing">Piercing</option>
            <option value="affliction">Affliction</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default DamageInputs;
