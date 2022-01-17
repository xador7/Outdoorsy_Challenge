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
    render() {
        return (
            <div className="container">
                {/*Search Input*/}
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        value=""
                        id="search-input"
                        placeholder="Search..."
                    />
                </label>
            </div>
        )
    }
}
export default Search;
