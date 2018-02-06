import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import _ from 'lodash'

class BooksApp extends React.Component {
    state = {

        books: [],
        shelves: [
            {currentlyReading: []},
            {wantToRead: []},
            {read: []}
        ],
        booksResult: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books,
                shelves: [
                    {currentlyReading: books.filter(book => book.shelf === 'currentlyReading')},
                    {wantToRead: books.filter(book => book.shelf === 'wantToRead')},
                    {read: books.filter(book => book.shelf === 'read')}
                ]
            });

        });
    };

    moveBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(booksIds => {
            book.shelf = shelf;
            let books = this.state.books;
            if(!(_.some(books, b => b.id === book.id))){
                books = _.concat(this.state.books, book);
            }
            else{
                _.find(books, b => b.id === book.id).shelf = shelf;
            }

            this.setState((state) => ({
                books: books,
                shelves: [
                    {currentlyReading: books.filter(book => book.shelf === 'currentlyReading')},
                    {wantToRead: books.filter(book => book.shelf === 'wantToRead')},
                    {read: books.filter(book => book.shelf === 'read')}
                ]
            }));
        });
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBooks
                        onSelectShelf={(book, shelf) => {
                            this.moveBook(book, shelf)
                        }}
                        books={this.state.books}
                        shelves={this.state.shelves}
                        booksResult={this.state.booksResult}
                        page={'list'}

                    />
                )}/>
                <Route path='/search' render={({history}) => (
                    <SearchBooks
                        books={this.state.books}
                        onSelectShelf={(book, shelf) => {
                            this.moveBook(book, shelf)
                        }}

                        booksResult={this.state.booksResult}
                        page={'search'}

                    />
                )}/>
            </div>
        )
    }

}

export default BooksApp
