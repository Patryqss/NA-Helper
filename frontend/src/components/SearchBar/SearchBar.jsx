import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { term: '' }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }
    
    onFormSubmit(e) {
        e.preventDefault();
    }

    onFormChange(e) {
        this.setState({ term: e.target.value })
        this.state.term = e.target.value;
        this.props.callbackFromParent(this.state.term);
    }

    render() {
        return (
            <div className='ui segment'>
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <input 
                            type="text" 
                            placeholder="Search Character"
                            value={this.state.term}
                            onChange={this.onFormChange} />
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;