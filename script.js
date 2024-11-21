const myLibrary = [];
const cardContainer = document.querySelector(".card-container");
const dialog = document.querySelector(".book-form");
const bookForm = document.querySelector(".book-form>form");
const showButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".cancel-book");
const submitButton = document.querySelector(".submit-book");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

submitButton.addEventListener("click", () => {
  let title = document.getElementById("name");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");
  let read = document.getElementById("read");

  addBookToLibrary(
    title.value,
    author.value,
    parseInt(pages.value),
    read.checked,
  );

  displayLibrary();
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayLibrary() {
  let childArray = [];
  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList = "card";
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.dataset.index = index;
    delBtn.addEventListener("click", (e) => {
      myLibrary.splice(e.target.dataset.index, 1);
      displayLibrary();
    });

    const readBtn = document.createElement("button");
    readBtn.textContent = "Toggle Read";
    readBtn.dataset.index = index;
    readBtn.addEventListener("click", (e) => {
      let val = myLibrary[e.target.dataset.index].read;
      myLibrary[e.target.dataset.index].read = !val;
      displayLibrary();
    });

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    read.textContent = book.read ? "Read" : "Not read yet";
    card.append(title, author, pages, read, delBtn, readBtn);
    childArray.push(card);
  });
  cardContainer.replaceChildren(...childArray);
}

addBookToLibrary("The Hobbit", "JRR Tolkien", 1077, false);
addBookToLibrary("Dune", "Frank Herbert", 896, false);
addBookToLibrary("Julius Ceaser", "William Shakespeare", 288, true);
addBookToLibrary("Berserk", "Kentaro Miura", 2458, false);

displayLibrary();
