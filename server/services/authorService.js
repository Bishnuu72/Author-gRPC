const Author = require("../models/Author.js");

module.exports = {
  createAuthor: async (call, callback) => {
    try {
      const { name, age, books } = call.request;
      const author = new Author({ name, age, books });
      const savedAuthor = await author.save();
      callback(null, {
        id: savedAuthor._id.toString(),
        name: savedAuthor.name,
        age: savedAuthor.age,
        books: savedAuthor.books
      });
    } catch (err) {
      callback(err);
    }
  },

  getAuthor: async (call, callback) => {
    try {
      const author = await Author.findById(call.request.id);
      if (!author) return callback({ code: 5, message: "Author not found" });
      callback(null, {
        id: author._id.toString(),
        name: author.name,
        age: author.age,
        books: author.books
      });
    } catch (err) {
      callback(err);
    }
  },

  updateAuthor: async (call, callback) => {
    try {
      const { id, name, age, books } = call.request;
      const author = await Author.findByIdAndUpdate(
        id,
        { name, age, books },
        { new: true } // return updated document
      );
      if (!author) return callback({ code: 5, message: "Author not found" });
      callback(null, {
        id: author._id.toString(),
        name: author.name,
        age: author.age,
        books: author.books
      });
    } catch (err) {
      callback(err);
    }
  },

  deleteAuthor: async (call, callback) => {
    try {
      const author = await Author.findByIdAndDelete(call.request.id);
      if (!author) return callback({ code: 5, message: "Author not found" });
      callback(null, { success: true });
    } catch (err) {
      callback(err);
    }
  },

  listAuthors: async (call, callback) => {
    try {
      const authors = await Author.find();
      const response = {
        authors: authors.map(a => ({
          id: a._id.toString(),
          name: a.name,
          age: a.age,
          books: a.books
        }))
      };
      callback(null, response);
    } catch (err) {
      callback(err);
    }
  }
};
