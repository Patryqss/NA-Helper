import React from 'react';

export default function descriptionWindow(props) {
  return (
    <div className="skillDescription">
      <div className="skilOrCharName">{props.name}</div>
      <div className="skillOrCharDesc">{props.desc}</div>
      <div className="skillCooldown">{props.cooldown != 'None' && 'Cooldown: ' + props.cooldown}</div>
      <div className="skillCost">
        {props.cost !== ' ' && 'Cost:  '}
        {props.cost !== ' ' &&
          props.cost.map(
            x =>
              (x == 'tai' && <div className="taijutsu"></div>) ||
              (x == 'blood' && <div className="bloodline"></div>) ||
              (x == 'nin' && <div className="ninjutsu"></div>) ||
              (x == 'gen' && <div className="genjutsu"></div>) ||
              (x == 'random' && <div className="random"></div>) ||
              (x == 'None' && <div> None</div>),
          )}
      </div>
      <div className="skillClasses">
        {props.classes !== ' ' && 'Classes: '} {props.classes}
      </div>
    </div>
  );
}
