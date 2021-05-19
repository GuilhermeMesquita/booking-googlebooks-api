let section_res = document.querySelector("#res");

window.onload = () => {
    $(section_res).hide();
}

var icon = '<i class="fas fa-book-open main-color-theme" id="book"></i>';

document.getElementById("submit_search").addEventListener("click", function () {
    let input_search = document.querySelector("#text_search").value;
    if (input_search == "") {
        showAlert();
    } else {

        let card = document.querySelector("#main_card");
        let search_section = document.querySelector("#search_section");


        const key = "AIzaSyDkRQE007pCkimoASj9FnwM0DSSGn2LBWQ";
        let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${input_search}&key=${key}`;
        const req_api = new XMLHttpRequest();

        req_api.open("GET", url, true);

        req_api.onreadystatechange = () => {
            if (req_api.readyState == 4 && req_api.status == 200) {
                const obj = JSON.parse(req_api.responseText);
                console.log("RETORNO DO OBJETO: " + obj);
                card.style.display = "none";

                for (var i = 0; i < obj.items.length; i++) {
                    var title = obj.items[i].volumeInfo.title;
                    var author = obj.items[i].volumeInfo.authors;
                    var date = obj.items[i].volumeInfo.publishedDate;
                    var publisher = obj.items[i].volumeInfo.publisher;
                    var url_book = obj.items[i].volumeInfo.infoLink;


                    if (title == undefined) title = "<b>title not found</b>";
                    if (author == undefined) author = "<b>author not found</b>";
                    if (date == undefined) date = "<b>date not found</b>";
                    if (publisher == undefined) publisher = "<b>publisher not found</b>";
                    if (url_book == undefined) url_book = "<b>url_book not found</b>";


                    $(section_res).show();
                    section_res.innerHTML +=
                        `<div class="card w-shadow" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-subtitle text-muted">${author}</p>
                                <p class="card-subtitle text-muted">${publisher}</p>
                                <p class="card-subtitle">${date}</p>
                                <br>
                                <a href="${url_book}" target="_blank" class="btn btn-outline-primary btn-s-m main-color-theme" style="float: right;">See more... ${icon}</a>
                            </div>
                        </div>`

                    // `< div class='card res_livros w-shadow' > <table><tr>${title}</tr><tbody></tbody><tr><td>${author}</td></tr><tr><td>${publisher}</td></tr><tr><td>${date}</td></tr><tr><td><a href="${url_book}">Saiba mais... ${icon}</td></tr></tbody></table></div > `
                }

                $(search_section).hide();
                $(card).hide();

            }
        }

        req_api.send();



    }
});