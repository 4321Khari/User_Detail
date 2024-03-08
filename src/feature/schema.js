import mongoose from "mongoose";

export const schema = new mongoose.Schema({
    id: String,
    name: String,
    phone: String,
    email: String,
    hobbies: String
})