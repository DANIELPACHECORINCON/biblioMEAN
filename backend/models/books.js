import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: String,
    name: String,
    writer: String,
    section: String,
    editorial: String,
    copy: Number,
    bookStatus: String,
    registerDate: { type: Date, default: Date.now}
});

const book = mongoose.model("books", bookSchema);
export default book;