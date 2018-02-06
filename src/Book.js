import React, {Component} from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'


class Book extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onSelectShelf: PropTypes.func.isRequired,
        book: PropTypes.object.isRequired,
        booksResult: PropTypes.array.isRequired,
        page: PropTypes.string.isRequired
    }

    render() {
        const {onSelectShelf, book} = this.props;
        let backgroundImage = '';
        book.imageLinks ? backgroundImage = `url(${book.imageLinks.smallThumbnail}.jpeg)` : backgroundImage = '';
        let bookShelf = book.shelf;
        if(bookShelf === 'none'){
            bookShelf = 'noneValue'
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: backgroundImage
                    }}></div>
                    <div className="book-shelf-changer">
                        <select className={bookShelf} value={bookShelf} onChange={(event) => onSelectShelf(book, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="noneValue">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }

}

export default Book