import React from 'react';

const Result = ({ leftHp, leftDD, clear }) => (
  <div className="result">
    <div className="remaning-hp">
      <div className="header">
        <span>Remaning HP</span>
      </div>
      <div className="body">
        <input value={leftHp} readOnly />
      </div>
    </div>
    <div className="remaning-dd">
      <div className="header">
        <span>Remaning DD</span>
      </div>
      <div className="body">
        <input value={leftDD} readOnly />
      </div>
    </div>
    <div className="bbutton">
      <button onClick={clear}>Clear</button>
    </div>
  </div>
);

export default Result;
