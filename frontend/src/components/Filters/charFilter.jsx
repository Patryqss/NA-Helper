import React from 'react';

class charFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { includeFilters: [], excludeFilters: [] }
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.filters = ["Akatsuki", "Cloud", "Edo Tensei", "Genin", "Jinchuuriki", "Jounin", "Kage", "Konoha", "Missing-Nin", "Mist", "Puppet Master", "Rain", "Rock", "Sand", "Shippuuden", "Sound Five", "Sound", "Swordsman", "Team 7", "Team 8", "Team 9", "Team 10"]
    }

    handleButtonClick(e) {
        let includeSkills = this.state.includeFilters;
        let excludeSkills = this.state.excludeFilters;
        if (e.target.className === 'filterr inactiveButton') {
            includeSkills.push(e.target.id);
            e.target.className = 'filterr activeButton';
            this.state.includeFilters = includeSkills;
        } else if (e.target.className === 'filterr activeButton') {
            includeSkills = includeSkills.filter(s => s !== e.target.id);
            excludeSkills.push(e.target.id);
            e.target.className = 'filterr activeRedButton';
            this.state.includeFilters = includeSkills;
            this.state.excludeFilters = excludeSkills;
        } else if (e.target.className === 'filterr activeRedButton') {
            excludeSkills = excludeSkills.filter(s => s !== e.target.id);
            e.target.className = 'filterr inactiveButton';
            this.state.excludeFilters = excludeSkills;
        }
        this.props.callbackFromParent(this.state.includeFilters, this.state.excludeFilters);
    }

    render() {
        return (
            <div className='filterButtons'>
                {this.filters.map(x => (
                    <div onClick={this.handleButtonClick} key={x} className='filterr inactiveButton' id={x}>{x}</div>
                ))}
            </div>
        )
    }
}

export default charFilter; 