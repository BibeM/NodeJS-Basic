import { EventEmitter } from "node:events";
import { createPath } from "../utils.js";
import { appendFileSync } from "node:fs";

export const loggerEmitter = new EventEmitter();
const LOG_PATH = createPath(["data", "log.txt"]);
loggerEmitter
  .on("create-book", (bookId) => {
    appendFileSync(
      LOG_PATH,
      `The book with id: ${bookId} was created on: ${new Date()}\n`
    );
  })
  .on("edit-book", (bookId) => {
    appendFileSync(
      LOG_PATH,
      `The book with id: ${bookId} was updated on: ${new Date()}\n`
    );
  })
  .on("delete-book", (bookId) => {
    appendFileSync(
      LOG_PATH,
      `The book with id: ${bookId} was deleted on: ${new Date()}\n`
    );
  });
