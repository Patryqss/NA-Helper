import React from 'react';

export default function descriptionWindow(props) {
  const descClass = props.cost === ' ' ? "skillOrCharDesc" : "skillOrCharDesc skillDesc";
  return (
    <div className="skillDescription">
      <div className="skilOrCharName">{props.name}</div>
      <div className={descClass}>{props.desc}</div>
      <div className="skillCooldown">{props.cooldown !== 'None' && 'Cooldown: ' + props.cooldown}</div>
      <div className="skillCost">
        {props.cost !== ' ' && 'Cost:  '}
        {props.cost !== ' ' &&
          props.cost.map(
            (x, i) =>
              (x === 'tai' && <div key={x+i} className="taijutsu"></div>) ||
              (x === 'blood' && <div key={x+i} className="bloodline"></div>) ||
              (x === 'nin' && <div key={x+i} className="ninjutsu"></div>) ||
              (x === 'gen' && <div key={x+i} className="genjutsu"></div>) ||
              (x === 'random' && <div ken={x+i} className="random"></div>) ||
              (x === 'None' && <div key={x+i}> None</div>),
          )}
      </div>
      <div className="skillClasses">
        {props.classes !== ' ' && 'Classes: '} {props.classes}
      </div>
    </div>
  );
}
