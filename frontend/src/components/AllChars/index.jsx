import React from 'react';
import setHeaders from '../../utils/setHeaders';

import CharInfo from '../CharInfo';
import Menu from '../Menu';
import CharFilter from '../Filters/charFilter';
import SkillFilter from '../Filters/skillFilter';
import SearchBar from '../SearchBar/SearchBar';
import DamageCalc from '../DamageCalc';

class AllChars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: [],
      filteredChars: [],
      id: '5ec26309e880d824b803c6b3',
      active: 'charInfo',
      calc: false,
      rmdKey: "0"
    };
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.getInfoFromMenu = this.getInfoFromMenu.bind(this);
    this.getSkillFilters = this.getSkillFilters.bind(this);
    this.getCharFilters = this.getCharFilters.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
    this.changeCalcVisibility = this.changeCalcVisibility.bind(this);
  }

  getData = async () => {
    const cha = await fetch('/api/chars', setHeaders()).then(response => response.json());

    this.setState({ chars: cha, filteredChars: cha });
  };

  componentDidMount() {
    this.getData();
  }

  handleAvatarClick(e) {
    this.setState({ id: e.target.id, active: 'charInfo' });
  }

  getInfoFromMenu(whatIsActive) {
    this.setState({
      active: whatIsActive,
      filteredChars: this.state.chars,
      rmdKey: Math.floor(Math.random() * 99999).toString()
    });
  }

  getSearchResult(term) {
    const filterChars = [];
    this.state.chars.filter(char => {
      if (char.name.toLowerCase().includes(term.toLowerCase())) filterChars.push(char);
    });
    this.setState({ filteredChars: filterChars });
  }

  getSkillFilters(includeAbilities, excludeAbilities) {
    const filterChars = this.state.chars.filter(
      character =>
        includeAbilities.every(ability => character.skillFilter.includes(ability)) &&
        excludeAbilities.every(ability => !character.skillFilter.includes(ability)),
    );
    this.setState({ filteredChars: filterChars });
  }

  getCharFilters(includeFilters, excludeFilters) {
    const filterChars = this.state.chars.filter(
      character =>
        includeFilters.every(filter => character.charFilter.includes(filter)) &&
        excludeFilters.every(filter => !character.charFilter.includes(filter)),
    );
    this.setState({ filteredChars: filterChars });
  }

  changeCalcVisibility() {
    let actualCalc = this.state.calc;
    this.setState({ calc: !actualCalc });
  }

  render() {
    return (
      <>
        <div className="chars">
          {this.state.filteredChars.map(x => (
            <img
              onClick={this.handleAvatarClick}
              key={x._id}
              alt={x.name}
              src={x.avatar}
              id={x._id}
              className="facepic"
            />
          ))}
        </div>
        <div className="searchBar">
          <SearchBar callbackFromParent={this.getSearchResult} />
        </div>
        <div className="bottomThings">
          <div className="buttons">
            <Menu callbackFromParent={this.getInfoFromMenu} changeCalcVisibility={this.changeCalcVisibility} />
          </div>
          <div className="charInfo">
            {this.state.active === 'charInfo' && <CharInfo id={this.state.id} />}
            {this.state.active === 'filters' && <CharFilter key={this.state.rmdKey} callbackFromParent={this.getCharFilters} />}
            {this.state.active === 'skillFilters' && <SkillFilter key={this.state.rmdKey} callbackFromParent={this.getSkillFilters} />}
          </div>
        </div>
        {this.state.calc && <DamageCalc />}
        <div className="footer">Made by Neji1113 / Patryqss</div>
      </>
    );
  }
}

export default AllChars;
