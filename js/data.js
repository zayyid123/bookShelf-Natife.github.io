// inisialisasi key storage
const KEY_STORAGE = "BOOK_KEY";

// tempat tampung data
let books = [];

// fungsi check storage
function checkLocalStorage() {
    if(typeof(Storage) !== undefined){
        return true
    }
    alert("Browser kamu tidak mendukung local storage");
    return false;
}

// fugsi saving data
function savingData() {
    const parsed /* string */ = JSON.stringify(books);
    localStorage.setItem(KEY_STORAGE, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

// fungsi load data
function loadDataFromStorage() {
    const myData  = localStorage.getItem(KEY_STORAGE);
    
    let data = JSON.parse(myData);
    
    if(data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

// fungsi taruh ke local storage
function putIntoLocalStorage() {
    if (checkLocalStorage()) {
        savingData();
    }
}


// fungsi ubah ke objek
function composeBookObject(title, author, year, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    };
}

// fungsi menemukan id buku
function findBook(bookId) {

    for(book of books){
        if(book.id === bookId)
            return book;
    }

    return null;
}

// fungsi menemukan index buku
function findBookIndex(bookId) {
    
    let index = 0
    for (book of books) {
        if(book.id === bookId)
            return index;

        index++;
    }

    return -1;
}