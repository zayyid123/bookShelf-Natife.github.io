// tempat complete dan uncomplete
const COMPLETE = "complete";
const UNCOMPLETE = "unComplete";
const ID_BOOK ="itemId";

// fungsi manipulasi DOM
function makeBook(title, author, year, isComplete) {
    
    // include image
    const imgBokk = document.createElement("img");
    imgBokk.setAttribute("src","https://cdn0-production-images-kly.akamaized.net/Yd4lO_9a_bz_KoLfyBo4YZZol4I=/640x480/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/840064/original/077554100_1427727727-baground.jpg");
    imgBokk.classList.add("myImg");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");
    imgContainer.append(imgBokk);

    
    //  data book
    const titleBook = document.createElement("h3");
    titleBook.innerText = title;

    const authorBook = document.createElement("p");
    authorBook.classList.add("myAuthor");
    authorBook.innerText = author;

    const yearBook = document.createElement("p");
    yearBook.classList.add("myYear");
    yearBook.innerText = year;

    const bookContainer = document.createElement("div");
    bookContainer.classList.add("innerContainerBook");
    bookContainer.append(titleBook, authorBook, yearBook);

    const myContainer = document.createElement("div");
    myContainer.classList.add("outerContainerBook", "shadow");
    myContainer.append(imgContainer, bookContainer);
    

    if(isComplete == true){
        myContainer.append(
            moveFromComplete(),
            removeThisBook()
        )
    }else{
        myContainer.append(
            moveFromUnComplete(),
            removeThisBook()
        )
    }

    return myContainer;
}

// fungsi mendapatkan nilai checkbox
function cehckBox() {
    const check = document.getElementById("inputBookIsComplete");
    if (check.checked) {
        return true;
    }else{
        return false;
    }
}

// fungsi addbook untuk menambahkan buku
function addBook() {

    const whenComplete = document.getElementById(COMPLETE);
    const whenUnComplete = document.getElementById(UNCOMPLETE);

    const myTitleBook = document.getElementById("inputBookTitle").value;
    const myAuthorBook = document.getElementById("inputBookAuthor").value;
    const myYearBook = document.getElementById("inputBookYear").value;

    const makingBook = makeBook(myTitleBook, myAuthorBook, myYearBook, cehckBox());
    const makingObj = composeBookObject(myTitleBook, myAuthorBook, myYearBook, cehckBox());

    makingBook[ID_BOOK] = makingObj.id;
    books.push(makingObj);

    if (cehckBox() == true) {
        whenComplete.append(makingBook);
    }else{
        whenUnComplete.append(makingBook);
    }

    putIntoLocalStorage()
}

// form complete to uncomplete
function moveFromComplete() {
    return makeButton("move-from-complete", function (event) {
        removeMoveFromComplete(event.target.parentElement);
    });
}

// from uncomplete to complete
function moveFromUnComplete() {
    return makeButton("move-from-uncomplete", function (event) {
        removeMoveFromUnComplete(event.target.parentElement);
    });
}

// remove
function removeThisBook() {
    return makeButton("remove-book", function (event) {
        removeBook(event.target.parentElement);
    });
}

// function untuk tambah button
function makeButton(buttonClass, myEvent) {
    const myButton = document.createElement("button");
    myButton.classList.add(buttonClass);
    myButton.addEventListener("click", function (event) {
        myEvent(event);
        event.stopPropagation();
    });
    return myButton;
}


// untuk pindah ke uncomplete
function removeMoveFromComplete(myElement) {
    const unComplete = document.getElementById(UNCOMPLETE);

    const newTitle = myElement.querySelector(".innerContainerBook > h3").innerText;
    const newAuthor = myElement.querySelector(".myAuthor").innerText;
    const newYear = myElement.querySelector(".myYear").innerText;

    const newBook = makeBook(newTitle, newAuthor, newYear, false);

    const book = findBook(myElement[ID_BOOK]);
    book.isComplete = false;
    newBook[ID_BOOK] = book.id;

    unComplete.append(newBook);
    myElement.remove();

    putIntoLocalStorage();
}

// untuk pindah ke complete
function removeMoveFromUnComplete(myElement) {
    const Complete = document.getElementById(COMPLETE);

    const newTitle = myElement.querySelector(".innerContainerBook > h3").innerText;
    const newAuthor = myElement.querySelector(".myAuthor").innerText;
    const newYear = myElement.querySelector(".myYear").innerText;

    const newBook = makeBook(newTitle, newAuthor, newYear, true);

    const book = findBook(myElement[ID_BOOK]);
    book.isComplete = true;
    newBook[ID_BOOK] = book.id;

    Complete.append(newBook);
    myElement.remove();

    putIntoLocalStorage();
}

// for remove
function removeBook(myElement) {
    swal({
        title: "Anda Yakin Ingin Hapus ?",
        text: "Data yang akan dihapus akan hilang selamanya!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
            swal("Succes! Data anda berhasil dihapus!", {
                icon: "success",
            });
            removeThisBook();
            } else {
            swal("Data anda aman!");
            }
        });

    function removeThisBook() {
        const bookPosition = findBookIndex(myElement[ID_BOOK]);
        books.splice(bookPosition, 1);

        myElement.remove();
        putIntoLocalStorage();
    }
}


// refres data
function refreshDataBook() {
    const bookUncomplete = document.getElementById(UNCOMPLETE);
    const bookComplete = document.getElementById(COMPLETE);

    for(book of books){
        const newBook = makeBook(book.title, book.author, book.year, book.isComplete);
        newBook[ID_BOOK] = book.id;

        if(book.isComplete){
            bookComplete.append(newBook);
        } else {
            bookUncomplete.append(newBook);
        }
    }
}