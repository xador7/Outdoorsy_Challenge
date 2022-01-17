import React from 'react';
import './Search.css';
class Search extends  React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
        };
    }

    handleOnInputChange = (event) => {
        const query = event.target.value;
        console.warn(query);
        this.setState({query: query , loading: true, message: '' } );
    };

    render() {
        const { query } = this.state;
        console.warn('this.state',  this.state );
        return (
            <div className="container">
                {/*Search Input*/}
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        name="query"
                        value={query}
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleOnInputChange}
                    />
                </label>
            </div>
        )
    }
}
export default Search;
