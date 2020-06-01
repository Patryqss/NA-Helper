import React from 'react';

const DamageEffects = ({ handleChange, dd, dr, di, dr2 }) => (
  <div className="damage-effect">
    <div className="dd">
      <div className="header">
        <span>Destructible Defense</span>
      </div>
      <div className="body">
        <input type="number" id="dd" onChange={handleChange} min={0} value={dd.toString()} />
      </div>
    </div>
    <div className="dr">
      <div className="header">
        <span>Damage Reduction (%)</span>
      </div>
      <div className="body">
        <input type="number" id="dr" onChange={handleChange} min={0} value={dr.toString()} />
      </div>
    </div>
    <div className="dr2">
      <div className="header">
        <span>Damage Reduction (#)</span>
      </div>
      <div className="body">
        <input type="number" id="dr2" onChange={handleChange} min={0} value={dr2.toString()} />
      </div>
    </div>
    <div className="di">
      <div className="header">
        <span>Damage Increase (%) </span>
      </div>
      <div className="body">
        <input type="number" id="di" onChange={handleChange} min={0} value={di.toString()} />
      </div>
    </div>
  </div>
);

export default DamageEffects;
