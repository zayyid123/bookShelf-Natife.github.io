document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", function (event) {
        swal("Selamat!", "Data Berhasil Disimpan!", "success");
        event.preventDefault();
        addBook();
    });

    if(checkLocalStorage()){
        loadDataFromStorage();
    }

});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataBook();
});
