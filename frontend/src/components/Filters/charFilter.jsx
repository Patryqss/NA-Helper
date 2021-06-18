import React from 'react';

class charFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { includeFilters: [], excludeFilters: [] };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.filters = [
      'Akatsuki',
      'Anbu',
      'Cloud',
      'Edo Tensei',
      'Genin',
      'Jinchuuriki',
      'Jounin',
      'Kage',
      'Konoha',
      'Missing-Nin',
      'Mist',
      'Puppet Master',
      'Rain',
      'Rock',
      'Sand',
      'Shippuuden',
      'Sound Five',
      'Sound',
      'Swordsman',
      'Team 7',
      'Team 8',
      'Team 9',
      'Team 10',
    ];
  }

  componentDidUpdate(p, prevState) {
    const { includeFilters, excludeFilters } = this.state;
    if (prevState.includeFilters !== includeFilters || prevState.excludeFilters !== excludeFilters)
      this.props.callbackFromParent(includeFilters, excludeFilters)
  }

  handleButtonClick(e) {
    const { includeFilters, excludeFilters } = this.state;
    e.persist()
    if (e.target.className === 'filterr inactiveButton') {
      e.target.className = 'filterr activeButton';
      this.setState({
        includeFilters: [...includeFilters, e.target.id]
      })
    } else if (e.target.className === 'filterr activeButton') {
      e.target.className = 'filterr activeRedButton';
      this.setState(({ includeFilters, excludeFilters }) => ({
        includeFilters: includeFilters.filter(s => s !== e.target.id),
        excludeFilters: [...excludeFilters, e.target.id]
      }))
    } else if (e.target.className === 'filterr activeRedButton') {
      e.target.className = 'filterr inactiveButton';
      this.setState({
        excludeFilters: excludeFilters.filter(s => s !== e.target.id)
      })
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

export default charFilter;
