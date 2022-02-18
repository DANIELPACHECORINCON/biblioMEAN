import bookModel from "../models/books.js";

const existingBook = async (req, res, next) => {
  if (!req.body.id) return res.status(400).send({ message: "Incomplete data" });

  const existingId = await bookModel.findOne({ id: req.body.id });
  // si el libro existe le mostramos un mensaje de error
  if (existingId)
    return res.status(400).send({ message: "The book is already registered" });

  next();
};

const existingBook2 = async (req, res, next) => {
  if (!req.body.book) return res.status(400).send({ message: "Incomplete data" });

  const existingId = await bookModel.findOne({ id: req.body.book });
  // si el libro existe le mostramos un mensaje de error
  if (!existingId)
    return res
      .status(400)
      .send({ message: "The book is not already registered" });

  req.body.book = existingId._id;
  next();
};

export default { existingBook, existingBook2 };
