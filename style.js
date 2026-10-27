import { books } from "./data/data.js";

if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(books));
}

const tableBody = document.getElementById("books-table-body");

const LocalBooks = JSON.parse(localStorage.getItem("books"));

function desplayBooks() {
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

const button = document.getElementById("ajout-btn");

function validateName(name) {
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
  const name = bookName.title.trim();
  if (!validateName(name)) {
    console.log("Invalid title or duplicate book");
    return;
  }
  const newBook = {
    id:
      LocalBooks.length > 0
        ? Math.max(LocalBooks[LocalBooks.length - 1].id) + 1
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

button.addEventListener("click", function () {
  ajouterBooks();
  desplayBooks()
});
