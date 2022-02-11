import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phoneNumber: String,
    password: String,
    role: {type: mongoose.Schema.ObjectId, ref: "roles"},
    registerDate: {type:Date, default: Date.now},
    dbStatus: true
});

const user = mongoose.model("users", userSchema);
export default user;