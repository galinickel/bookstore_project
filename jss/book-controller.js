'use strict'

renderBooks()

function renderBooks() {
    var books = getSortedBooksForDisplay()
    console.log(books);
    var strHTMLs = books.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.price}$</td>
        <td class="books-actions"> <span class="btn btn-read" onclick="onReadBook(${book.id})"
        >Read</span>  <span class="btn btn-update" onclick = "onUpdateBook(${book.id})"
        >Update</span> <span class="btn btn-delete" onclick = "onDeleteBook(${book.id})">Delete</span></td>
        </tr>`
    })
    var elTable = document.querySelector('.table-books')
    elTable.innerHTML = strHTMLs.join('')

}
function onUpdateBook(bookId) {
    var newPrice = +prompt('Set a new price:')
    if (isNaN(newPrice)) return
    updateBook(bookId, newPrice);
    onCloseModal()
    renderBooks();
}
function onDeleteBook(bookId) {
    deleteBook(bookId)
    onCloseModal()
    renderBooks()
}

function onReadBook(bookId) {
    
    var book = getBookById(bookId)
    console.log(`the book at id: ${bookId} is: ${book}`);
    var elModal = document.querySelector('.book-modal')
    elModal.querySelector('.img').innerHTML = `<img class="book-img" src="${book.imgUrl}" alt="Card image cap">
    `
    elModal.querySelector('h5').innerText = book.title
    elModal.querySelector('h6').innerText = `Price: ${book.price}$`
    elModal.querySelector('p').innerText = book.desc
    elModal.hidden = false;

}
function onCloseModal(){
    var elModal = document.querySelector('.book-modal')
    elModal.hidden = true;

}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() { 
    prevPage();
    renderBooks();
}

function onAddBook() {
    var title = prompt('What`s your book`s title?')
    var price = prompt('What`s the price of the book?')

    addBook(title, price)
    renderBooks()
}

function onSetSort(sortBy) {
    console.log('Sorting by', sortBy);
    setSort(sortBy);
    renderBooks();
}

