import React from 'react';
import './Search.css';
import axios from 'axios';
import Loader from '../../img/loader.gif';
import PageNavigation from '../PageNavigation/PageNavigation';

class Search extends  React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
            totalResults: 0,
            totalPages: 0,
            currentPageNo: 0,
        };
        this.cancel = '';
    }

    getPagesCount = (total, denominator) => {
        const divisible = total % denominator === 0;
        const valueToBeAdded = divisible ? 0 : 1;
        return Math.floor(total / denominator) + valueToBeAdded;
    };

    fetchSearchResults = ( updatePageNo = '', query ) => {
        const pageNumber = updatePageNo ? `&page[offset]=8` : '';
        const searchUrl = `https://search.outdoorsy.com/rentals?filter[keywords]=${query}&page[limit]=8${pageNumber}`;

        if ( this.cancel ){
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();
        axios.get( searchUrl, {
            cancelToken: this.cancel.token
        })
            .then((res) => {
                const total = res.data.length;
                const totalPagesCount = this.getPagesCount( total, 8 );
                const resultNotFoundMsg = !res.data.length
                    ? 'There are no more search results. Please try a new search.'
                    : '';
                this.setState({
                    results: res.data,
                    totalResults: res.data.length,
                    currentPageNo: updatePageNo,
                    totalPages: totalPagesCount,
                    message: resultNotFoundMsg,
                    loading: false,
                });
            })
            .catch( error => {
                if (axios.isCancel(error) || error) {
                    this.setState( {
                        loading: false,
                        message: 'Failed to Fetch data.'
                    })
                }
        })
    };

    handleOnInputChange = (event) => {
        const query = event.target.value;
        if ( ! query ) {
            this.setState({ query, results: {}, totalResults: 0, totalPages: 0, currentPageNo: 0, message: '' } );
        } else {
            this.setState({ query, loading: true, message: '' }, () => {
                this.fetchSearchResults(1, query);
            });
        }
    };

    handlePageClick = (type) => {
        //event.preventDefault();
        const updatedPageNo =
            'prev' === type
                ? this.state.currentPageNo - 1
                : this.state.currentPageNo + 1;
        if (!this.state.loading) {
            this.setState({ loading: true, message: '' }, () => {
                this.fetchSearchResults(updatedPageNo, this.state.query);
            });
        }
    };

    renderSearchResults = () => {
        const {results} = this.state;
        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return (
                            <div className="result-items">
                                <h6 className="image-username">{result.name}</h6>
                                <div className="image-wrapper">
                                    <img className="image" src={result.url} alt={result.name}/>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };

    render() {
        const { query, loading,  message, currentPageNo, totalPages } = this.state;
        const  showPrevLink = 1 < currentPageNo;
        const showNextLink = totalPages > currentPageNo;

        return (
            <div className="container">
                {/*Search Input*/}
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        value={query}
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleOnInputChange}
                    />
                </label>
                {/*Error Message*/}
                { message && <p className="message">{ message }</p> }

                {/*Loader*/}
                <img  src={Loader} className={`search-loading ${loading ? 'show' : 'hide' }`}  alt="loader"/>

                {/*Navigation Top*/}
                <PageNavigation
                    loading={loading}
                    showPrevLink={showPrevLink}
                    showNextLink={showNextLink}
                    handlePrevClick={() => this.handlePageClick('prev')}
                    handleNextClick={() => this.handlePageClick('next')}
                />

                {/*Result*/}
                { this.renderSearchResults() }

                {/*Navigation Bottom*/}
                <PageNavigation
                    loading={loading}
                    showPrevLink={showPrevLink}
                    showNextLink={showNextLink}
                    handlePrevClick={() => this.handlePageClick('prev')}
                    handleNextClick={() => this.handlePageClick('next')}
                />
            </div>
        )
    }
}
export default Search;
