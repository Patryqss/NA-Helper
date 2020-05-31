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
    const { includeAbilities, excludeAbilities } = this.state;
    e.persist()
    if (e.target.className === 'filterr inactiveButton') {
      e.target.className = 'filterr activeButton';
      this.setState({
        includeAbilities: [...includeAbilities, e.target.id]
      })
    } else if (e.target.className === 'filterr activeButton') {
      e.target.className = 'filterr activeRedButton';
      this.setState({
        includeAbilities: includeAbilities.filter(s => s !== e.target.id),
        excludeAbilities: [...excludeAbilities, e.target.id]
      })
    } else if (e.target.className === 'filterr activeRedButton') {
      e.target.className = 'filterr inactiveButton';
      this.setState(({ excludeAbilities }) => ({
        excludeAbilities: excludeAbilities.filter(s => s !== e.target.id)
      }))
    }
    this.props.callbackFromParent(includeAbilities, excludeAbilities);
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
