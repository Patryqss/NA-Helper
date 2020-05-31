import React from 'react';

const DamageEffects = ({ handleChange, dd, dr, di, dr2 }) => (
  <div className="damage-effect">
    <div className="dd">
      <div className="header">
        <span>Destructible Defense</span>
      </div>
      <div className="body">
        <input type="number" id="dd" onChange={handleChange} value={dd} />
      </div>
    </div>
    <div className="dr">
      <div className="header">
        <span>Damage Reduction (%)</span>
      </div>
      <div className="body">
        <input type="number" id="dr" onChange={handleChange} value={dr} />
      </div>
    </div>
    <div className="dr2">
      <div className="header">
        <span>Damage Reduction (#)</span>
      </div>
      <div className="body">
        <input type="number" id="dr2" onChange={handleChange} value={dr2} />
      </div>
    </div>
    <div className="di">
      <div className="header">
        <span>Damage Increase (%) </span>
      </div>
      <div className="body">
        <input type="number" id="di" onChange={handleChange} value={di} />
      </div>
    </div>
  </div>
);

export default DamageEffects;
