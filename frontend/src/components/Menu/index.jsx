import React from 'react';


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(e) {
        this.props.callbackFromParent(e.target.id);
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
                <div className="button" id="game">
                    <a href='https://naruto-arena.net/' target='_blank'>Game</a>
                </div>
                <div className="button" id="boards">
                    <a href='https://boards.naruto-arena.net/index.php' target='_blank'>Boards</a>
                </div>
            </>
        )
    }
}

export default Menu; 