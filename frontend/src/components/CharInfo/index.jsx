import React from 'react';
import setHeaders from '../../utils/setHeaders';

import DescriptionWindow from './descriptionWindow';

class CharInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: {},
      name: 'Uzumaki Naruto',
      clas: '',
      skillPage:0,
      originalSkill: {},
      cst: [],
      coold: '',
      alter: false,
      mission: false,
      descr:
        'A Genin from Team 7, Naruto is an orphan with the goal to one day become Hokage. Using his signature move, Shadow Clones, Naruto is able to perform powerful moves such as the Uzumaki Naruto Combo and the Rasengan.',
    };
    this.handleSkillClick = this.handleSkillClick.bind(this);
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.handleAlternate = this.handleAlternate.bind(this);
    this.handleMission = this.handleMission.bind(this);
  }

  getData = async () => {
    const cha = await fetch(`/api/chars/${this.props.id}`, setHeaders()).then(response => response.json());

    this.setState({ char: cha, originalSkill: cha.skills });
    if (this.state.char.alternateSkills.length > 0) this.setState({ alter: true });
    else this.setState({ alter: false });
    if (this.state.char.mission.length > 0) this.setState({ mission: true });
    else this.setState({ mission: false });
    this.handleAvatarClick();
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getData();
    }
  }

  handleSkillClick(e) {
    let sDesc = this.state.char.skills.find(x => x.skillName === e.target.id).skillDescription;
    let sClass = this.state.char.skills.find(x => x.skillName === e.target.id).skillClasses;
    let sCost = this.state.char.skills.find(x => x.skillName === e.target.id).skillCost;
    let sCool = this.state.char.skills.find(x => x.skillName === e.target.id).skillCooldown;

    this.setState({ name: e.target.id, descr: sDesc, clas: sClass, cst: sCost, coold: sCool });
  }

  handleAvatarClick() {
    this.setState({
      name: this.state.char.name,
      descr: this.state.char.description,
      coold: 'None',
      clas: ' ',
      cst: ' ',
      tai: this.state.char.chakraUsed[0],
      blood: this.state.char.chakraUsed[1],
      nin: this.state.char.chakraUsed[2],
      gen: this.state.char.chakraUsed[3],
      random: this.state.char.chakraUsed[4],
    });
  }

  handleAlternate() {
    const {skillPage, char, originalSkill} = this.state
    const { alternateSkills, skills } = char;
    // Order skillsets by page and normalize every element by skillReplace - 1
    const {arr} = alternateSkills.reduce((p, c, i) =>{
      if (p.prevEl?.skillReplace !== c.skillReplace) {
            let arr = [...p.arr]
            let el = {...p.el, [c.skillReplace - 1]: c};
            arr[p.index] = el
            return {el, arr, prevEl: c}
      }
      let el = {[p.prevEl.skillReplace - 1]: c}
      return {el, arr: [...p.arr, [el]], prevEl: c, index: p.index + 1}
    }, {el: {}, arr: [], prevEl: {}, index: 0})
    //normalize the skill array
    const normSkills = {...skills};
    const skillSets = [...arr, originalSkill]; 
    const currentChar = {
      ...this.state.char,
      skills: Object.values({...normSkills, ...skillSets[skillPage]}),
      skillPage: skillPage
    };
    this.setState({ char: currentChar, skillPage:  (skillPage + 1) % skillSets.length });
  }

  handleMission() {
    let mDesc = '';
    for (let i = 1; i < this.state.char.mission.length; i++) {
      mDesc = mDesc + '\n • ' + this.state.char.mission[i];
    }

    this.setState({ name: this.state.char.mission[0], descr: mDesc, coold: 'None', clas: ' ', cst: ' ' });
  }

  render() {
    return (
      <div className="charDiv">
        <div className="avatarAndChakra">
          <img
            onClick={this.handleAvatarClick}
            className="avatar"
            alt="avatar"
            name={this.state.char.name}
            desc={this.state.char.description}
            src={this.state.char.avatar}
          />
          <div className="chakras">
            <div className="chakraGroup">
              <div className="taijutsu"></div> x{this.state.tai}
            </div>
            <div className="chakraGroup">
              <div className="bloodline"></div> x{this.state.blood}
            </div>
            <div className="chakraGroup">
              <div className="ninjutsu"></div> x{this.state.nin}
            </div>
            <div className="chakraGroup">
              <div className="genjutsu"></div> x{this.state.gen}
            </div>
            <div className="chakraGroup">
              <div className="random"></div> x{this.state.random}
            </div>
          </div>
        </div>
        <div className="skills">
          {this.state.char.skills &&
            this.state.char.skills.map(x => (
              <img
                onClick={this.handleSkillClick}
                key={x.skillName}
                alt={x.skillName}
                src={x.skillPics}
                id={x.skillName}
                className="skillpic"
              />
            ))}
        </div>
        <div className="additionalButtons">
          {this.state.alter && (
            <div onClick={this.handleAlternate} className="button">
              Alter
            </div>
          )}
          {this.state.mission && (
            <div onClick={this.handleMission} className="button">
              Mission
            </div>
          )}
        </div>
        <DescriptionWindow
          name={this.state.name}
          desc={this.state.descr}
          cost={this.state.cst}
          classes={this.state.clas}
          cooldown={this.state.coold}
        />
      </div>
    );
  }
}

export default CharInfo;
