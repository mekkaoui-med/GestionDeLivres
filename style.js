import { books } from "./data/data.js";

if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(books));
}

const tableBody = document.getElementById("books-table-body");

function desplayBooks() {
  const LocalBooks = JSON.parse(localStorage.getItem("books"));

  tableBody.innerHTML = "";

  LocalBooks.forEach(function (book) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th>${book.id}</th>
        <th>${book.title}</th>
        <th>${book.author}</th>
        <th>${book.year}</th>
        <th>${book.genre}</th>
        <th>${book.description}</th>
        <th>${book.status}</th>
    
        `;
    tableBody.appendChild(row);
  });
}
desplayBooks();

const bookName = document.getElementById("title");
const autherName = document.getElementById("author");
const yearBook = document.getElementById("year");
const bookDescription = document.getElementById("description");
const genreBook = document.getElementById("genre");
const statuBook = document.getElementById("statu");
const errurMessage = document.getElementById("ajout-errur");

const button = document.getElementById("ajout-btn");

function validateName(name) {
  const LocalBooks = JSON.parse(localStorage.getItem("books"));

  const patternRegix = /^[\p{L}\p{N}][\p{L}\p{N}\s:'’,.!?-]{1,99}$/u;
  if (!patternRegix.test(name.trim())) {
    return false;
  }
  const exist = LocalBooks.some(
    (book) =>
      book.title.toLocaleLowerCase() === name.trim().toLocaleLowerCase(),
  );
  if (exist) {
    return false;
  }
  return true;
}

function ajouterBooks() {
  const name = bookName.value.trim();
  const author = autherName.value.trim();
  if (!validateName(name) || !validateName(author)) {
    errurMessage.classList.remove("hidden");
    errurMessage.textContent = "the title or the author name is invalid";
    return;
  } else {
    errurMessage.classList.add("hidden");
  }
  const LocalBooks = JSON.parse(localStorage.getItem("books"));

  const newBook = {
    id:
      LocalBooks.length > 0
        ? Math.max(...LocalBooks.map((book) => book.id)) + 1
        : 1,
    title: name,
    author: autherName.value.trim().toLocaleLowerCase(),
    year: Number(yearBook.value.trim()),
    genre: genreBook.value.trim(),
    description: bookDescription.value.trim(),
    status: statuBook.value.trim(),
  };
  LocalBooks.push(newBook);
  localStorage.setItem("books", JSON.stringify(LocalBooks));

  desplayBooks();
}

const inputCherch = document.getElementById("cherch-input");
const nameCherchBtn = document.getElementById("cherch-btn-name");
const authorCherchBtn = document.getElementById("cherch-btn-author");

function cherchByName() {
  const LocalBooks = JSON.parse(localStorage.getItem("books"));
  const serchText = inputCherch.value.trim().toLowerCase();
  const result = LocalBooks.filter(function (book) {
    return book.title.toLowerCase().includes(serchText);
  });
  return result;
}

function cherchByAuthor() {
  const LocalBooks = JSON.parse(localStorage.getItem("books"));
  const serchText = inputCherch.value.trim().toLowerCase();
  const result = LocalBooks.filter(function (book) {
    return book.author.toLowerCase().includes(serchText);
  });
  return result;
}

const cherchErur = document.getElementById("cherch-erur");
const tableCherch = document.getElementById("table-cherch");
const tbodyCherch = document.getElementById("tbady-cherch");

nameCherchBtn.addEventListener("click", function () {
  const result = cherchByName();

  if (result.length == 0 || nameCherchBtn.value === "") {
    cherchErur.classList.remove("hidden");
    cherchErur.textContent = "the name is invalable";
  } else {
    tableCherch.classList.remove("hidden");
    cherchErur.classList.add("hidden")
    // const row = document.createElement("tr")
    // row.innerHTML = `
    // <th>${result[0].id}</th>
    // <th>${result[0].title}</th>
    // <th>${result[0].author}</th>
    // <th>${result[0].year}</th>
    // <th>${result[0].genre}</th>
    // <th>${result[0].description}</th>
    // <th>${result[0].status}</th>
    // `;
    // tbodyCherch.appendChild(row)
    createRowTable(result);
  }
});

authorCherchBtn.addEventListener("click", function () {
  const result = cherchByAuthor();
  if (result.length == 0 || authorCherchBtn.value == "") {
    cherchErur.classList.remove("hidden");
    cherchErur.textContent = "the author name is invalable";
  } else {
    tableCherch.classList.remove("hidden");
    createRowTable(result);
  }
});


const trieOption = document.getElementById("trie-option")

function trieByChois(){
    const choisDeTrie = trieOption.value;
    const LocalBooks = JSON.parse(localStorage.getItem("books"))
    const result = "";
    switch(choisDeTrie){
        case "Titre":
            result = LocalBooks.sort((a,b) => a.title.localeCompare(b.title))
            return result;
            break;
        case "Author":
            result = LocalBooks.sort((a,b) => a.author.localeCompare(b.author))
            return result;
            break;
        case "Année":
            result = LocalBooks.sort((a,b) => a.year - b.year)
            return result;
            break;
        default:
            result = "";

    }
    // if(choisDeTrie === "Titre"){
    //     result = result.sort((a,b) => a.title.localeCompare(b.title));
    //     return result;
    // }
}
const trieErur = document.getElementById("trie-errur")

trieOption.addEventListener("change", function(){
    const result = trieByChois();
    if(result == ""){
        trieErur.classList.remove("hidden");
        trieErur.textContent = "Choiser un genre";
    }else{
        trieErur.classList.add("hidde")
    }
})


function createRowTable(i) {
  const row = document.createElement("tr");
  tbodyCherch.textContent = "";

  row.innerHTML = `
    <th>${i[0].id}</th>
    <th>${i[0].title}</th>
    <th>${i[0].author}</th>
    <th>${i[0].year}</th>
    <th>${i[0].genre}</th>
    <th>${i[0].description}</th>
    <th>${i[0].status}</th>
  `;

  tbodyCherch.appendChild(row);
}


button.addEventListener("click", function () {
  ajouterBooks();
});
