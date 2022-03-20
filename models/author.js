const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: String,
  pages: Number,
});

const AuthorSchema = new Schema({
  name: String,
  age: Number,
  books: [BookSchema], // schema's can be nested
});

const Author = mongoose.model("author", AuthorSchema);

module.exports = Author;
