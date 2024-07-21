import { createModel } from "./base";

const schema = {
    adminname : String,
    password : String,
    email : String,
}

export const Admin = createModel("Admin", schema);  