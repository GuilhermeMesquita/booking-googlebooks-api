let section_res = document.querySelector("#res");

window.onload = () => {
    $(section_res).hide();
}

var icon = '<i class="fas fa-book-open"></i>';

document.getElementById("submit_search").addEventListener("click", function () {
    let input_search = document.querySelector("#text_search").value;
    if (input_search == "") {
        alert("Provisório!");
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


                    if (title == undefined) title = "<b>Error 404 - title not found</b>";
                    if (author == undefined) author = "<b>Error 404 - author not found</b>";
                    if (date == undefined) date = "<b>Error 404 - date not found</b>";
                    if (publisher == undefined) publisher = "<b>Error 404 - publisher not found</b>";
                    if (url_book == undefined) url_book = "<b>Error 404 - url_book not found</b>";


                    $(section_res).show();
                    section_res.innerHTML +=
                        `<div class='card res_livros w-shadow'><table><tr>${title}</tr><tbody></tbody><tr><td>${author}</td></tr><tr><td>${publisher}</td></tr><tr><td>${date}</td></tr><tr><td><a href="${url_book}">Saiba mais... ${icon}</td></tr></tbody></table></div>`
                }

                $(search_section).hide();
                $(card).hide();

            }
        }

        req_api.send();



    }
});