import { createModel } from "./base";
import { Schema } from "mongoose";

const schema = new Schema({
    name : String,
    password : String,
    email : String,
    phone : String,
    address : String,
    bio : String,
    areaCost : [],
    unpaid : Number
})

export const User = createModel("User", schema);