import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: String,
    wirter: String,
    section: String,
    editorial: String,
    copy: Number,
    bookStatus: "available",
    registerDate: { type: Date, default: Date.now}
});

const book = mongoose.model("books", bookSchema);
export default book;