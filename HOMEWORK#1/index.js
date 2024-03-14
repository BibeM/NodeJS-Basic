import { Book } from "./src/book.model.js";
import { BookService } from "./src/book.service.js";
import { createPath } from "./utils.js";
import { loggerEmitter } from "./src/logger.js";

const BOOKS_PATH = createPath(["data", "books.json"]);

const getAllBooks = async () => {
  const books = await BookService.readJSONFile(BOOKS_PATH);
  return books;
};
const saveBooks = async (books) => {
  await BookService.saveJSONFile(BOOKS_PATH, books);
};
const createBook = async (title, author, publicationYear, quantity) => {
  const books = await getAllBooks();

  if (
    (typeof title === "string") &
    (typeof author === "string") &
    typeof (publicationYear === "number") &
    (typeof quantity === "number")
  ) {
    const newBook = new Book(title, author, publicationYear, quantity);
    const updatedBooks = [...books, newBook];
  }
  if (
    !(typeof title === "string") ||
    !(typeof author === "string") ||
    !typeof (publicationYear === "number") ||
    !(typeof quantity === "number")
  )
    throw new Error("Invalid input!");

  await saveBooks(updatedBooks);

  loggerEmitter.emit("create-book", newBook.id);
};

const getBookById = async (bookId) => {
  const books = await getAllBooks();

  const foundBook = books.find((book) => book.id === bookId);

  if (!foundBook) throw new Error("BOOK NOT FOUND!");

  return foundBook;
};

const updateBook = async (
  bookId,
  newTitle,
  newAuthor,
  newPublicationYear,
  newQuantity
) => {
  const books = await getAllBooks();

  const idExists = books.some((book) => book.id === bookId);

  if (!idExists) throw new Error("Can't update book! Book not found!");

  const updatedBooks = books.map((book) => {
    if (book.id === bookId) {
      return {
        ...book,
        title: newTitle,
        author: newAuthor,
        publicationYear: newPublicationYear,
        quantity: newQuantity,
      };
    } else {
      return book;
    }
  });

  await saveBooks(updatedBooks);

  loggerEmitter.emit("edit-book", bookId);
};

const deleteBook = async (bookId) => {
  const books = await getAllBooks();

  const updatedBooks = books.filter((book) => book.id !== bookId);

  if (books.length === updatedBooks.length)
    throw new Error("Can't delete book! Book not found!");

  await saveBooks(updatedBooks);

  loggerEmitter.emit("delete-book", bookId);
};

const deleteAllBooks = async () => {
  await saveBooks([]);
};

const app = async () => {
  try {
    await createBook(
      "Harry Potter and the Sorcerer’s Stone",
      "J.K. Rowling",
      "1997",
      "2645826"
    );

    const books = await getAllBooks();
    console.log(books);
  } catch (error) {
    console.error(error);
  }
};

app();
