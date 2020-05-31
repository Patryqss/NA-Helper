import React from 'react';

class skillFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { includeAbilities: [], excludeAbilities: [] };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.filters = [
      'Additional Damage',
      'Affects Chakra Cost',
      'Affects Cooldown',
      'Affects Duration',
      'Affliction',
      'Alternate Skill',
      'AOE',
      'Become Invulnerable',
      'Bloodline',
      'Cannot be countered',
      'Cannot be killed',
      'Counter',
      'Damage over Time',
      'Damage Reduction',
      'DD Destroy',
      'Destructible Defense',
      'Gain Chakra',
      'Genjutsu',
      'Healing',
      'Ignore Friendly',
      'Ignores',
      'Increase Damage',
      'Insta-kill',
      'Invisible',
      'Ninjutsu',
      'None',
      'Piercing',
      'Random',
      'Reduce Dealt Damage',
      'Reflect',
      'Remove Chakra',
      'Steal Chakra',
      'Steal Health',
      'Stun',
      'Taijutsu',
      'Through Invulnerable',
      'Unable to Reduce',
    ];
  }

  handleButtonClick(e) {
    let includeSkills = this.state.includeAbilities;
    let excludeSkills = this.state.excludeAbilities;
    if (e.target.className === 'filterr inactiveButton') {
      includeSkills.push(e.target.id);
      e.target.className = 'filterr activeButton';
      this.state.includeAbilities = includeSkills;
    } else if (e.target.className === 'filterr activeButton') {
      includeSkills = includeSkills.filter(s => s !== e.target.id);
      excludeSkills.push(e.target.id);
      e.target.className = 'filterr activeRedButton';
      this.state.includeAbilities = includeSkills;
      this.state.excludeAbilities = excludeSkills;
    } else if (e.target.className === 'filterr activeRedButton') {
      excludeSkills = excludeSkills.filter(s => s !== e.target.id);
      e.target.className = 'filterr inactiveButton';
      this.state.excludeAbilities = excludeSkills;
    }
    this.props.callbackFromParent(this.state.includeAbilities, this.state.excludeAbilities);
  }

  render() {
    return (
      <div className="filterButtons">
        {this.filters.map(x => (
          <div onClick={this.handleButtonClick} key={x} className="filterr inactiveButton" id={x}>
            {x}
          </div>
        ))}
      </div>
    );
  }
}

export default skillFilter;
