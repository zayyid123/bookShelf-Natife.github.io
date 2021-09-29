// inisialisasi
const formFindBook = document.getElementById("searchBook");
const buttonFindClose = document.getElementById("buttonFindClose");
const myModal = document.getElementById("modal");
const searchSubmit = document.getElementById("searchSubmit");

// event submit
formFindBook.addEventListener("submit", function findBook(event) {
    event.preventDefault();
    const findTitle = document.getElementById("searchBookTitle").value;
    const result = books.filter(function (data) {
        if (findTitle == '') {
            return null;
        }else{
            return data.title.toLowerCase().includes(findTitle.toLowerCase());
        }
    })

    const resultTitle = loopResult(result);

    for (book of books) {
        if (book.title == resultTitle) {
            manipulateModal();
        }
    }

    if (result.length) {
        myModal.classList.toggle("showModal");
    }else if (result.length == 0) {
        noDataBook()
        myModal.classList.toggle("showModal");
    }
});


function loopResult(result) {
    for (let i = 0; i < result.length; i++) {
        const resultTitle = result[i].title;
        return resultTitle;
    }
}

// fungsi DOM
function manipulateModal() {
    const imgFind = document.createElement("img");
    imgFind.setAttribute("src","https://cdn0-production-images-kly.akamaized.net/Yd4lO_9a_bz_KoLfyBo4YZZol4I=/640x480/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/840064/original/077554100_1427727727-baground.jpg");

    const myFindTitle = document.createElement("h3");
    myFindTitle.classList.add("myfIndTitle");
    myFindTitle.innerText = book.title;

    const myFindAuthor = document.createElement("p");
    myFindAuthor.classList.add("myFindAuthor");
    myFindAuthor.innerText = book.author;

    const myFindYear = document.createElement("p")
    myFindYear.classList.add("myFindYear");
    myFindYear.innerText = book.year;

    const itemFind = document.createElement("div");
    itemFind.classList.add("itemFind");
    itemFind.append(myFindTitle, myFindAuthor, myFindYear);

    const innerFind = document.createElement("div");
    innerFind.classList.add("innerFind");
    innerFind.append(imgFind, itemFind);

    const destinationElementFind = document.getElementById('mycontainerFind');
    destinationElementFind.append(innerFind);
}

// manipulasi Dom ketika data tidak ada
function noDataBook() {
    const noDataBook = document.createElement("h3");
    noDataBook.classList.add("noDataBook");
    noDataBook.innerText = "No Data";

    const innerFind = document.createElement("div");
    innerFind.classList.add("innerFind");
    innerFind.append(noDataBook);

    const destinationElementFind = document.getElementById('mycontainerFind');
    destinationElementFind.append(innerFind);
}

// event click close
buttonFindClose.addEventListener("click", function closeFind() {
    const innerFind = document.querySelectorAll(".innerFind");
    for (let i = 0; i < innerFind.length; i++) {
        innerFind[i].remove();
    }
    myModal.classList.remove("showModal");
})