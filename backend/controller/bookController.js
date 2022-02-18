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
  let books = await bookModel.find({ name: new RegExp(req.params["name"]) });

  if (books.lenght === 0)
    return res.status(400).send({ message: "no search result" });

  return res.status(200).send({ books });
};

export default { registerBook, listBook };
