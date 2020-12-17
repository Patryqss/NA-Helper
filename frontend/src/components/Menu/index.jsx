import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCalcClick = this.handleCalcClick.bind(this);
  }

  handleButtonClick(e) {
    this.props.callbackFromParent(e.target.id);
  }
  handleCalcClick() {
    this.props.changeCalcVisibility();
  }

  render() {
    return (
      <>
        <div onClick={this.handleButtonClick} className="button" id="filters">
          Filters
        </div>
        <div onClick={this.handleButtonClick} className="button" id="skillFilters">
          Skill Filters
        </div>
        <div onClick={this.handleCalcClick} className="button">
          Damage Calc
        </div>
        <div className="button" id="game">
          <a href="https://naruto-arena.net/" rel="noopener noreferrer" target="_blank">
            Game
          </a>
        </div>
        <div className="button" id="boards">
          <a href="https://naruto-boards.net/index.php" rel="noopener noreferrer" target="_blank">
            Boards
          </a>
        </div>
      </>
    );
  }
}

export default Menu;
