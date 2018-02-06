import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import {DebounceInput} from 'react-debounce-input'

class SearchBooks extends Component {
    static propTypes = {
        onSelectShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired,
        booksResult: PropTypes.array.isRequired,
        page: PropTypes.string.isRequired
    }

    state = {
        query: '',
        booksResult: this.props.booksResult

    }

    updateQuery = (query, booksResult) => {
        this.setState({
            query: query,
            booksResult: booksResult || []
        })
    }

    clearQuery = () => {
        this.setState({query: ''})
    }

    searchBook = (query, books) => {
        BooksAPI.search(query).then(booksRes => {
            let booksResult = [];

            (booksRes && booksRes.length) ? booksResult = booksRes : booksResult = [];

            booksResult.forEach(book => {
                if (_.some(books, b => b.id === book.id)) {
                    book.shelf = _.find(books, foundBook => foundBook.id === book.id).shelf;
                }
                else {
                    book.shelf = 'none';
                }
            });

            this.setState((state) => ({
                booksResult: booksResult
            }));
        });
    };


    render() {
        const {onSelectShelf, books, page} = this.props;
        const {query, booksResult} = this.state;


        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <div><Link to='/' className='close-search'>Close</Link></div>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <DebounceInput type="text" placeholder="Search by title or author"
                               onFocus={(event) => event.target.placeholder = ""}
                               onBlur={(event) => event.target.placeholder = "Search by title or author"}
                               value={query} minLength={1} debounceTimeout={300} onChange={(event) => {
                                   this.updateQuery(event.target.value);
                            this.searchBook(event.target.value, books);
                        }}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {_.map(this.state.booksResult, (book, index) => (
                            <li key={index}>
                                <Book
                                    books={books}
                                    book={book}
                                    onSelectShelf={onSelectShelf}
                                    booksResult={booksResult}
                                    page={page}
                                />
                            </li>
                        ))};
                    </ol>
                </div>
            </div>
        )
    }

}

export default SearchBooks