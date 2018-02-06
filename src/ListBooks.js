import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Book from './Book'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onSelectShelf: PropTypes.func.isRequired,
        shelves: PropTypes.array.isRequired,
        booksResult: PropTypes.array.isRequired,
        page: PropTypes.string.isRequired
    }

    render() {
        const {onSelectShelf, books,shelves, booksResult, page} = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf, i) => (
                            <div className="bookshelf" key={i}>
                                <h2 className="bookshelf-title">{_.startCase(Object.keys(shelf).toString())}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {shelf[Object.keys(shelf)].map((book, j) => (
                                            <li key={j}>
                                                <Book
                                                    books={books}
                                                    book={book}
                                                    onSelectShelf={onSelectShelf}
                                                    booksResult={booksResult}
                                                    page={page}
                                                />
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search' className='add-book'>Add Book</Link>
                </div>
            </div>
        )
    }

}

export default ListBooks