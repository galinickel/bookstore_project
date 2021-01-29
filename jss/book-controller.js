'use strict'
var gUpdateModalActive;
renderBooks()

function renderBooks() {
    var books = getSortedBooksForDisplay()
    var strHTMLs = books.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td class="td-title">${book.title}</td>
        <td>${book.price}$</td>
        <td class="books-actions"> <span class="btn btn-read" onclick="onReadBook(${book.id})"
        >Read</span>  <span class="btn btn-update" onclick = "onUpdateBook(event,${book.id})"
        >Update</span> <span class="btn btn-delete" onclick = "onDeleteBook(${book.id})">Delete</span></td>
        </tr>`
    })
    var elTable = document.querySelector('.table-books')
    elTable.innerHTML = strHTMLs.join('')
    var elNavBtns = document.querySelector('.nav-btns')
    var navNumBtns = createPaging()
    elNavBtns.innerHTML = `${navNumBtns}`
}
function createPaging() { 
    var strHtml = `<th   class="navigation-btns left"onclick="onPrevPage()">Previous</th>`
    for (var i = 1; i <= Math.floor(gBooks.length / PAGE_SIZE)+1; i++) {
    strHtml+=`<th class=" nav-num" onclick="onChangePage(${i})"> ${i} </th>`
    }
    strHtml+=`<th class="navigation-btns right"onclick="onNextPage()">Next</th>`
    return strHtml;
}

function onChangePage(pageIdx) { 
gPageIdx = pageIdx-1
renderBooks()
}
function onUpdateBook(ev, bookId) {
    if (ev.target.childNodes.length > 1) {
        return
    }
    openUpdateModal(ev, bookId)
}
function openUpdateModal(ev, id) {
    var elUpdateBtn = ev.target
    var elUpdateBtnContainer = elUpdateBtn.parentElement
    var elModal = document.createElement('span')
    elModal.innerHTML = `<span class="update-modal">
    <span class ="update-modal-text"> </span>
    <form onsubmit="onSubmitUpdate(event,${id})">
            <input
            type="text"
            name="newprice"
            placeholder="New Book Price"
            />
            <button class=" btn-update-modal btn-update">Update Price</button>
        </form>
    <span class ="update-modal-exit" onclick ="onCloseUpdateModal(event)">exit</span>
    </span>`
    if (!gUpdateModalActive) elUpdateBtnContainer.appendChild(elModal)
    gUpdateModalActive = true
}
function onSubmitUpdate(ev, bookId) {
    console.log(ev);
    var newPrice = document.querySelector('input[name=newprice]').value
    if (isNaN(newPrice)) return
    updateBook(bookId, newPrice);
    onCloseModal()
    onCloseUpdateModal(ev)
    renderBooks()
}

function onCloseUpdateModal(ev) {
    var elModal = ev.target.parentElement;
    var elModalContainer = elModal.parentElement;
    elModalContainer.innerHTML = ''
    gUpdateModalActive = false;

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
    elModal.querySelector('.rate-book-sect').innerHTML = 
    `        <h5 class="book-rating">${book.title} has a rating of ${book.rating} out of 10. </h5> 
<div class ="rating-panel">
    <span class="plus-btn" onclick="onUpdateBookRating(${book.id},'plus')"> + </span>
    <span class ="book-score"> ${book.rating} </span>
    <span class="minus-btn" onclick="onUpdateBookRating(${book.id},'minus')"> - </span>
</div>
    `
    elModal.classList.remove('hidden');

}
function onCloseModal() {
    var elModal = document.querySelector('.book-modal')
    elModal.classList.add('hidden');
}

function onUpdateBookRating(bookId, val) {
    updateBookRating(bookId, val)
    renderBooks()
    onReadBook(bookId)
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}

function onAddBook(ev) {
    ev.preventDefault();
    var title = document.querySelector('input[name=title]').value
    var price = document.querySelector('input[name=price]').value
    console.log(`title: ${title}`);
    addBook(title, price)
    renderBooks()

    var elForm = document.querySelector('.add-modal-form')
    elForm.classList.add('hidden')
}


function onCallAddBook() {
    var elForm = document.querySelector('.add-modal-form')
    elForm.classList.remove('hidden')
}


function onSetSort(sortBy) {
    console.log('Sorting by', sortBy);
    setSort(sortBy);
    renderBooks();
}

