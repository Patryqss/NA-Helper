import React from 'react';

class skillFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { includeAbilities: [], excludeAbilities: [] };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.filters = [
      'Achievement',
      'Action',
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
      'Control',
      'Counter',
      'Damage over Time',
      'Damage Reduction',
      'DD Destroy',
      'Destructible Defense',
      'Energy',
      'Gain Chakra',
      'Genjutsu',
      'Healing',
      'Ignore Friendly',
      'Ignores',
      'Increase Damage',
      'Insta-kill',
      'Invisible',
      'Mental',
      'Ninjutsu',
      'None',
      'Physical',
      'Piercing',
      'Random',
      'Reduce Dealt Damage',
      'Reflect',
      'Remove Chakra',
      'Stacks',
      'Steal Chakra',
      'Steal Health',
      'Stun',
      'Taijutsu',
      'Through Invulnerable',
      'Unable to Reduce',
      'Unpierceable'
    ];
  }

  componentDidUpdate(p, prevState) {
    const { includeAbilities, excludeAbilities } = this.state;
    if (prevState.includeAbilities !== includeAbilities || prevState.excludeAbilities !== excludeAbilities)
      this.props.callbackFromParent(includeAbilities, excludeAbilities);
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
