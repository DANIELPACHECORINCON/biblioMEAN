import bookModel from "../models/books.js";

const registerBook = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.writer ||
    !req.body.section ||
    !req.body.editorial ||
    !req.body.copy
  )
    return res.status(400).send({ message: "Incomplete data" });

  const schemaBook = new bookModel({
    id: req.body.id,
    name: req.body.name,
    writer: req.body.writer,
    section: req.body.section,
    editorial: req.body.editorial,
    copy: req.body.copy,
    bookStatus: "available"
  });

  let result = await schemaBook.save();

  if (!result)
    return res.status(500).send({ message: "Failed to register data" });

  return res.status(200).send({ result });
};

const listBook = async (req, res) => {
  const books = await bookModel.find({ name: new RegExp(req.params["name"]) });

  if (books.lenght === 0)
    return res.status(400).send({ message: "no search result" });

  return res.status(200).send({ books });
};

const deleteBook = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Imcomplete data" });

  const books = await bookModel.findByIdAndDelete(req.params["_id"]);
  return !books
    ? res.status(500).send({ message: "Error deleting book" })
    : res.status(200).send({ message: "Book deleted" });
};

const updateBook = async (req, res) => {
  if (!req.body._id ||
      !req.body.name ||
      !req.body.writer ||
      !req.body.section ||
      !req.body.editorial ||
      !req.body.copy ||
      !req.body.bookStatus
  )
    return res.status(400).send({ message: "Incomplete data." });


  const books = await bookModel.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    writer: req.body.writer,
    section: req.body.section,
    editorial: req.body.editorial,
    copy: req.body.copy,
    bookStatus: req.body.bookStatus
  });

  if (!books) return res.status(500).send({ message: "Error updating book" });
  return res.status(200).send({ message: "Book updated" });
};

export default { registerBook, listBook, deleteBook, updateBook };
