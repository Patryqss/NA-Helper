import React from 'react';

import CharInfo from '../CharInfo';
import Menu from '../Menu';
import CharFilter from '../Filters/charFilter';
import SkillFilter from '../Filters/skillFilter';
import SearchBar from '../SearchBar/SearchBar';
import DamageCalc from '../DamageCalc';
import charsData from '../../allChars.json';

class AllChars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: [],
      filteredChars: [],
      place: 1,
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
    this.addClassesToFiletrs = this.addClassesToFiletrs.bind(this);
    this.addClassesToFilters2 = this.addClassesToFilters2.bind(this);
    this.getThroughSkills = this.getThroughSkills.bind(this);
  }

  getData = async () => {
    const api = process.env.REACT_APP_API;
    const key = process.env.REACT_APP_SECRET_KEY;
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        localStorage.setItem("chars", req.responseText);
        localStorage.setItem("lastSaved", JSON.stringify(new Date()));
        this.assignChars(JSON.parse(req.responseText));
      }
    };

    req.open("GET", api, true);
    req.setRequestHeader("secret-key", "$2b$10$DI1" + key);
    req.send();
  };

  componentDidMount() {
    this.assignChars(charsData);
  }

  assignChars = chars => {
    const cha = Object.values(chars);
    cha.sort((a,b) => a.place - b.place);

    this.addClassesToFiletrs(cha);
    this.setState({ chars: cha, filteredChars: cha });
  }

  addClassesToFiletrs(cha) {
    let classes;
    cha.map(x => (
      classes = this.getThroughSkills(x),
      this.addClassesToFilters2(x, classes)
    ))
  }

  getThroughSkills(char) {
    let gottenClasses = [];
    for (let i = 0; i < 4; i++) {
      let skillClasses = char.skills[i].skillClasses.split(", ");
      for (let i = 0; i < skillClasses.length; i++) {
        gottenClasses.push(skillClasses[i]);
      }
    }
    if (char.alternateSkills.length > 0) {
      for (let i = 0; i < char.alternateSkills.length; i++) {
        let skillClasses = char.alternateSkills[i].skillClasses.split(", ");
        for (let i = 0; i < skillClasses.length; i++) {
          gottenClasses.push(skillClasses[i]);
        }
      }
    }
    let unique = [...new Set(gottenClasses)];
    return unique
  }

  addClassesToFilters2(x, classes) {
    for (let i = 0; i < classes.length; i++) {
      x.skillFilter.push(classes[i]);
    }
  }

  handleAvatarClick(e) {
    this.setState({ place: e.target.id, active: 'charInfo' });
  }

  getInfoFromMenu(whatIsActive) {
    this.setState({
      active: whatIsActive,
      filteredChars: this.state.chars,
      rmdKey: Math.floor(Math.random() * 99999).toString()
    });
  }

  getSearchResult(term) {
     const filterChars = this.state.chars.filter(char => {
      if (char.name.toLowerCase().includes(term.toLowerCase()))
        return true;
      return false;
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
              key={`${x.place}`}
              alt={x.name}
              src={x.avatar}
              id={`${x.place}`}
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
            {(this.state.active === 'charInfo' && this.state.chars.length>0) && <CharInfo id={this.state.place} chars={this.state.chars} />}
            {this.state.active === 'filters' && <CharFilter key={this.state.rmdKey} callbackFromParent={this.getCharFilters} />}
            {this.state.active === 'skillFilters' && <SkillFilter key={this.state.rmdKey} callbackFromParent={this.getSkillFilters} />}
          </div>
        </div>
        {this.state.calc && <DamageCalc />}
        <div className="footer">
          <p className='notice'>Important notice: The update from August 2022 was probably the last one in NA-Helper. <a href="https://naruto-boards.net/viewtopic.php?p=135081#p135081" target="_blank">Read more HERE</a></p>
          Made by Neji1113 / Patryqss
        </div>
      </>
    );
  }
}

export default AllChars;
