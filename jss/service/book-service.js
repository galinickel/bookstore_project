const KEY = 'books';
var gBooks;
var gPrices = [49, 59, 69, 79, 89]
const PAGE_SIZE = 10;
var gPageIdx = 0;
var gCount = 1;
var gImgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var gSortBy;

_createBooks();

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function prevPage() {
    if (gPageIdx < 1) return
    gPageIdx--;
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();

}

function addBook(title, price) {
    var book = _createBook(title, price)
    if (!book.price || !book.title) return
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function getBookById(bookId) {

    var book = gBooks.find(book => {
        return bookId === book.id
    })
    return book
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    book.price = newPrice;
    _saveBooksToStorage();
}

function getVendors() {
    return gVendors;
}


function _createBook(title, price) {
    if (!title || !price) return
    return {
        id: gCount++,
        title: capFirst(title),
        price: +(price),
        desc: makeLorem(),
        imgUrl: `img/${gImgs[[getRandomIntInclusive(1,gImgs.length-1)]]}.jpg`
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 25; i++) {
            books.push(_createBook(generateName(), gPrices[getRandomIntInclusive(1, gPrices.length - 1)]))
        }
    }
    gBooks = books;
    gCount = gBooks.length
    _saveBooksToStorage();
}



function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}


function getSortedBooksForDisplay() {
    var books = getBooks()
        if (gSortBy === 'price') {
        books = books.sort((a, b) => {
            return a.price - b.price
        })
    }
    if (gSortBy === 'id') {
        books = books.sort((a, b) => {
            return a.id - b.id
        })
        
    }
    if (gSortBy === 'title') {
        var books = books.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (b.title < a.title) {
                return 1;
            }
            return 0;
        })
    }
    return books;
}