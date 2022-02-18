import mongoose from "mongoose";

const lendingSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: "users"},
    book: {type: mongoose.Schema.ObjectId, ref: "books"},
    devolutionDate: String,
    registerDate: {type: Date, default: Date.now},
    lendingStatus: String
})

const lending = mongoose.model("lending", lendingSchema);

export default lending;