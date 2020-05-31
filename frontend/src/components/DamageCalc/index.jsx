import React from 'react';
import Health from './Health';
import DamageEffects from './DamageEffects';
import DamageInputs from './DamageInputs';
import Result from './Result';

export default class App extends React.Component {
  state = {
    hp: 100, //health points
    dd: 0, //destructive defense
    dr: 0, //damage reduction percentage
    dr2: 0, //damage reduction points
    di: 0, //damage increase
    input: [{ damage: 0, type: 'normal' }, { damage: 0, type: 'normal' }, { damage: 0, type: 'normal' }],
    leftHp: 100,
    leftDD: 0,
  };

  componentDidMount() {
    this.initialState = this.state;
  }

  componentDidUpdate(p, prevState) {
    const { hp, dd, dr, input, di, dr2 } = this.state;

    if (
      dd !== prevState.dd ||
      hp !== prevState.hp ||
      dr !== prevState.dr ||
      dr2 !== prevState.dr2 ||
      di !== prevState.di ||
      input !== prevState.input
    ) {
      var { leftHp, leftDD } = this.remaningHP();
      this.setState({ leftHp, leftDD });
    }
  }

  clear = () => this.setState(this.initialState);
  remaningHP = () => {
    const { hp, dr, di, input, dd, dr2 } = this.state;
    return input.reduce(
      (previous, current) => {
        let damage = Math.floor(current.damage * (1 + di / 100));
        let leftHp = previous.leftHp;
        let leftDD = previous.leftDD;
        let leftDR2 = previous.leftDR2;
        if (current.type === 'affliction') {
          leftHp = leftHp - damage;
          return { leftHp, leftDD, leftDR2 };
        }
        if (current.type === 'piercing') {
          leftDD = leftDD - damage;
          if (leftDD < 0) {
            let dealtDamage = leftDD * -1;
            leftHp = leftHp - dealtDamage;
            leftDD = 0;
          }
          return { leftHp, leftDD, leftDR2 };
        }
        leftDR2 = leftDR2 - Math.floor(damage * (1 - dr / 100));
        if (leftDR2 < 0) {
          let reducedDamage = leftDR2 * -1;
          leftDD = leftDD - reducedDamage;
          leftDR2 = 0;
          if (leftDD < 0) {
            leftHp = leftHp + leftDD;
            leftDD = 0;
          }
        }
        if (leftHp < 0) leftHp = 0;
        return { leftHp, leftDD, leftDR2 };
      },
      { leftHp: hp, leftDD: dd, leftDR2: dr2 },
    );
  };
  //handle functions
  handleChange = e => this.setState({ [e.target.id]: Number(e.target.value) });
  handleDamageChange = e => {
    e.persist();
    this.setState(({ input }) => ({
      input: Object.assign([], input, {
        [e.target.id]: {
          ...input[e.target.id],
          damage: Number(e.target.value),
        },
      }),
    }));
  };
  handleTypeChange = e => {
    e.persist();
    this.setState(({ input }) => ({
      input: Object.assign([], input, {
        [e.target.id]: {
          ...input[e.target.id],
          type: e.target.value,
        },
      }),
    }));
  };

  render() {
    return (
      <div className="Calc container" id="Calc">
        <div class="top">
          <Health handleChange={this.handleChange} hp={this.state.hp} />
          <DamageEffects
            handleChange={this.handleChange}
            dd={this.state.dd}
            di={this.state.di}
            dr={this.state.dr}
            dr2={this.state.dr2}
          />
          <DamageInputs
            handleDamageChange={this.handleDamageChange}
            handleTypeChange={this.handleTypeChange}
            input={this.state.input}
          />
        </div>
        <Result leftHp={this.state.leftHp} leftDD={this.state.leftDD} clear={this.clear} />
      </div>
    );
  }
}
